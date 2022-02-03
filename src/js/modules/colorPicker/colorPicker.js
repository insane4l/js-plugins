export default class ColorPicker {
    constructor({
            wrapperSelector = 'body', // Selector of parent where to put our colorPicker
            colorAreaSelectors = ['body'], // Selectors of areas where color changes 
            withDefaultStyle = true, // default styles will be injected to head> style>
            initialColor = '#ffffff' // HEX #------
        } = {}) {

        this.wrapper = document.querySelector(wrapperSelector);
        this.colorAreas = document.querySelectorAll(colorAreaSelectors);
        this.withDefaultStyle = withDefaultStyle;
        this.initialColor = initialColor;
    }

    createColorPicker() {
        const colorPicker = document.createElement('input');
        colorPicker.classList.add('color-picker');
        colorPicker.setAttribute('type', 'color');
        colorPicker.setAttribute('value', '#ffffff');
        
        colorPicker.addEventListener('input', (e) => {

            this.colorAreas.forEach(area => {
                area.style.backgroundColor = e.target.value;
            });
        });
        console.dir(colorPicker);
        this.wrapper.appendChild(colorPicker);
    }

    injectStyle() {
        {
            const style = document.createElement('style');

            style.innerHTML = `
                .color-picker {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    font-family: inherit;
                    font-size: 18px;
                    font-weight: 700;
                    border: 1px solid rgba(0, 0, 0, .2);
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                }
    
                .color-picker:hover {
                    opacity: .8;
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
                }
            `;
    
            document.querySelector('head').appendChild(style);
        }
    }

    render() {
        try {
            if ( this.withDefaultStyle && typeof this.withDefaultStyle === 'boolean' ) this.injectStyle();

            this.createColorPicker();
            

        } catch(e) {}
    }
}