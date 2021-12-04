export default class Customizator {
    constructor({
            wrapperSelector = 'body', // Where to put our customizator panel in the html layout
            panelClass = 'customizator__panel', // Customizator block class
            scaleOptions = { // todo: separate scale module, scaleOptions must be added in constructor with default values (user can change one of them, dont need to fill all object props)
                scaleAreaSelectors: ['body'], // block selectors, which text nodes will be scaled
                activeClass: 'active',
                resetBtn: {
                    imgUrl: './assets/reset-btn.png',
                    cn: ['scale-btn', 'reset-scale-btn']
                }, // can be null/false
                btns: [
                    {scale: 1, cn: ['scale-btn']}, // todo: remove 1x btn from default (by default there is reset-btn with 1x scale);
                    {scale: 1.3, cn: ['scale-btn']},
                    {scale: 1.5, cn: ['scale-btn']}
                ]
            }
        } = {}) {

        this.panel = document.createElement('div');
        this.panelClass = panelClass;
        this.wrapper = document.querySelector(wrapperSelector);
        this.scaleOptions = scaleOptions;
    }


    createScaleBtns() {
        
        try {
            this.scaleBtns = [];

            const btns = this.scaleOptions.btns;

            for (let i = 0; i < btns.length; i++) {
                const btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('value', `${btns[i].scale}x`);
                btn.setAttribute('data-scale-value', btns[i].scale);
                btn.classList.add(...btns[i].cn);
                if (btns[i].scale === 1) btn.classList.add(this.scaleOptions.activeClass);

                btn.addEventListener('click', (e) => this.onScaleChange(e) );

                this.scaleBtns.push(btn);
            }

            if ( this.scaleOptions.resetBtn ) {

                const {imgUrl, cn} = this.scaleOptions.resetBtn;

                const resetBtn = document.createElement('button');
                resetBtn.setAttribute('data-scale-value', '1');
                resetBtn.classList.add(...cn);

                if (imgUrl) {
                    resetBtn.style.backgroundImage = `url(${imgUrl})`;
                }

                resetBtn.addEventListener('click', (e) => this.onScaleChange(e) );

                this.scaleResetBtn = resetBtn;
                this.scaleBtns.push(resetBtn);
            }

        } catch(e){}
    }

    onScaleChange(e) {
        
        if ( e.target && e.target.getAttribute('data-scale-value') ) {

            this.scaleBtns.forEach( btn => btn.classList.remove(this.scaleOptions.activeClass) );

            if (e.target === this.scaleResetBtn) {
                this.scaleBtns.forEach( btn => {
                    if ( btn.getAttribute('data-scale-value') === '1' && btn != this.scaleResetBtn) {
                        btn.classList.add(this.scaleOptions.activeClass);
                    }
                });
            } else {
                e.target.classList.add(this.scaleOptions.activeClass);
            }

            const scale = +e.target.getAttribute('data-scale-value');

            const scaleArea = document.querySelectorAll(this.scaleOptions.scaleAreaSelectors);
            scaleArea.forEach( el => recursy(el) );
            

            function recursy(elem) {

                elem.childNodes.forEach(node => {
                    if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {
                        
                        if ( !node.parentNode.getAttribute('data-fz') ) {
                            const fz = +window.getComputedStyle(node.parentNode, null).fontSize.replace(/[a-z]/g, '');
                            node.parentNode.setAttribute('data-fz', fz);
                            node.parentNode.style.fontSize = `${fz * scale}px`;
                        } else {
                            node.parentNode.style.fontSize = `${+node.parentNode.getAttribute('data-fz') * scale}px`;
                        }
                        
                    } else {
                        recursy(node);
                    }
                });
            }
        }
    }

    createPanel() {
        this.createScaleBtns();


        const allBtns = [...this.scaleBtns];

        allBtns.forEach(btn => {
            this.panel.appendChild(btn);
        })

        this.panel.classList.add(this.panelClass);

        this.wrapper.appendChild(this.panel);
    }

    render() {
        try {
            this.createPanel();

        } catch(e) {}
    }
}