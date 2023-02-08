export default {
	namespaced:true,
	state:() => ({
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations:{
		addToCart(state,goods){
			//根据goods_id查询购物车中对应商品的信息对象
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			// console.log(findResult);
			
			if(!findResult) {
				//如果没有找到相同id的商品则push进数组
				state.cart.push(goods)
			}else{
				//如果找到相同id的商品则数量加一
				findResult.goods_count ++
			}
			// console.log(state.cart);
			this.commit('m_cart/saveToStoreage')
		},
		saveToStoreage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			//根据goods_id查询购物车中对应商品的信息对象
			const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
			if(findRes){
				//更新勾选状态
				findRes.goods_state = goods.goods_state
				//持久化存储到本地
				this.commit('m_cart/saveToStoreage')
			}
		},
		//更新购物车中的商品数量
		updateGoodsCount(state, goods){
			//根据goods_id查询购物车中对应商品的信息对象
			const findRes = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findRes){
				//更新对应数量
				findRes.goods_count = goods.goods_count
				//持久化存储到本地
				this.commit('m_cart/saveToStoreage')
			}
		},
		//根据id从购物车中删除对应的商品信息
		removeGoodsById(state,goods_id){
			//调佣数组的fliter方法进行过滤
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			//持久化存储到本地
			this.commit('m_cart/saveToStoreage')
		},
		//更新所有商品的勾选状态
		updateAllGoodsState(state,newState){
			//循环更新购物车中每一件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			//持久化存储到本地
			this.commit('m_cart/saveToStoreage')
		}
		
	},
	getters:{
		//统计购物车中商品的总数
		total(state){
			// let count = 0
			// state.cart.forEach(goods => count += goods.goods_count)
			// return count
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		//已勾选的商品的总数量
		checkedCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total,item) =>  total += item.goods_count,0)
		},
		//已勾选商品的总价
		checkedPrice(state){
			return state.cart.filter(x => x.goods_state)
			.reduce((total,item) => total += item.goods_count * item.goods_price,0)
			.toFixed(2)
		}
	}
}