<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon">
              <icon :iconNum="seller.supports[0].type"></icon>
            </span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" @click="showDetail" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-thumb_up"></i>
        </div>
      </div>
      <div @click="showDetail" class="bulletin-wrapper">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-thumb_up"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
      <transition name="fade">
        <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon">
                  <icon :iconNum="seller.supports[index].type" :iconType="2"></icon>
                </span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">
                粥品香坊其烹饪粥料的秘方源于中国千年古法，在融合现代制作工艺，有世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费之青睐，发展至今成为粥类领导品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
              </p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i @click="closeDetail" class="icon-remove_circle_outline"></i>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
  import star from '../star/star'
import icon from '../icon/icon'
    export default {
    components:{
      star,
      icon
    },
      props:{
        seller:{
          type:Object
        }
      },
      data(){
        return {
          detailShow:false
        }
      },
      methods:{
        showDetail(){
          this.detailShow=true;
        },
        closeDetail(){
          this.detailShow=false;
        }
      }
    }
</script>

<style scoped>
  .header{
    position: relative;
    color: #ffffff;
    background-color: rgba(7,17,27,.2);
    overflow: hidden;
  }
  .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size:0;
    position:relative;
  }
  .content-wrapper .content{
    display: inline-block;
    margin-left:16px;
  }
  .content-wrapper  .avatar{
    display:inline-block;
    vertical-align: top;
  }
  .content-wrapper .avatar img{
    width:64px;
    height:64px;
    border-radius: 2px;
  }
  .content-wrapper .content .title{
    margin:2px 0 8px 0;
  }
  .content-wrapper .content .brand{
    display: inline-block;
    width:30px;
    height: 18px;
    background:url("brand@2x.png") no-repeat center/100%;
  }
  .content-wrapper .content .name{
    margin-left: 6px;
    font-size:16px;
    line-height:18px;
    font-weight: bold;
    vertical-align: top;
  }
  .content-wrapper .content .description{
    margin-bottom:10px;
    line-height:12px;
    font-size:12px;
  }
  .content-wrapper .content .support .icon{
    display: inline-block;
    width:12px;
    height:12px;
    margin-right:4px;
    vertical-align: top;
  }
  .content-wrapper .content .support  .text{
    font-size:10px;
    line-height: 12px;
  }
  .content-wrapper .support-count{
    position:absolute;
    right:12px;
    bottom:14px;
    height:24px;
    line-height: 24px;
    border-radius:14px;
    background-color: rgba(0,0,0,.2);
    text-align: center;
    padding:0 8px;
  }
  .content-wrapper .support-count .count{
    font-size:10px;
  }
  .content-wrapper .support-count .icon-thumb_up{
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  .bulletin-wrapper{
    position: relative;
    height:28px;
    line-height:28px;
    padding:0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7,17,27,.2);
  }
  .bulletin-wrapper .bulletin-title{
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width:22px;
    height:12px;
    background:url("bulletin@2x.png") no-repeat center/cover;
  }
  .bulletin-wrapper .bulletin-text{
    margin:0 4px;
    font-size:10px;
    vertical-align: top;
  }
  .bulletin-wrapper .icon-thumb_up{
    position:absolute;
    top:8px;
    right:10px;
    font-size: 10px;
  }
  .header .background{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: -1;
    filter:blur(10px);
  }
  .header .background img{
    width:100%;
    height:100%;
  }
  .header .detail{
    position:fixed;
    top:0;
    left:0;
    z-index: 100;
    width:100%;
    height:100%;
    overflow: auto;
    background-color: rgba(7,17,27,.8);
    -webkit-backdrop-filter: blur(10px);
  }
  .detail-wrapper{
    min-height:100%;
    width:100%;
  }
  .detail-wrapper .detail-main{
    margin-top:64px;
    padding-bottom:64px;
  }
  .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .detail-main .title{
    display: flex;
    width:80%;
    margin:28px auto 24px;
  }
  .detail-main .title .line{
    flex:1;
    position:relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,0.2);
  }
  .detail-main .title .text{
    padding:0 12px;
    font-weight: 700;
    font-size: 14px;
  }
  .detail-main .supports{
    width:80%;
    margin:0 auto;
  }
  .supports .support-item{
    padding:0 12px;
    margin-bottom: 12px;
    font-size:0;
  }
  .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .supports .support-item .icon{
    display: inline-block;
    width:16px;
    height:16px;
    vertical-align: top;
    margin-right:6px;
  }
  .detail-main .bulletin{
    width:80%;
    margin:0 auto;
  }
  .detail-main .bulletin .content{
    padding:0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  .supports .support-item .text{
    line-height: 16px;
    font-size:12px;
  }
  .detail .detail-close{
    position: relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size:32px;
  }
  .star-wrapper{
    margin-top:18px;
    padding:2px 0;
    text-align: center;
  }
  .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active{
    transition:all 0.5s linear;
  }
  .fade-leave-active{
    transition:all 0.3s linear;
  }
  .fade-enter-to{
    opacity: 1;
  }
</style>
