import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		//挂载购物车vuex模块，模块内成员的访问路径调整为m_xxxx
		'm_cart':moduleCart,
		'm_user':moduleUser,
	}
})

export default store