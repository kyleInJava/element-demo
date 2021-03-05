<template>
    <div class="fullScreen"  @click="toggleFullScreen">
        <svg-icon :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen' " class="fullscreen-svg"></svg-icon>
    </div>
</template>

<script>

import ScreenFull from 'screenfull'

export default {

    data(){
        return {
           isFull : false 
        }
    },
    components: {
        ScreenFull
    },
    methods:{
        toggleFullScreen(){
            ScreenFull.toggle()
            this.isFull = !this.isFull
        }
    }
    
}
</script>


<style scoped>

.fullScreen{
  height: 100%;
  width: 30px;
  display: inline-block;
  text-align: center;
}

.fullscreen-svg{
  width: 20px;
  height: 20px;
  margin-top: 15px;
  vertical-align: top;
}

</style>