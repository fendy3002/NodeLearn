window.stepProgress = window.stepProgress || {};
window.stepProgress.make = window.stepProgress.make || {};

window.stepProgress.make = function (option) {
    let make = {
        option: {
            space: 300,
            paddingX: 20,
            paddingY: 10,
            startX: 50,
            ...option
        }
    };
    
};