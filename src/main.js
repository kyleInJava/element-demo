
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from '@/util/request'
import store from '@/store'


//引入本地icon文件
import '@/assets/images/icon/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = request


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
  created(){

    //页面刷新前，将vuex的数据保存到localstorage中
    window.addEventListener('beforeunload',() =>{
      window.localStorage.setItem('tagsViews',JSON.stringify(this.$store.state.tagsViews))
      window.localStorage.setItem('currentPage',this.$store.state.currentPage)
    });

    //监听浏览器前进后退
    window.addEventListener('popstate',() =>{
      let path = window.location.href.split('#').pop();
      console.log(path )
      this.$store.commit('switchPage',path)
    });

  }
})
