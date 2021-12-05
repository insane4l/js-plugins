// Font size changer

export default class FontSizeChanger {
    constructor({
        wrapperSelector = '.scale__settings-panel', // Selector of the parent where the buttons will be placed 
                                                   // If leave default value => fixed panel (appended to body) will be created;
        scaleAreaSelectors = ['body'], // 
        withResetBtn = true,
        resetBtnText = '\u21BB',
        resetBtnImg = null, // Reset (to default scale) button image './assets/reset-btn.png'
        resetBtnCN = ['scale-btn', 'reset-scale-btn'], // Reset (to default scale) button class names
        activeClass = 'active',
        btns = [
            {scale: 1, cn: ['scale-btn']}, // todo: remove 1x btn from default (by default there is reset-btn with 1x scale);
            {scale: 1.3, cn: ['scale-btn']},
            {scale: 1.5, cn: ['scale-btn']}
        ]
    } = {}) {
        this.wrapperSelector = wrapperSelector;

        this.scaleAreaSelectors = scaleAreaSelectors;
        this.withResetBtn = withResetBtn;
        this.resetBtnText = resetBtnText;
        this.resetBtnImg = resetBtnImg;
        this.resetBtnCN = resetBtnCN;
        this.activeClass = activeClass;
        this.btns = btns;
        // todo: this.defaultStyle true/false // if true injectStyle() {<head> appendChild <style>.innerHTML}
    }

    createScaleBtns() {
        
        try {
            this.scaleBtns = [];

            const btns = this.btns;

            for (let i = 0; i < btns.length; i++) {
                const btn = document.createElement('input');
                btn.setAttribute('type', 'button');
                btn.setAttribute('value', `${btns[i].scale}x`);
                btn.setAttribute('data-scale-value', btns[i].scale);
                btn.classList.add(...btns[i].cn);
                if (btns[i].scale === 1) btn.classList.add(this.activeClass);

                btn.addEventListener('click', (e) => this.onScaleChange(e) );

                this.scaleBtns.push(btn);
            }

            if ( this.withResetBtn ) {

                const resetBtn = document.createElement('button'); // todo: must be input type button (because of text node scale)
                resetBtn.setAttribute('data-scale-value', '1');
                resetBtn.classList.add(...this.resetBtnCN);

                this.resetBtnImg ? resetBtn.style.backgroundImage = `url(${this.resetBtnImg})` // todo: test
                                 : resetBtn.textContent = this.resetBtnText;  // todo: input value
                
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

            const scaleArea = document.querySelectorAll(this.scaleAreaSelectors); // todo: test.. fix bugs
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

    render() {
        try {

            this.createScaleBtns();

            if ( this.wrapperSelector === '.scale__settings-panel' ) {

                this.wrapper = document.createElement('div');
                // todo: func injectStyle => if ( this.wrapperSelector === '.scale__settings-panel' ) <head> appendChild <style>.innerHTML .scale__settings-panel.... 
                //BECAUSE OF USER CANT ADD CUSTOM STYLES when cssText clear all props
                this.wrapper.style.cssText = `
                    position: fixed;
                    top: 5px;
                    right: 5px;
                    display: flex;
                    min-width: 100px;
                    padding: 5px 20px;
                    border: 2px solid rgba(0, 0, 0, .2);
                    border-radius: 3px;
                    background-color: #fff;
                `;

                document.querySelector('body').appendChild(this.wrapper);

            } else {
                this.wrapper = document.querySelector(this.wrapperSelector);
            }

            this.scaleBtns.forEach( el => this.wrapper.appendChild(el) );

        } catch(e){}
    }

}