<template>
	<view class="shop-settle-container">
		
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
		</label>
		
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text	class="amount">￥{{checkedPrice}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
		
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"shop-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedPrice']),
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.shop-settle-container{
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	font-size: 15px;
	padding-left:5px;
	background-color: #fff;
	z-index: 999;
	.radio{
		display: flex;
		align-items: center;
		
	}
	
	.amount-box{
		.amount{
			color: #C00000;
			font-weight: bold;
			
		}
	}
	
	.btn-settle{
		background-color: #C00000;
		color: #fff;
		height: 50px;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
		min-width: 100px;
	}
}
</style>