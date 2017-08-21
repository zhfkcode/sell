<template>
    <div class="cartcontrl">
      <transition name="cart-miuns">
      <div v-show="food.count>0" class="cart-decrease" @click.stop="decreaseCart($event)">
        <transition name="cart-circle">
         <i v-show="food.count>0" class="icon-shopping_cart"></i>
        </transition>
      </div>
      </transition>
      <div v-show="food.count>0" class="cart-count" >{{food.count}}</div>
      <div class="cart-add icon-thumb_down" @click.stop="addCart($event)"></div>
    </div>
</template>

<script>
  import vue from 'vue'
    export default {
      props:{
        food:{
          type:Object
        }
      },
      methods:{
        addCart(event){
          if(!event._constructed){
            return ;
          }
          if(!this.food.count){
            vue.set(this.food,'count',1);
          }else{
            this.food.count++;
          }
          console.log("jinru");
          this.$emit('add-one',event.target);
        },
        decreaseCart(event){
          if(!event._constructed){
            return ;
          }
            this.food.count--;
        }
      }
    }
</script>

<style scoped>
  .cart-miuns-enter,.cart-miuns-leave-to{
    opacity:0;
    transform: translate3d(24px,0,0);
  }
  .cart-miuns-enter-active,.cart-miuns-leave-active{
    transition:all .5s linear;
  }
  .cart-miuns-enter-to,.cart-miuns-leave{
    opacity:1;
    transform: translate3d(0,0,0);
  }
  .cart-circle-enter,.cart-circle-leave-to{
    opacity:0;
    transform:rotate(0);
  }
  .cart-circle-enter-active,.cart-circle-leave-active{
    transition:all .5s linear;
  }
  .cart-circle-enter-to,.cart-circle-leave{
    transform:rotate(-180deg);
    opacity:1;
  }
  .cartcontrl{
    font-size: 0;
  }
.cartcontrl .cart-count{
  display: inline-block;
  vertical-align: top;
  width:12px;
  padding-top:6px;
  line-height: 24px;
  text-align: center;
  font-size: 10px;
  color:rgb(147,153,159);
}
  .cartcontrl .cart-decrease{
    display: inline-block;
  }
.cartcontrl .cart-add,.cartcontrl .cart-decrease i{
  display: inline-block;
  padding:6px;
  height:24px;
  line-height: 24px;
  color:rgb(0,160,220)
}
  .cartcontrl .icon-shopping_cart,.cartcontrl .cart-add.icon-thumb_down{
    font-size:24px;
  }
</style>
