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
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
		
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"shop-settle",
		data() {
			return {
				//倒计时秒数
				seconds:3,
				//定时器id
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedPrice']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			isFullCheck(){
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			//点击结算按钮
			settlement(){
				//先判断是否勾选了要结算的商品
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品!')
				
				//在判断用户是否选择了收货地址
				if(!this.addstr) return uni.$showMsg('请选择收货地址!')
				
				//最后判断用户是否登录了
				// if(!this.token) return uni.$showMsg('请先登录!')
				if(!this.token) return this.delayNavigate()
			},
			//延时导航到登录页面
			delayNavigate(){
				this.showTips(this.seconds)
				
				this.timer = setInterval(() => {
					this.seconds--
					
					if(this.seconds <= 0){
						//清除定时器
						clearInterval(this.timer)
						
						//跳转到登录页面
						uni.switchTab({
							url:'/pages/my/my',
							//页面跳转成功之后的回调函数
							success:() => {
								this.updateRedirectInfo({
									//跳转方式
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						
						//终止后续代码的运行（秒数为0时，不再展示toast）
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			//展示倒计时的方法
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算!' + n + '秒后自动跳转到登录页',
					mask:true,
					duration:1500
				})
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