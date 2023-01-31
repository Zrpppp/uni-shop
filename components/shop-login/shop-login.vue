<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="120" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @tap="getUserProfile">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	
	export default {
		name:"shop-login",
		data() {
			return {
				
			};
		},
		computed:{
		...mapState('m_user',['redirectInfo'])	
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updataToken','updateRedirectInfo']),
			//用户授权之后获取用户的基本信息
			getUserProfile(){
				uni.getUserProfile({
					desc:'完善用户资料',
					success:(res) => {
						// console.log(res.userInfo);
						//将用户的数据存储到vuex中
						this.updateUserInfo(res.userInfo)
						//获取登录成功后的Token字符串
						this.getToken(res)
					},
					fail:() => {
						return uni.$showMsg('您取消了授权!')
					}	
				})
			},
			async getToken(info){
				//获取code值
				const[err,res] = await uni.login().catch(err => err)
				
				if(err || res.errMsg !== "login:ok") return uni.$showMsg('登录失败！')
				
				// console.log(res.code);
				console.log(info);
				//准备参数对象
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				
				const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				console.log(loginResult);
				if(loginResult.meta.status !== 400) return uni.$showMsg('登录失败！')
				
				//把token保存到vuex中,接口暂时无法调用，先把token写死
				// this.updataToken(loginResult.message.token)
				this.updataToken('123')
				
				uni.$showMsg('登录成功！')
				this.navigateBack()
			},
			//返回登录之前的页面
			navigateBack(){
				//redirectInfo不为null 且导航方式为switchTab
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						//导航完成后，把vuex的redirectInfo对象重置为null
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 750rpx;
	background-color: #F8F8F8;
	position: relative;
	overflow: hidden;
	
	&::after{
		content:' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform:translateY(50%) ;
	}
	
	.btn-login{
		width: 90%;
		border-radius: 120px;
		margin: 15px 0;
		background-color: #C00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>