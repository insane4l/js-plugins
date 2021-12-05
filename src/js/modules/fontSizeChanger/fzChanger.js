// Font size changer
export default class FontSizeChanger { // todo: implement withDropDown functionality
    constructor({
        wrapperSelector = '.scale__settings-panel', // Selector of the parent where the buttons will be placed 
                                                   // If leave default value => panel (appended to body) will be created;
        scaleAreaSelectors = ['body'],
        activeClass = 'active',
        btns = [
            {scale: 1, cn: ['scale-btn']}, // todo: mb remove 1x btn from default (by default there is reset-btn with 1x scale);
            {scale: 1.3, cn: ['scale-btn']},
            {scale: 1.5, cn: ['scale-btn']}
        ],
        withDefaultStyle = true,
        withResetBtn = true, // Btn reset to initial 1x scale [true / false]
        resetBtnText = '\u21BB', // Will be shown only if there is no resetBtnImg (resetBtnImg != string) By default there is cross-platform, cross-browser unicode symbol
        resetBtnImg = null, // Reset button image [string / ....] To show must be a string. Example: './assets/reset-btn.png'
        resetBtnCN = ['scale-btn', 'reset-scale-btn'] // Reset button class names

    } = {}) {
        this.wrapperSelector = wrapperSelector;
        this.scaleAreaSelectors = scaleAreaSelectors;
        this.activeClass = activeClass;
        this.btns = btns;

        this.withDefaultStyle = withDefaultStyle;

        this.withResetBtn = withResetBtn;
        this.resetBtnText = resetBtnText;
        this.resetBtnImg = resetBtnImg;
        this.resetBtnCN = resetBtnCN;
    }

    createScaleBtns() {

        function createBtn(value, scale, classNames) {
            const btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', value);
            btn.setAttribute('data-scale-value', scale);
            btn.classList.add(...classNames);

            return btn;
        }
        
        try {
            this.scaleBtns = [];

            const btns = this.btns;

            for (let i = 0; i < btns.length; i++) {
                const btn = createBtn(`${btns[i].scale}x`, btns[i].scale, btns[i].cn);
             
                if (btns[i].scale === 1) btn.classList.add(this.activeClass);

                btn.addEventListener('click', (e) => this.onScaleChange(e) );

                this.scaleBtns.push(btn);
            }


            if ( this.withResetBtn && typeof this.withResetBtn === 'boolean' ) {

                const resetBtn = createBtn('', '1', this.resetBtnCN);

                this.resetBtnImg ? resetBtn.style.backgroundImage = `url(${this.resetBtnImg})`
                                 : resetBtn.setAttribute('value', `${this.resetBtnText}`);
                
                resetBtn.addEventListener('click', (e) => this.onScaleChange(e) );

                this.scaleResetBtn = resetBtn;
                this.scaleBtns.push(resetBtn);
            }

        } catch(e){}
    }

    onScaleChange(e) {
        
        if ( e.target && e.target.getAttribute('data-scale-value') ) {

            this.scaleBtns.forEach( btn => btn.classList.remove(this.activeClass) );

            if (e.target === this.scaleResetBtn) {
                this.scaleBtns.forEach( btn => {
                    if ( btn.getAttribute('data-scale-value') === '1' && btn != this.scaleResetBtn) {
                        btn.classList.add(this.activeClass);
                    }
                });
            } else {
                e.target.classList.add(this.activeClass);
            }

            const scale = +e.target.getAttribute('data-scale-value');

            const scaleArea = document.querySelectorAll(this.scaleAreaSelectors);
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

    injectStyle() {
        const style = document.createElement('style');
        const wrapperStyles = `
            .scale__settings-panel {
                position: fixed;
                top: 5px;
                right: 5px;
                display: flex;
                min-width: 100px;
                padding: 5px 20px;
                border: 2px solid rgba(0, 0, 0, .2);
                border-radius: 3px;
                background-color: #fff;
            }
        `;

        style.innerHTML = `
            .scale-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 40px;
                height: 40px;
                padding: 3px;
                margin: 0 3px;
                font-family: inherit;
                font-size: 18px;
                font-weight: 700;
                background-color: #efefef;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 3px;
                outline: none;
                cursor: pointer;
            }

            .scale-btn:hover {
                opacity: .8;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
            }
            
            .scale-btn.active {
                background-color: rgba(0, 0, 0, .3);
                color: #fff;
            }
            
            .reset-scale-btn {
                background-size: 60%;
                background-repeat: no-repeat;
                background-position: center;
            }
            ${this.wrapperSelector === '.scale__settings-panel' ? wrapperStyles : ''}
        `;

        document.querySelector('head').appendChild(style);
    }

    render() {
        try {

            if ( this.withDefaultStyle && typeof this.withDefaultStyle === 'boolean' ) this.injectStyle();


            if ( this.wrapperSelector === '.scale__settings-panel' ) {

                this.wrapper = document.createElement('div');
                this.wrapper.classList.add('scale__settings-panel');
                document.querySelector('body').appendChild(this.wrapper);

            } else {
                this.wrapper = document.querySelector(this.wrapperSelector);
            }

            this.createScaleBtns();
            this.scaleBtns.forEach( el => this.wrapper.appendChild(el) );

        } catch(e){}
    }

}