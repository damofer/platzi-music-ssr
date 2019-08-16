import Vue from 'vue'
const msToMn = {};

function convertMsToMm (ms){
    const min = Math.floor(ms/60000);
    const sec = ((ms % 60000 /1000).toFixed(0))

    return `${min}:${sec}`
}
msToMn.install = function(Vue) {
    Vue.filter('ms-to-mm', (val)=>{
        return convertMsToMm(val)
    })
}
Vue.use(msToMn)

export default msToMn
