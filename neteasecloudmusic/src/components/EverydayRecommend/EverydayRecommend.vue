<template>
  <div class="recommend">
    <div class="header">
      <span><i class="iconfont icon-fanhui"></i></span>
    </div>
  </div>
</template>

<script>
import axios from "@/api/index.js"; /*引入封装的axios*/
import Header from "@/components/Header/Header";
export default {
  name: "Home",
  data() {
    return {
      activeName: "rankList",
    };
  },
  components: {
    Header
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      axios({
        url: "/banner/type=2" /*轮播图*/,
        method: "get"
      })
        .then(res => {
          this.banners = res.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped>
.recommend{
  background-color: #fb0;
}
  .header{
    padding: 10px;
    color: #fff;
  }
  header span{
    cursor: pointer;
  }
</style>
