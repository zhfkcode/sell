<template>
    <div class="icon" :class="iconMap[iconNum]+'-'+iconType">
    </div>
</template>

<script>

    export default {
      props:{
        iconNum:{
          type:Number,
          default:1
        },
        iconType:{
          type:Number,
          default:1
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
.icon.decrease-1{
     background-image: url("../icon/decrease_1@2x.png");
   }
  .icon.decrease-2{
    background-image: url("../icon/decrease_2@2x.png");
  }
  .icon.decrease-3{
    background-image: url("../icon/decrease_3@2x.png");
  }
  .icon.decrease-4{
    background-image: url("../icon/decrease_4@2x.png");
  }
.icon.discount-1{
    background-image: url("../icon/discount_1@2x.png");
  }
  .icon.discount-2{
    background-image: url("../icon/discount_2@2x.png");
  }
  .icon.discount-3{
    background-image: url("../icon/discount_3@2x.png");
  }
  .icon.discount-4{
    background-image: url("../icon/discount_4@2x.png");
  }
.icon.guarantee-1{
    background-image: url("../icon/guarantee_1@2x.png");
  }
  .icon.guarantee-2{
    background-image: url("../icon/guarantee_2@2x.png");
  }
  .icon.guarantee-3{
    background-image: url("../icon/guarantee_3@2x.png");
  }
  .icon.guarantee-4{
    background-image: url("../icon/guarantee_4@2x.png");
  }
.icon.invoice-1{
    background-image: url("../icon/invoice_1@2x.png");
  }
  .icon.invoice-2{
    background-image: url("../icon/invoice_2@2x.png");
  }
  .icon.invoice-3{
    background-image: url("../icon/invoice_3@2x.png");
  }
  .icon.invoice-4{
    background-image: url("../icon/invoice_4@2x.png");
  }
.icon.special-1{
    background-image: url("../icon/special_2@2x.png");
  }
  .icon.special-2{
    background-image: url("../icon/special_2@2x.png");
  }
  .icon.special-3{
    background-image: url("../icon/special_3@2x.png");
  }
  .icon.special-4{
    background-image: url("../icon/special_4@2x.png");
  }
</style>
