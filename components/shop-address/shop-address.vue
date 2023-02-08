<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'" >
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		
		<!-- 渲染收货信息的盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人: {{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phoneNum">
						电话: {{address.telNumber}}
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址: 
				</view>
				<view class="row2-right">
					{{ addstr}}
				</view>
			</view>
		</view>
		
		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"shop-address",
		data() {
			return {
				//收货地址
				// address:{},
				
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				//1.调用小程序提供的chooseAddress()方法，即可使用选择收货地址功能
				//返回值是一个数组，第一项为错误对象，第二项为成功之后的收货地址
				const [err,succ] = await uni.chooseAddress().catch(err => err)
				
				//2.用户成功选择了收货地址
				if(err === null && succ.errMsg === "chooseAddress:ok"){
					// this.address = succ
					this.updateAddress(succ)
				}
			}
		},
	}
</script>

<style lang="scss">
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnChooseAddress{
			font-size: 14px
		}
	}
	.address-border{
		display: block;
		width: 100%;
		height: 5px;
	}
	.address-info-box{
		font-size: 14px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1{
			display: flex;
			justify-content: space-between;
			.row1-right{
				display: flex;
				justify-content: space-between;
			}
		}
		.row2{
			display: flex;
			align-items: center;
			margin-top: 10px;
			.row2-left{
				white-space: nowrap;
				margin-right: 3px;
			}
		}
	}
</style>