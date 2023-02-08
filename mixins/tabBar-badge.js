import {mapGetters} from 'vuex'

export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		//监听total的变化
		total(){
			//如果total变化就调用setBadge()方法重新设置徽标值
			this.setBadge()
		}
	},
	onShow(){
		//在页面刚展示的时候，设置数字徽标
		this.setBadge()
	},
	methods:{
		setBadge(){
			//调用uni.setTabBarBadge()方法，为购物车设置右上角的徽标
			uni.setTabBarBadge({
				index:2,
				text:this.total + ''  //text的值必须是字符串，不能是数字
				
			})
		},
	},
}