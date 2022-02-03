import ColorPicker from './modules/colorPicker/colorPicker';
import FontSizeChanger from './modules/fontSizeChanger/fzChanger';


window.addEventListener('DOMContentLoaded', () => {
    new FontSizeChanger({resetBtnText: 'test', scaleAreaSelectors: ['.benefits__block', 'h1']}).render();

    new ColorPicker({initialColor: '#e93f33', colorAreaSelectors: ['.benefits__block'], wrapperSelector: '.scale__settings-panel'}).render();
})