<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Rank></Rank>
    <Recomend></Recomend>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floorList.id" :list="floor"></Floor>
    
    <Brand></Brand>
  </div>
</template>

<script>
import Rank from "@/pages/Home/Rank";
import Recomend from "@/pages/Home/Recommend";
import ListContainer from "@/pages/Home/ListContainer";
import Brand from "@/pages/Home/Brand";
import Floor from "@/pages/Home/Floor";
import Like from "@/pages/Home/Like";
import { mapState } from "vuex";
export default {
  name: "",
  components: { Rank, Recomend,ListContainer,Brand,Floor,Like },
  mounted(){ 
    //获取floor组件的数据
  this.$store.dispatch("getFloorList");  

},
computed:{
  ...mapState({
    floorList:state=>state.home.floorList, 
  })
}
}

</script>

<style lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-color: #5c5251;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 20.83%;

        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>