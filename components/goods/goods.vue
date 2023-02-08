<template>
	<view class="goods-item">
		<!-- 左侧box -->
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
			<image :src="item.goods_small_logo || defaultPic " class="goods-pic"></image>
		</view>
		<!-- 右侧box -->
		<view class="goods-item-right">
			<!-- 商品名字 -->
			<view class="goods-name">{{item.goods_name}}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
				<!-- 数量框 -->
				<uni-number-box class="numberBox" @change="numChange" :min="1" v-if="showNum" :value="item.goods_count"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goods",
		props:{
			//商品信息对象
			item:{
				type:Object,
				default:{}
			},
			//是否显示图片左侧的复选框
			showRadio:{
				type:Boolean,
				default:false,
			},
			//是否显示数量框
			 showNum:{
				type:Boolean,
				default:false,
			}
		},
		methods:{
			radioChangeHandler(){
				this.$emit('radio-change',{
					//商品id
					goods_id:this.item.goods_id,
					//商品最新的勾选状态
					goods_state:!this.item.goods_state,
				})
			},
			numChange(val){
				this.$emit('num-change',{
					//商品id
					goods_id:this.item.goods_id,
					//商品新的数量
					goods_count:+val
				})
			},
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
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		padding-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
			margin-right: 5px;
		}
	}
	.goods-item-right{
		display: flex;
		flex:1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 14px;
		}
		.goods-info-box{
			margin-top: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
				color: #C00000;
				font-size: 16px;
				font-weight: bold;
			}
			.numberBox{
				margin-right: 5px;
			}
		}
	}
}
</style>