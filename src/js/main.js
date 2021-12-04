import Customizator from './modules/customizator/customizator';


window.addEventListener('DOMContentLoaded', () => {
    const customizator = new Customizator({
        // panelClass: 'customizator__panel', // default class
        // scaleOptions: {
            // btns: [
            //     {scale: 1, cn: ['scale-btn']},
            //     {scale: 1.2, cn: ['scale-btn']},
            //     {scale: 1.4, cn: ['scale-btn']}
            // ]
        // }
    });
    customizator.render();
})