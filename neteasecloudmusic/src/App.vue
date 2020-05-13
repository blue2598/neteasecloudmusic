<template>
  <div id="app">
     <!-- <Header></Header> -->
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
.mint-header{
  padding: 0;
}
</style>
