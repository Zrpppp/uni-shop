<template>
	<view class="goods-item">
		<!-- 左侧box -->
		<view class="goods-item-left">
			<image :src="item.goods_small_logo || defaultPic " class="goods-pic"></image>
		</view>
		<!-- 右侧box -->
		<view class="goods-item-right">
			<!-- 商品名字 -->
			<view class="goods-name">{{item.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		filters:{
			tofixed(num){
				return num.toFixed(2)
			}
		},
		data() {
			return {
				//默认图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			margin-right: 5px;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 14px;
			
		}
		.goods-info-box{
			.goods-price{
				color: #C00000;
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 10px;
			}
		}
	}
}
</style>