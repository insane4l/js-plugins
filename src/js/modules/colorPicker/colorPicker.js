export default class ColorPicker {
    constructor({
            wrapperSelector = 'body', // Selector of parent where to put our colorPicker
            colorAreaSelectors = ['body'], // Selectors of areas where color changes 
        } = {}) {

        this.wrapper = document.querySelector(wrapperSelector);
        this.colorAreas = document.querySelectorAll(colorAreaSelectors);

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
        console.log('aaaa');
        this.wrapper.appendChild(colorPicker);
    }

    render() {
        try {
            this.createColorPicker();
            

        } catch(e) {}
    }
}