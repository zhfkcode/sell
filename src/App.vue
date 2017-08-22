<template>
  <div id="app">
     <v-header :seller="seller"></v-header>
    <div class="tab">
      <router-link :to="{path:'goods'}" active-class="active" class="tab-item" name="goGoods">商品</router-link>
      <router-link :to="{path:'ratings'}" active-class="active" class="tab-item" name="goRatings">评论</router-link>
      <router-link :to="{path:'seller'}"active-class="active" class="tab-item"
  name="goSellers">商家</router-link>
    </div>
    <div class="content">
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    </div>
  </div>
</template>

<script>
  import {urlParse} from './common/js/util'
  import VHeader from './components/header/header'
  const ERR_OK=0;
  export default {
    components:{
      VHeader
    },
  data (){
      return{
        seller:{
          id:(()=>{
            let queryParam=urlParse();
            console.log(queryParam);
            return queryParam.id;
          })
        },
        active:false
      }
  },
    created() {
      this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
        response=response.body;
      if(response.errno===0){
        this.seller=response.data;
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
//      this.seller = data.seller;
    },

}
</script>

<style>
  body,html{
    line-height: 1;
    font-weight: 200;
    font-family:'PingFang SC','STHeitiSC-Light','Helvetica-Light',arial;
  }
.clearfix{
  display:inline-block;
}
  .clearfix:after{
    display: block;
    content:'';
    height:0;
    line-height: 0;
    clear:both;
    visibility: hidden;
  }
  /*字体图标*/
  @font-face {
    font-family: 'sell-icon';
    src:  url('common/fonts/sell-icon.eot?9re8z4');
    src:  url('common/fonts/sell-icon.eot?9re8z4#iefix') format('embedded-opentype'),
    url('common/fonts/sell-icon.ttf?9re8z4') format('truetype'),
    url('common/fonts/sell-icon.woff?9re8z4') format('woff'),
    url('common/fonts/sell-icon.svg?9re8z4#sell-icon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'sell-icon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-add_circle:before {
    content: "\e900";
  }
  .icon-arrow_lift:before {
    content: "\e901";
  }
  .icon-check_circle:before {
    content: "\e902";
  }
  .icon-close:before {
    content: "\e903";
  }
  .icon-favorite:before {
    content: "\e904";
  }
  .icon-keyboard_arrow_right:before {
    content: "\e905";
  }
  .icon-remove_circle_outline:before {
    content: "\e906";
  }
  .icon-shopping_cart:before {
    content: "\e907";
  }
  .icon-thumb_down:before {
    content: "\e908";
  }
  .icon-thumb_up:before {
    content: "\e909";
  }

  .tab{
  position: relative;
  display: flex;
  width:100%;
  height:40px;
  line-height: 40px;

}
.tab:after{
  display: block;
  position: absolute;
  left:0;
  bottom:0;
  width:100%;
  border-top:1px solid rgba(7,17,77,0.1);
  content:'';
}
  .tab .tab-item{
    flex:1;
    text-align: center;
    display: block;
    font-size:14px;
    color:rgb(77,85,93);
  }
.tab .tab-item.active{
  color:red;
}
</style>
