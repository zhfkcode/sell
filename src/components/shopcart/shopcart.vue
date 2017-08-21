<template>
  <div>
    <div class="shopcart">
      <div class="content" >
        <div  @click="toggleShow" class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-close"></i>
            </div>
            <div class="num" v-if="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">¥ {{ totalPrice }}</div>
          <div class="desc">另需配送费 {{ deliveryPrice }} 元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">{{ payDesc }}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
           <div v-show="ball.show" class="ball">
             <div class="inner inner-hook"></div>
           </div>
        </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <div class="title">购物车</div>
          <span class="empty" @click="clearFood">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>

      </div>
      </transition>
    </div>
    <transition name="link">
    <div class="link-mask" v-show="listShow" @click="hidelink"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartControl from '../cartcountrl/cartcountrl'
    export default {
    components:{
      cartControl
    },
      props:{
        selectFoods:{
          type:Array,
          default(){
            return[]
          }
        },
        deliveryPrice:{
          type:Number,
          default:0
        },
        minPrice:{
          type:Number,
          default:0
        }
      },
      data(){
        return{
          balls:[
            {show:false},
            {show:false},
            {show:false},
            {show:false},
            {show:false}
          ],
          dropBalls:[],
          fold:true

        }
      },
      computed:{
        totalPrice (){
          let total=0;
          this.selectFoods.forEach((food)=>{
            total+=food.price * food.count;
          })
          return total;
        },
        totalCount(){
          let count=0;
          this.selectFoods.forEach((food)=>{
            count+=food.count;
          })
          return count;
        },
        payDesc(){
          if(this.totalPrice===0){
            return `¥${this.minPrice}元起送`
          }else if(this.totalPrice<this.minPrice){
            let diff=this.minPrice-this.totalPrice;
            return `还差￥${diff}元起送`
          }else{
            return `去结算`
          }
        },
        payClass(){
          if(this.totalPrice>this.minPrice){
            return 'enough';
          }
          return
        },
        listShow(){
          if(!this.totalCount){
            this.fold=true;
            return false;
          }
          let show=!this.fold;
          if(show){
            this.$nextTick(()=> {
              if(!this.scroll){
                this.scroll=new BScroll(this.$refs.listContent,{
                  click:true
                })
              }else{
                this.scroll.refresh();
              }
            })
          }
//          console.log(this.fold);
          return show;
        }
      },
      methods:{
        drop(el){
          for(let i=0;i<this.balls.length;i++){
            let ball=this.balls[i]
            if(!ball.show){
              ball.show=true;
              ball.el=el;
              this.dropBalls.push(ball);
              return;
            }
          }
        },
        beforeEnter(el){
          let count=this.balls.length;
          while(count--){
            let ball=this.balls[count];
            if(ball.show){
                let rect=ball.el.getBoundingClientRect();
                let x=rect.left-32;
                let y=-(window.innerHeight-rect.top-22);
                el.style.display='';
                el.style.webkitTransform=`translate3D(0,${y}px,0)`;
                el.style.transform=`translate3D(0,${y}px,0)`;
                let inner=el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform=`translate3D(${x}px,0,0)`;
                inner.style.transform=`translate3D(${x}px,0,0)`;
            }
          }
        },
        enter(el){
          let rf=el.offsetHeight;
//          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
//          });

        },
        afterEnter(el){
          let ball=this.dropBalls.shift();
          if(ball){
            ball.show=false;
            el.style.display='none';
          }
        },
        toggleShow(){
          if(!this.totalCount){
            return;
          }
          this.fold=!this.fold
        },
        clearFood(){
          this.selectFoods.forEach((food)=>{
            food.count=0;
          })
        },
        hidelink(){
          this.fold=!this.fold
        },
        pay(){
          if(this.totalPrice<this.minPrice){
            return ;
          }
          window.alert(`支付${this.totalPrice}元`);
          this.fold=true
        }
      }
    }
</script>

<style scoped>
.shopcart{
  position: fixed;
  bottom:0;
  left:0;
  z-index:50;
  width:100%;
  height:48px;
  background:#000;
}
.shopcart .content{
  display: flex;
  background-color: #141d27;
  font-size: 0;
  color:rgba(255,255,255,.4)
}
.content-left{
  flex:1;
}
.content-left .logo-wrapper{
  display: inline-block;
  position: relative;
  top:-10px;
  margin:0 12px;
  padding:6px;
  width:56px;
  height:56px;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 50%;
  background-color: #141d27;
}
.logo-wrapper .logo{
  display: inline-block;
  width:100%;
  height:100%;
  border-radius:50%;
  background: #2b343c;
  text-align: center;
}
.logo-wrapper .logo.highlight{
  background:rgb(0,160,220)
}
.logo-wrapper .logo.highlight i{
  color:#fff;
}
.logo-wrapper .logo  .icon-close{
 font-size:24px;
  color:#80858a;
  line-height:44px;
}
.logo-wrapper .num{
  position: absolute;
  top:0;
  right:0;
  width:24px;
  height:16px;
  line-height: 16px;
  text-align: center;
  border-radius:16px;
  font-size: 9px;
  font-weight: 700;
  color:#fff;
  background:rgb(240,20,20);
  box-show:0 4px 8px 0 rgba(0,0,0,.4)
}
 .price{
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin-top:12px;
  padding-right:12px;
  box-sizing: border-box;
  border-right:1px solid rgba(255,255,255,.1);
  font-size:16px;
  font-weight: 700;
}
.price.highlight{
  color:#fff;
}
.desc{
   display: inline-block;
   vertical-align: top;
   margin:12px 0 0 12px;
   font-size:10px;
   line-height: 24px;
   font-weight:700;
 }
.content-right{
  flex:0 0 105px;
  width:105px;
}
.content-right .pay{
  height:48px;
  line-height: 48px;
  text-align: center;
  font-size:12px;
  background-color: #2b333b;
}
  .content-right .pay.enough{
    color:#fff;
    background-color: #00b43c;
  }
  .ball-container .ball{
    position:fixed;
    left:32px;
    bottom:22px;
    z-index:200;
    transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41)
  }
.ball-container .inner{
  width:16px;
  height:16px;
  border-radius:50%;
  background:rgb(0,160,220);
  transition: all 0.4s linear
}
  .shopcart-list{
    position:absolute;
    top:0;
    left:0;
    z-index:-2;
    width:100%;
    transform: translate3D(0,-257px,0);
  }
  .fold-enter,.fold-leave-to{
    transform: translate3D(0,0,0);
  }
.fold-enter-active,.fold-leave-active{
  transition:all .5s linear;
}
.fold-enter-to,.fold-leave{
  transform: translate3D(0,-100%,0);
}
.shopcart-list .list-header{
height:40px;
  line-height: 40px;
  padding:0 18px;
  background:#f3f5f7;
  border-bottom:1px solid  rgba(7,17,27,.1)
}
.shopcart-list .list-header .title{
  float:left;
  font-size: 14px;
  font-weight:200;
  color:rgb(7,17,27);

}
.shopcart-list .list-header .empty{
  float:right;
  font-size:12px;
  color:rgb(0,160,220);
}
.shopcart-list .list-content{
  padding:0 18px;
 height:217px;
  background-color: #fff;
  overflow: hidden;
}
.shopcart-list .list-content .food{
  position: relative;
  padding:12px 0;
  box-sizing: border-box;
  border-bottom:1px solid rgba(7,17,27,.1)
}
.list-content  .name{
  line-height: 24px;
  font-size:14px;
  color:rgb(7,17,27);
}
.list-content  .price{
  position: absolute;
  right:90px;
  bottom:12px;
  line-height:24px;
  font-size:14px;
  font-weight: 700 ;
  color:rgb(240,20,20)
}
.list-content  .cartcontrol-wrapper{
  position: absolute;
  right:0;
  bottom:6px;
}
  .link-mask{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 40;
    background-color: rgba(7,17,27,.6);
  }
  .link-enter,.link-leave-to{
    opacity:0;
  }
.link-enter-active,.link-leave-active{
  transition: all .5s linear;
}
.link-enter-to,.link-leave{
  opacity: 1;
}
</style>
