import ColorPicker from './modules/colorPicker/colorPicker';
import FontSizeChanger from './modules/fontSizeChanger/fzChanger';


window.addEventListener('DOMContentLoaded', () => {
    new FontSizeChanger({resetBtnText: 'test', scaleAreaSelectors: ['.benefits__block', 'h1']}).render();

    new ColorPicker({colorAreaSelectors: ['.benefits__block']}).render();
})