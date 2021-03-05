import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index' // SvgIcon组件

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context,通过正则匹配到文件，全部引入
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)