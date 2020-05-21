<template>
  <div id="app">
     <Playsongs></Playsongs>
    <router-view/>
    
  </div>
</template>

<script>
import Bottom from '@/components/Bottom/bottom'
import Playsongs from '@/components/Playsongs/playsongs'
export default {
  name: 'App',
  components:{
    Playsongs
  }
}
</script>

<style>
</style>
