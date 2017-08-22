<template>
    <div class="seller" ref="seller">
      <div class="seller-content">
        <div class="overview">
          <h1 class="title">{{seller.name}}</h1>
          <div class="desc">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
          </div>
          <ul class="remark">
            <li class="block">
              <h2 class="name">起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>
                元
              </div>
            </li>
            <li class="block">
              <h2 class="name">商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>
                元
              </div>
            </li>
            <li class="block">
              <h2 class="name">平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>
                分钟
              </div>
            </li>
          </ul>
          <div class="favorite" @click="toggleFavorite($event)">
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <p class="favoritetext">{{favoriteText}}</p>
          </div>
        </div>
        <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content-wrapper">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon">
                  <icon :iconNum="seller.supports[index].type" :iconType="4"></icon>
                </span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics">
                <img :src="pic" alt="">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商家信息</h1>
          <ul>
            <li class="info-item" v-for="info in seller.infos">{{info}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import {saveToLocal} from '../../common/js/store'
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import  split from '../split/split'
  import icon from '../icon/icon'
    export default {
    components:{
      star,
      split,
      icon
    },
      props:{
        seller:{
          type:Object
        }
      },
      computed:{
        favoriteText(){
          return this.favorite?"已收藏":"收藏";
        }
      },
      data(){
      return{
        favorite:false
       }
      },
      watch: {
        'seller'() {
          this.$nextTick(() => {
            this._initScroll();
            this._initPics();
          });
        }
      },
      mounted() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      },
      methods: {
        toggleFavorite(event) {
          if (!event._constructed) {
            return;
          }
          this.favorite = !this.favorite;
          saveToLocal(this.seller.id, 'favorite', this.favorite);
        },
        _initScroll() {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        },
        _initPics() {
          if (this.seller.pics) {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            this.$nextTick(() => {
              if (!this.picScroll) {
                this.picScroll = new BScroll(this.$refs.picWrapper, {
                  scrollX: true,
                  eventPassthrough: 'vertical'
                });
              } else {
                this.picScroll.refresh();
              }
            });
          }
        }
      }
    }
</script>

<style scoped>
 .seller {
    position:absolute;
    top:174px;
   left:0;
    bottom:0;
    width:100%;
    overflow: hidden;
  }
  .overview{
    padding:0 18px;
  }
 .title{
   font-size:14px;
   color:rgb(7,17,27);
   line-height:14px;
   margin:18px 0 8px;
 }
 .overview .desc{
   padding-bottom: 18px;
   border-bottom: 1px solid rgba(7,17,27,.1);
   font-size:0;
 }
  .overview .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
  }
 .overview .text{
   display: inline-block;
   margin-right:12px;
   font-size:10px;
   line-height:18px;
   color:rgb(77,85,93);
   vertical-align: top;
 }
 .favorite{
   position: absolute;
   top:0;
   right:11px;
   width:50px;
   text-align: center;
 }
 .favorite .icon-favorite{
   font-size: 24px;
   line-height: 24px;
   color:rgba(7,17,27,0.1);
 }
 .favorite .icon-favorite.active{
   color:rgb(240,20,20);
 }
 .favorite .favoritetext{
   margin-top:4px;
   font-size: 10px;
   line-height: 10px;
   color:rgb(77,85,93);
 }
  .remark{
    display: flex;
    padding:18px 0;
  }
 .remark .block{
   flex:1;
   text-align: center;
   border-right:1px solid rgba(7,17,27,.1);
 }
 .remark .block:last-child{
   border: 0;
 }
  .block .name{
    font-size: 10px;
    line-height: 10px;
    color:rgb(147,153,159);
    margin-bottom: 4px;
  }
 .block .content{
   font-size: 10px;
   color:rgb(7,17,27);
 }
 .block .content .stress{
   font-size: 24px;
   line-height: 24px;
   font-weight:200;
   color:rgb(7,17,27);
 }
  .bulletin{
    padding:18px 18px 0;
  }
 .bulletin .content-wrapper{
    padding:0 12px 16px;
 }
 .bulletin .content-wrapper .content{
  font-size: 12px;
   line-height:24px;
   font-weight:200;
   color:rgb(240,20,20);
 }
 .supports .support-item{
   padding:16px 12px;
   border-top: 1px solid rgba(7,17,27,.1);
   font-size:0;
 }
 .supports .support-item .icon{
   display: inline-block;
   width:16px;
   height:16px;
   vertical-align: top;
   margin-right:6px;
 }
 .supports .support-item .text{
   font-size: 12px;
   line-height:16px;
   font-weight: 200;
   color:rgb(7,17,27);

 }
  .pics {
    padding-left:18px;
  }
 .pics .title{
   margin-bottom:12px;
 }
 .pic-wrapper{
   width:100%;
   overflow: hidden;
   white-space: nowrap;
 }
 .pic-list{
   font-size: 0;
 }
 .pic-item{
   display: inline-block;
   margin-right: 6px;
   width:120px;
   height:90px;
 }
 .pic-item:last-child{
   margin:0;
 }
  .pic-item img{
    width:120px;
    height:90px;
    vertical-align: middle;
  }
  .info{
    padding:0 18px;
  }
  .info .title{
    margin-bottom:12px;
  }
  .info-item{
    padding:16px 12px;
    line-height:16px;
    font-size:12px;
    font-weight:200;
    color:rgb(7,17,27);
    border-top:1px solid rgba(7,17,27,.1);
  }
</style>
