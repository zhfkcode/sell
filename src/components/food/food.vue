<template>
  <div>
  <transition name="detailFood">
    <div v-show="showFlag" class="food" ref="foodScroll">
     <div class="food-content">
       <div class="image-header">
         <img :src="food.image" alt="">
         <div class="back" @click="foodHide">
           <i class="icon-add_circle"></i>
         </div>
       </div>
       <div class="content">
         <h1 class="title">{{food.name}}</h1>
         <div class="detail">
           <span class="sell-count">月售{{food.sellCount}}份</span>
           <span class="rating">好评率{{food.rating}}%</span>
         </div>
         <div class="price">
           <span class="now">¥{{food.price}}</span>
           <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
         </div>
         <div class="cartcontrol-wrawpper">
           <cartcontroal :food="food" @add-one="addOne"></cartcontroal>
         </div>
         <transition name="buyfade">
           <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
         </transition>
       </div>
       <split v-show="food.info"></split>
       <div class="info" v-show="food.info">
         <h1 class="title">商品信息</h1>
         <div class="content">
           {{food.info}}
         </div>
       </div>
       <split></split>
       <div class="ratings">
         <h1 class="title">商品评价</h1>
         <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @rating-select="changeType" @changeOnly="changeOnly"></ratingSelect>
         <div class="rating-wrapper">
           <ul  v-show="food.ratings && food.ratings.length">
             <li v-show="needShow(item.rateType,item.text)" class="rating-item" v-for="item in food.ratings">
               <div class="user">
                 <span class="name">{{item.username}}</span>
                 <img class="avatar" :src="item.avatar" alt="">
               </div>
               <div class="time">{{item.rateTime | formaDate}}</div>
               <p class="text">
                 <span :class="{'icon-arrow_lift':item.rateType===0,'icon-check_circle':item.rateType===1}"></span>{{item.text}}
               </p>
             </li>
           </ul>
           <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
             暂无评价！
           </div>
         </div>
       </div>
     </div>
    </div>
  </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import {formaDate} from '../../common/js/date'
  import cartcontroal from '../cartcountrl/cartcountrl'
  import  split from '../split/split'
  import ratingSelect from '../ratingselect/ratingselect'
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
    export default {
    components:{
      cartcontroal,
      split,
      ratingSelect
    },
      filters:{
        formaDate(time){
          let date=new Date(time);
          return formaDate(date,'yyyy-MM-dd hh:mm');
        }
      },
      props:{
        food:{
          type:Object
        }
      },
      data(){
        return{
          showFlag:false,
          selectType:ALL,
          onlyContent:false,
          desc:{
            all:'全部',
            positive:'推荐',
            negative:'吐槽'
          }
        }
      },
      methods:{
        show(){
          this.showFlag=true;
          this.selectType=ALL;
          this.onlyContent=false;
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll=new BScroll(this.$refs.foodScroll,{click:true});
            }else{
              this.scroll.refresh();
            }
          })
        },
        foodHide(){
          this.showFlag=false;
        },
        addFirst(event){
          if(!event._constructed){
            return;
          }
          Vue.set(this.food,'count',1);
        },
        addOne(el){
          this.$emit("food-add",el)
        },
        changeType(type){
          this.selectType=type;
          this.$nextTick(() => {
            this.scroll.refresh();
          })
        },
        needShow(type,text){
          if(this.onlyContent && !text){
            return false;
          }
          if(this.selectType===ALL){
            return true;
          }else{
            return type===this.selectType
          }
        },
        changeOnly(el){
          this.onlyContent=!this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          })
        }
      }
    }
</script>

<style scoped>
  .detailFood-enter,.detailFood-leave-to{
    transform: translateX(100%);
  }
  .detailFood-enter-active,.detailFood-leave-active{
    transition: all .5s ease;
  }
  .detailFood-enter-to,.detailFood-leave{
    transform: translateX(0);
  }
.food{
  position:fixed;
  top:0;
  left:0;
  bottom:48px;
  z-index:30;
  width:100%;
  background-color:#fff;
}
  .image-header{
    position:relative;
    width:100%;
    height:0;
    padding-top:100%;
  }
  .image-header img{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
  .back{
    position:absolute;
    top:10px;
    left:0;
  }
  .back .icon-add_circle{
    display: block;
    padding:10px;
    font-size:20px;
    color:#fff;
  }
  .content{
    position: relative;
    padding:18px;
  }
  .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size:14px;
    font-weight:700;
    color:rgb(7,17,27)
  }
  .content .detail{
    margin-bottom:18px;
    line-height: 10px;
    font-size:0;
  }
  .content .detail .sell-count, .content .detail .rating{
    display: inline-block;
    font-size:10px;
    line-height: 10px;
    color:rgb(147,153,159)
  }
  .content .detail .rating{
    margin-left:12px;
  }
 .price{
    font-weight: 700;
    line-height: 24px;
  }
.price .now{
    font-size:14px;
    color:rgb(240,20,20);
  }
.price .old{
    text-decoration: line-through;
    font-size:10px;
    color:rgb(147,153,159);
  }
  .cartcontrol-wrawpper{
    position: absolute;
    right:12px;
    bottom:12px;
  }
  .buy{
    position:absolute;
    right:18px;
    bottom:18px;
    z-index: 10;
    height:24px;
    line-height:24px;
    box-sizing:border-box;
    padding:0 12px;
    font-size: 10px;
    color:#fff;
    border-radius:12px;
    background-color: rgb(0,160,220);
  }
  .buyfade-enter,.buyfade-leave-to{
    opacity:0;
  }
  .buyfade-enter-active,.buyfade-leave-active{
    transition:all 1s linear;
  }
  .buyfade-enter-to,.buyfade-leave{
    opacity:1;
  }
  .info{
    padding:18px;
  }
  .info .title{
    line-height:14px;
    margin-bottom: 6px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .info .content{
    line-height: 24px;
    padding:0 8px;
    font-size: 12px;
    color:rgb(77,85,93)
  }
  .ratings{
    padding-top:18px;
  }
  .ratings .title{
    line-height:14px;
    margin-left: 18px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-wrapper .rating-item{
    position:relative;
    padding:16px 0;
    border-bottom:1px solid rgba(7,17,27,.2)
  }
  .rating-item .user{
    position:absolute;
    right:0;
    top:16px;
    line-height:12px;
    font-size:0;
  }
  .rating-item .user .name{
    display: inline-block;
    margin-right: 6px;
    vertical-align: top;
    font-size:10px;
    color:rgb(147,153,159);
  }
  .rating-item .user .avatar{
    border-radius:50%;
    width:12px;
    height:12px;
  }
  .rating-item .time{
    font-size:10px;
    line-height: 12px;
    margin-bottom:6px;
    color:rgb(147,153,159);
  }
  .rating-item .text{
    line-height: 16px;
    font-size:12px;
    color:rgb(7,17,27);
  }
  .rating-item .text .icon-check_circle,.rating-item .text .icon-arrow_lift{
    margin-right:4px;
    line-height:24px;
    font-size: 12px;
  }
  .rating-item .text .icon-check_circle{
    color:rgb(147,153,159)
  }
  .rating-item .text .icon-arrow_lift{
  color: rgb(0,160,220);
  }
  .no-rating{
    padding:16px;
    font-size:12px;
    color:rgb(147,153,159)
  }
</style>
