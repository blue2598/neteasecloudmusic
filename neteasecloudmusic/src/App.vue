<template>
  <div id="app">
     <!-- <Bottom></Bottom> -->
    <router-view/>
  </div>
</template>

<script>
import Bottom from '@/components/Bottom/bottom'
export default {
  name: 'App',
  components:{
    Bottom
  }
}
</script>

<style>
</style>
