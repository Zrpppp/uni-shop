<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="homeSwiper">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goodsid='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-image" :src="item.image_src"></image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
				<!-- 左侧大图片的盒子 -->
				<navigator class="left-img-box" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
				</navigator>
				<!-- 右侧多个小图片的盒子 -->
				<view class="right-img-box">
					<navigator class="rigth-img-item" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2 !== 0" :url="item2.url">
						<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx' }" mode="widthFix"></image>
					</navigator>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据列表
				swiperList:[],
				//分类导航的数据列表
				navList:[],
				//楼层的数据
				floorList:[],
			};
		},
		onLoad(){
			//调动方法获取轮播图数据
			this.getSwiperLisr()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			//获取首页轮播图数据方法
			async getSwiperLisr(){
				const {data:res} =	await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res)	
				//请求失败
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
				// uni.$showMsg('数据请求成功！')
			},
			//获取首页导航数据方法
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			//首页轮播图点击跳转方法
			navClickHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			//获取首页楼层数据方法
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				
				//对数据进行处理
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
		}
	}
</script>

<style lang="scss">
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
}
.nav-image{
	width: 128rpx;
	height: 140rpx;
}
.homeSwiper{
	height: 350rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.floor-title{
	height: 60rpx;
	transform: translate(50%,50%);
}
.floor-img-box{
	display: flex;
	padding-left: 12rpx;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
</style>
