<template>
  <div class="hello">
    <span @click="getWangyi">显示</span>
  </div>
</template>

<script>
import axios from '@/api/index.js' /*引入封装的axios*/
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getWangyi () {
      axios({
        url: '/playlist/hot',  /*热门歌单接口地址*/
        method: 'post'
      })
        .then(res => {
          console.log("我拿到的数据：", res.data.tags)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
