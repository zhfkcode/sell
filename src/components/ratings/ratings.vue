<template>
    <div class="ratings" ref="ratingWrapper">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star class="star" :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评价</span>
              <star class="star" :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">送达时间</span>
              <span class="deliveTime">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingSelect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" @rating-select="changeType" @changeOnly="changeOnly"></ratingSelect>
        <div class="rating-wrapper" >
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
              <div class="avatar">
                <img :src="rating.avatar" alt="">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star class="star" :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend">
                  <i :class="{'icon-arrow_lift':rating.rateType===0,'icon-check_circle':rating.rateType===1}"></i>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formaDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  const ERR_OK=0;
  const POSITIVE=0;
  const NEGATIVE=1;
  const ALL=2;
  import BScroll from 'better-scroll'
  import  split from '../split/split'
  import ratingSelect from '../ratingselect/ratingselect'
  import star from '../star/star'
  import {formaDate} from '../../common/js/date'
    export default {
  components:{
    star,
    ratingSelect,
    split
  },
      props:{
        seller:{
          type:Object
        },

      },
      data(){
    return{
      ratings:[],
      selectType:ALL,
      onlyContent:false,
    }
      },
      methods:{
        changeOnly(el){
          this.onlyContent=!this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          })
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
      },
      filters:{
        formaDate(time){
          let date=new Date(time);
          return formaDate(date,'yyyy-MM-dd hh:mm');
        }
      },
      created(){
        this.$http.get('/api/ratings').then((res)=>{
          res=res.body;
          if(res.errno===ERR_OK){
            this.ratings=res.data;
            this.$nextTick(()=>{
              this.scroll=new BScroll(this.$refs.ratingWrapper,{
                click:true
              })
            })

          }
        })
      }
    }
</script>

<style scoped>
  .ratings{
    position: absolute;
    top:174px;
    left:0;
    bottom:0;
    width:100%;
    overflow: hidden;
  }
  .overview{
    display: flex;
    padding:18px 0;
  }
  .overview-left{
    flex:0 0 137px;
    width:137px;
    border-right:1px solid rgba(7,17,27,.2);
    text-align: center;
  }
  .overview-left .score{
    margin-bottom:6px;
    line-height:28px;
    font-size:24px;
    color:rgb(255,153,0);
  }
  .overview-left .title{
    margin-bottom: 8px;
    font-size: 12px;
    line-height:12px;
    color:rgb(7,17,27)
  }
  .overview-left .rank{
    padding-bottom:6px;
    font-size:10px;
    line-height: 10px;
    color:rgb(147,153,159)
  }
  .overview-right{
    flex:1;
    padding-left:24px;
  }
  .score-wrapper{
    margin-bottom:8px;
    font-size: 0;
  }
  .score-wrapper .title{
    display: inline-block;
    vertical-align: top;
    font-size:12px;
    line-height:18px;
    color:rgb(7,17,27);
  }
  .score-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin:0 12px;
  }
  .score-wrapper .score{
    display: inline-block;
    vertical-align: top;
    line-height:18px;
    font-size:12px;
    color:rgb(255,153,0)
  }
  .score-wrapper .deliveTime{
    display: inline-block;
    line-height:18px;
    vertical-align: top;
    font-size:12px;
    color:rgb(147,153,159);
    margin-left:12px;
  }
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-wrapper .rating-item{
    display:flex;
    padding:18px 0;
    border-bottom:1px solid rgba(7,17,27,.2)
  }
  .rating-item .avatar{
    flex:0 0 28px;
    width:28px;
    border-radius: 50%;
  }
  .rating-item .avatar img{
    width:28px;
    height:28px;
    border-radius: 50%;
  }
  .rating-item .content{
    position: relative;
    flex:1;
    padding-left:12px;
  }
  .rating-item .name{
    margin-bottom:4px;
    font-size:10px;
    line-height:12px;
    color:rgb(7,17,27);
  }
  .rating-item .star-wrapper{
    margin-bottom: 3px;
    font-size:0;
  }
  .rating-item .star-wrapper .star{
    display: inline-block;
    margin-right:6px;
    vertical-align: top;
  }
  .rating-item .star-wrapper .delivery{
    display: inline-block;
    line-height:12px;
    font-size:10px;
    font-weight: 200;
    color:rgb(147,153,159);
    vertical-align: top;
  }
  .rating-item .text{
    font-size:12px;
    color:rgb(7,17,27);
    line-height:18px;
  }
  .rating-item .recommend{
    margin-top:5px;
    font-size: 0;
  }
  .rating-item .recommend .icon-check_circle,.rating-item .recommend .icon-arrow_lift{
    margin-right:8px;
    line-height:16px;
    font-size: 12px;
  }
  .rating-item .recommend .icon-check_circle{
    color:rgb(147,153,159)
  }
  .rating-item .recommend .icon-arrow_lift{
    color: rgb(0,160,220);
  }
  .rating-item .recommend .item{
    display: inline-block;
    font-size:9px;
    line-height: 16px;
    color:rgb(147,153,159);
    padding:0 6px;
    border:1px solid rgba(7,17,27,0.1);
    border-radius: 2px;
    margin-right: 8px;
    margin-bottom: 3px;
  }
  .rating-item .time{
    position: absolute;
    top:0;
    right:0;
    font-size: 10px;
    line-height:12px;
    font-weight: 200;
    color:rgb(147,153,159);
  }
  @media only screen and (max-width: 320px){
    .overview-left{
      flex:0 0 120px;
      width:120px;
    }
    .overview-right{
      padding-left:6px;
    }
  }
</style>
