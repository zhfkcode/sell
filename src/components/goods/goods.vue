<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-if="item.type>0" class="icon" >
              <icon :iconNum="item.type"></icon>
            </span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list foot-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="foodselect(food,$event)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.sellCount}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrl-wrapper">
                  <cart-control :food="food" @add-one="addOne"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="cricleBall" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shop-cart>
    <food :food="selectedFoods" ref="food" @food-add="addOne"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import icon from '../icon/icon'
  import shopCart from '../shopcart/shopcart'
  import cartControl from '../cartcountrl/cartcountrl'
  import food from '../food/food'
const ERR_OK=0;
    export default {
      components:{
        icon,
        shopCart,
        cartControl,
        food
      },
      props:{
        seller:{
          type:Object
        }
      },
      data(){
        return{
          goods:[],
          listHeight:[],
          scrollY:0,
          selectedFoods:{}
        }
      },
      computed:{
        currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
            return i;
            }
          }
          return 0;

        },
        selectFoods(){
          let foods=[];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if(food.count){
                foods.push(food);
              }
            })
          });
          return foods;
        }
      },
      created(){
        this.$http.get('/api/goods').then((res)=>{
          res=res.body;
          if(res.errno===ERR_OK){
            this.goods=res.data;
            this.$nextTick(()=>{
              this._initScroll();
              this._calculateHeight();
            })
          }
        })
      },
      methods:{
        _initScroll(){
          this.menuScroll=new BScroll(this.$refs.menuWrapper,{
            click:true
          });
          this.foodsScroll=new BScroll(this.$refs.foodWrapper,{
            probeType:3,
            click:true
          });
          this.foodsScroll.on('scroll',(pos)=>{
            this.scrollY=Math.abs(Math.round(pos.y))
          })
        },
        _calculateHeight(){
          let foodList=this.$refs.foodWrapper.getElementsByClassName("foot-list-hook");
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i];
            height+=item.clientHeight;
            this.listHeight.push(height);
          }
        },
        selectMenu(index,event){
            if(!event._constructed){
              return;
            }
            let foodList=this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
            let el=foodList[index];
            this.foodsScroll.scrollToElement(el,300)
        },
        addOne(el){
          this.$nextTick(()=>{
            this.$refs.cricleBall.drop(el);
          })

        },
        foodselect(food,event){
          if(!event._constructed){
            return;
          }
          this.selectedFoods=food;
          this.$refs.food.show();
        }
      }
    }
</script>

<style>
.goods{
  position:absolute;
  display: flex;
  top:174px;
  bottom:64px;
  width:100%;
  overflow: hidden;
}
.goods .menu-wrapper{
  flex:0 0 80px;
  width:80px;
  background-color: #f3f5f7;
}
.menu-wrapper .menu-item{
  display: table;
  height:54px;
  width:56px;
  line-height: 14px;
  padding:0 12px;
}
.menu-wrapper .menu-item.current{
  background:#fff;
}
.menu-wrapper .menu-item.current .text:after{
  border:0;
}
.menu-wrapper .text{
  position:relative;
  display: table-cell;
  width:56px;
  vertical-align: middle;
  font-size: 12px;
}
.menu-wrapper .menu-item .text:after{
  display: block;
  position: absolute;
  left:0;
  bottom:0;
  width:100%;
  border-top:1px solid rgba(7,17,27,0.1);
  content:'';
}
.menu-wrapper .text .icon{
  display: inline-block;
  width:12px;
  height:12px;
  vertical-align: top;
}
.goods .foods-wrapper{
  flex:1;
}
.food-list .title{
  padding-left:14px;
  height:26px;
  line-height: 26px;
  border-left:2px solid #d9dde1;
  font-size:12px;
  color:rgb(147,153,159);
  background:#f3f5f7;
}
  .food-item{
    position: relative;
    display: flex;
    margin:18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
.food-item:last-child{
  border:0;
  padding:0;
}
.food-item .icon{
  flex:0 0 57px;
  margin-right: 10px;

}
.food-item .icon img{
  width:57px;
  height:57px;
}
.food-item .content{
  flex:1;
}
.food-item .content .name{
  margin:2px 0 8px 0;
  height:14px;
  line-height:14px;
  font-size: 14px;
  color:rgb(7,17,27)
}
.food-item .content .desc,.food-item .content .extra{
  line-height:10px;
  font-size:10px;
  color:rgb(147,153,159);
}
.food-item .content .desc{
  margin-bottom:8px;
}
.food-item .content .extra .count{
  margin-right:12px;
}
.food-item .content .price{
  font-weight: 700;
  line-height: 24px;
}
.cartcontrl-wrapper{
  position: absolute;
  right:0;
  bottom:12px;
  width:84px;
text-align: right;
}
.food-item .content .price .now{
  font-size:14px;
  color:rgb(240,20,20);
}
.food-item .content .price .old{
  text-decoration: line-through;
  font-size:10px;
  color:rgb(147,153,159);
}
</style>
