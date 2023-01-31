<template>
	<view class="search-contanier" :style="{'background-color':bgc}" @click="searchClick">
		<view class="search-box" :style="{'border-radius':radius + 'px'}">
			<!-- 使用uni-ui提供的图标组件 -->
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		props:{
			//背景颜色
			bgc:{
				type:String,
				default:'#C00000'
			},
			//圆角尺寸
			radius:{
				type:Number,
				//单位是px
				default:18
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchClick(){
				this.$emit('searchClick')
			}
		}
	}
</script>

<style lang="scss">
.search-contanier{
	height: 50px;
	// background-color: #C00000;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.search-box{
		height: 36px;
		background-color: #FFFFFF;
		// border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-style: 15px;
			margin-left:5px ;
		}
	}
}
</style>