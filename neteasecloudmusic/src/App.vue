<template>
  <div id="app">
     <Playsongs></Playsongs>
     <Playlist></Playlist>
    <router-view/>
    
  </div>
</template>

<script>
import Bottom from '@/components/Bottom/bottom'
import Playsongs from '@/components/Playsongs/Playsongs'
import Playlist from '@/components/Playsongs/Playlist'
export default {
  name: 'App',
  components:{
    Playsongs,
    Playlist
  }
}
</script>

<style>
</style>
