<template>
    <div class="icon" :class="iconMap[iconNum]">
    </div>
</template>

<script>

    export default {
      props:{
        iconNum:{
          type:Number
        }
      },
      data(){
        return{
          iconMap:['decrease','discount','guarantee','invoice','special']
        }
      }
    }
</script>

<style scoped>
  .icon{
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
.icon.decrease{
    background-image: url("../icon/decrease_1@2x.png");
  }
.icon.discount{
    background-image: url("../icon/discount_1@2x.png");
  }
.icon.guarantee{
    background-image: url("../icon/guarantee_1@2x.png");
  }
.icon.invoice{
    background-image: url("../icon/invoice_1@2x.png");
  }
.icon.special{
    background-image: url("../icon/special_2@2x.png");
  }
</style>
