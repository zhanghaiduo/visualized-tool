import Vue from 'vue';

const warnHandel = (el, binding) => {
    if (binding.value.show && binding.value.warnLevel) {
        el.timerOk = true;
        el.timerInterval = null;
        el.timerTimeout = null;
        // clearInterval(el.timerInterval);
        // clearTimeout(el.timerTimeout);
        let warnColor = ''
        let warnTime = 0
        switch (binding.value.warnLevel) {
            case 1:
                warnColor = '#59a6ff'
                warnTime = 2000
                break;
            case 2:
                warnColor = '#F04864'
                warnTime = 1000
                break;
            case 3:
                warnColor = '#F04864'
                warnTime = 500
                break;
            default:
                break;
        }
        el.style.border = `1px solid #3c475d`
        if (warnTime > 0) {
            // console.log(binding.value.warnLevel, '等级')
            clearInterval(el.timerInterval);
            el.timerInterval = setInterval(() => {
                // console.log(warnTime, 'setInterval')
                if (el.timerOk) {
                    el.style.border = `1px solid ${warnColor}`
                    el.timerOk = false
                    clearTimeout(el.timerTimeout);
                    el.timerTimeout = setTimeout(() => {
                        el.style.border = `1px solid #3c475d`
                        el.timerOk = true
                    }, warnTime);
                }
            }, warnTime);
        } else {
            el.style.border = `1px solid #3c475d`
        }
    }
};

Vue.directive('warn', {
    bind: (el, binding) => {
        warnHandel(el, binding)
    },
    update: (el, binding) => {
        // console.log('update')
        clearInterval(el.timerInterval);
        clearTimeout(el.timerTimeout);
        warnHandel(el, binding)
    },
    inserted: () => { },
    componentUpdated: () => { },
    unbind: () => { },
});
