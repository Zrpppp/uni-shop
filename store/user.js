export default {
	//开启命名空间
	namespaced:true,
	
	//数据
	state:() => ({
		//收货地址
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		
		//登录成功之后的token字符串
		token:uni.getStorageSync('token') || '',
		
		//用户的基本数据
		userInfo:JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		
		//重定向的object对象{openType,from}
		redirectInfo:null
	}),
	
	//方法
	mutations:{
		//更新收货地址
		updateAddress(state,address){
			state.address = address
			
			this.commit('m_user/saveAddressToStorage')
		},
		//将address持久化存储到本地的方法
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		//更新用户的基本信息
		updateUserInfo(state,userInfo){
			state.userInfo = userInfo
			
			this.commit('m_user/saveUserInfoToStorage')
		},
		//将userInfo持久化存储到本地
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		//更新token
		updataToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		//将token持久化存储到本地
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		//更新重定向的信息对象
		updateRedirectInfo(state,info){
			state.redirectInfo = info
			// console.log(state.redirectInfo);
		}
	},
	
	getters:{
		//收货地址
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}