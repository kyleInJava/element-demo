import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({

    state: {
        tagsViews : [],
        currentPage : '/home'
    },
    mutations: {
        addTagsView(state,tag){
            //是否存在该页面
            let exist = false
            let len = state.tagsViews.length;
            for(let i=0; i<len; i++){
                //将其他标签页设置为未激活
                state.tagsViews[i].isActive = false
                //标签页已经有该页面
                if(state.tagsViews[i].index === tag.index){
                    //不能直接替换下标的对象，这样vue无法检测到变动
                    state.tagsViews[i].isActive = true;
                    exist = true
                }
                
            }
            //标签页没有该页面，就将该页面加入到最后
            if(!exist){
                state.tagsViews.push(tag)
            }    
        },
        //通过标签来切换页面
        switchPage(state,index){
            state.currentPage = index;
            //切换标签的激活状态
            let len = state.tagsViews.length;
            for(let i=0; i<len; i++){
                //将其他标签页设置为未激活
                state.tagsViews[i].isActive = false
                //标签页已经有该页面
                if(state.tagsViews[i].index === index){
                    //不能直接替换下标的对象，这样vue无法检测到变动
                    state.tagsViews[i].isActive = true;
                }
            }
        },
        //保存当前的页面信息
        saveCurrentPage(state,url){
            state.currentPage = url;
        },
        //初始化tagsView中的数据
        initTagsView(state){
            let tagsViews =  window.localStorage.getItem('tagsViews');
            if(tagsViews){
                state.tagsViews = JSON.parse(tagsViews);
            }
        },
        //设置当前页面
        initCurrentPage(state){
            let currentPage = window.localStorage.getItem('currentPage');
            if(currentPage){
                state.currentPage =currentPage
            }
        },
        //恢复vuex中的初始数据
        clear(state){
            state.tagsViews = []
            state.currentPage = '/home'
            window.localStorage.removeItem('tagsViews')
            window.localStorage.removeItem('currentPage')
        },
        //删除标签
        delTag(state,url){
            
            state.tagsViews = state.tagsViews.filter((item) =>{
                return item.index !== url
            })

            
            //切换标签的激活状态
            let len = state.tagsViews.length;
            if(len === 0){
                state.currentPage = '/home'
            }else{
                state.currentPage = state.tagsViews[len-1].index
                for(let i=0; i<len; i++){
                    //将其他标签页设置为未激活
                    state.tagsViews[i].isActive = false
                    //标签页已经有该页面
                    if(state.tagsViews[i].index === state.currentPage){
                        //不能直接替换下标的对象，这样vue无法检测到变动
                        state.tagsViews[i].isActive = true;
                    }
                }
            }
        }
    },
    actions :{
    
    }
})