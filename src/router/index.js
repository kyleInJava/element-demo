import Vue from 'vue'
import Router from 'vue-router'
import request from '@/util/request'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Home from '@/views/Home'
import Blank from '@/views/Blank'



Vue.use(Router)


//设置基础静态路由
const rootRoutes = {
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/index', component: Index, redirect : '/home',children:[
      {path: '/home', component: Home, meta:{title: '首页'}}
    ]}
  ] 
};


//创建router
const router = new Router(rootRoutes);

let routerRefresh = true; 
//保存静态路由，也就是routes数组
let dynamicRoutes = []

//路由导航守卫，防止没有登录的人员直接通过连接访问到需要登录的页面
//to ： 将要访问的页面
//from ；代表从哪个页面跳转而来
//next 是一个函数表示放行
router.beforeEach((to,from,next) => {

  //动态路由已经被刷新过了
  if(!routerRefresh){
    //登陆页面直接放行
    if(to.path === '/login') return next();
    //不是登录页面，查看是否有token
    const token = window.sessionStorage.getItem("token")
    //如果没有token，就跳转到登录页面
    if( !token ) return next('/login')
    //设置浏览器上面的table页显示
    document.title = to.meta.title
    next()
  } else {
    const result = buildRouterInfo(to,next)
    
    result.then(res => {
        //将路由规则设置到router中
        dynamicRoutes = res;
        let sRoutes = rootRoutes.routes[2].children
        rootRoutes.routes[2].children = sRoutes.concat(dynamicRoutes)
        router.options.routes = rootRoutes.routes
        router.addRoutes(rootRoutes.routes)
        // console.log(router.options.routes)
        //设置路由后，除非刷新页面，否则不用再次刷新路由
        routerRefresh = false;
        //只是作为刷新路由使用，页面并没有跳转
        next({...to,replace:true})
    })
  }

})



//生成路由规则信息
async function buildRouterInfo(to,next){

  //发送请求获取菜单信息
  const {data : res } = await request.post('/menu/tree',{})
  if(res.code !== 0){//请求失败
    this.$message.error(res.msg)
  }else{
    //存储所有的菜单目录
    const rootMenuRoutesInfo = [];
    const menuList = res.data;
    menuList.forEach(menu => {
      //一级目录,这里定义一个空白页组件，是为了引入页面组件
      const MenuRoutes = {path:'/'+menu.url,meta:{title:menu.name},component:Blank};
      //存储二级菜单
      MenuRoutes.children = []
      const subMenus = menu.children
      if( subMenus && subMenus.length > 0 ){
        subMenus.forEach(subMenu => {
          let src = firstUpperCase(subMenu.url)
          const info = {
            component: () => import('@/views/'+src),
            path: subMenu.url, 
            meta: {
              title : subMenu.name
            }
          }
          
          MenuRoutes.children.push(info)
        })
      }
      rootMenuRoutesInfo.push(MenuRoutes)
    })
    return rootMenuRoutesInfo;
  }
}

//字符串首字母大写
function firstUpperCase(str) {
  return str.charAt(0).toUpperCase()+str.slice(1);
}


export default router