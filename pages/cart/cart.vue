<template>
	<view class="cart-container" v-if='cart.length !== 0'>
		<!-- 收货地址组件 -->
		<shop-address></shop-address>
		<!-- 商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 循环渲染购物车的商品信息 -->
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
			<uni-swipe-action-item :right-options="options" @click="swiperItemClick(item)">
				<goods :item="item" :show-radio="true" :show-num="true" @num-change="numberChange"  @radio-change="radioChangeHandler"></goods>
			</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 使用底部结算组件 -->
		<shop-settle></shop-settle>
	</view>
	
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">请添加商品~</text>
	</view>
</template>

<script>
	import badgeMixins from '@/mixins/tabBar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		mixins:[badgeMixins],
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				//调用vuex映射的方法更新勾选状态
				this.updateGoodsState(e)
			},
			numberChange(e){
				this.updateGoodsCount(e)
			},
			swiperItemClick(item){
				this.removeGoodsById(item.goods_id)
			}
			
		},
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#C00000'
					}
				}]
			};
		},
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom: 50px;
}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #EFEFEF;
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 100px;
		height: 100px;
	}
	.tip-text{
		margin-top: 10px;
		font-style: 12px;
		color: gray;
	}
}
</style>

