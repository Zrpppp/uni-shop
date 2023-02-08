<template>
	<view v-if="goods_info.goods_name" class="goods-detail">
		<!-- 轮播图区域 -->
		<swiper circular indicator-dots autoplay 
		:interval="3000" :duration="1000" indicator-active-color="#C00000" indicator-color="#efefef">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-fav :checked="check" class="favBtn" :circle="true" 
					bg-color="#C00000" bg-color-checked="#007aff" fg-color="#ffffff" 
					fg-color-checked="#ffffff" @click="favClick" />
				</view>
			</view>
			<!-- 运费 -->
			<view class="freight">
				快递:免运费
			</view>
		</view>
		
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		
		
		<view class="top" @click="goToTop" v-if="isShow">
			<uni-icons type="top" :size="30" color="#C00000"></uni-icons>
		</view>
		<!-- 商品导航区域 -->
		<view class="goods_nav">
			<uni-goods-nav  :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations,mapGetters} from 'vuex'
	
	export default {
		computed:{
			...mapGetters('m_cart',['total'])
		},
		watch:{
			// total(newVal){
			// 	const findRes = this.options.find(x => x.text === '购物车')
			// 	if(findRes){
			// 		findRes.info = newVal
			// 	}
			// }
			total:{
				handler(newVal){
					const findRes = this.options.find(x => x.text === '购物车')
					if(findRes){
						findRes.info = newVal
					}
				},
				//immediate属性用来声明此监听器是否在页面初次加载完毕后立即调用
				immediate:true
			}
		},
		data() { 
			return {
				check:false,
				goods_info:{},
				isShow:false,
				 options: [{
							icon: 'headphones',
							text: '客服'
						}, {
							icon: 'shop',
							text: '店铺',
						}, {
							icon: 'cart',
							text: '购物车',
							infoBackgroundColor:'#C00000',
							info: 0
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#C00000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			}
		},
		onLoad(options){
			//获取商品id
			// const goods_id = options.goods_id
			//调用请求商品详情数据方法
			// this.getGoodsDetail(goods_id)
			this.getGoodsDetail(options.goods_id)
		},
		onPageScroll(e) {
			// console.log(e.scrollTop);
			this.isShow = e.scrollTop > 600
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			async getGoodsDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status !== 200) return uni.$showMsg()
				
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block"').replace(/webp /g, 'jpg')
				
				this.goods_info = res.message
			},
			preview(index){
				//调用方法预览图片,点击图片放大
				uni.previewImage({
					//预览时，确认显示图片的索引
					current:index,
					//所有图片url地址的数组,通过map循环，
					//map方法是通过循环的方式一个一个项的处理原来的数组，并返回新的数组，同时，不会改变原数组的值
					urls:this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				// console.log(e);
				if(e.content.text === '加入购物车'){
					//组织商品的信息对象
					const goods = {
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true
					}
					//调用addtocart
					this.addToCart(goods)
					
					uni.$showMsg('添加成功~')
				}else{uni.$showMsg('添加失败~')}
			},
			goToTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:250
				})
			},
			//收藏
			favClick(){
				this.check = !this.check
				this.$forceUpdate()
			}
		}
	}
</script>

<style lang="scss">
	.top {
			height: 80rpx;
			width: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border-radius: 50%;
			background-color: rgba($color: #efefef, $alpha: 0.8);
			border: 1rpx solid #ddd;
			position: fixed;
			z-index: 999;
			right: 30rpx;
			bottom: 100rpx;
			animation: heart 0.3s;
			@keyframes heart {
				0% {
					right: -30rpx;
				}
				100% {
					right: 30rpx;
				}
			}
		}
	swiper{
		height: 750rpx;
		
		image{
			width: 100%;
			height: 100%;	
		}
	}
	.goods-info-box{
		padding: 10px 0 10px 10px ;
		.price{
			color: #C00000;
			font-weight: bold;
			font-style: 18rpx;
			margin: 10px 0;
		}
		.goods-info-body{
			display: flex;
			justify-content: space-between;
			.goods-name{
				font-style: 13px;
				margin-right: 10px;
			}
			.favi{
				width: 120px;
				font-style: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				// border-left: 1px solid #efefef;
				color: gary;
			}
		}
		.freight{
			font-style: 12px;
			color: #808080;
			margin: 10px 0;
		}
	}
	.goods_nav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index:999;
	}
	.goods-detail{
		padding-bottom: 50px;
	}
	.favBtn {
			margin: 0 20rpx 20rpx 0;
		}

</style>
