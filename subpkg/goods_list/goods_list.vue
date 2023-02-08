<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="goToDetail(item)">
				<goods :item='item'></goods>
			</view>
		</view>
		<view class="top" @click="goToTop" v-if="isShow">
			<uni-icons type="top" :size="30" color="#C00000"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//参数对象
				queryObj:{
					//查询关键词
					query:'',
					//商品分类id
					cid:'',
					//页码值
					pageNum:1,
					//每页显示多少数据
					pagesize:10,
				},
				//商品列表数据
				goodsList:[],
				//总数量
				total:0,
				//是否正在请求数据
				isLoading:false,
				//返回顶部
				isShow:false
			};
		},
		onLoad(options){
			// console.log(options);
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// console.log(this.queryObj);
			
			//调用获取商品列表数据的方法
			this.getGoodsList()
		},
		//触底事件
		onReachBottom(){
			//节流阀
			if(this.isLoading) return
			//让页码值自增+1
			this.queryObj.pageNum += 1
			//重新获取列表数据
			this.getGoodsList()
		},
		//下拉刷新事件
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pageNum = 1
			this.total = 0
			this.isLoading = true
			this.goodsList = []
			
			//重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		onPageScroll(e) {
			// console.log(e.scrollTop);
			this.isShow = e.scrollTop > 600
		},
		methods:{
			async getGoodsList(cb){
				//打开节流阀
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(res.meta.status !== 200) return uni.$howMsg()
				//关闭节流阀
				this.isLoading = false
				
				//数据请求完毕，就调用cb回调函数
				cb && cb()
				// console.log(this.goodsList);
				// console.log(this.total);
				
				//为数据赋值,通过展开运算符的形式，进行新旧数据的拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			goToDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			goToTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:250
				})
			}
		}
	}
</script>

<style lang="scss">
.top {
		height: 80rpx;
		width: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50%;
		background-color: rgba($color: #efefef, $alpha: 0.8);
		border: 1rpx solid #ddd;
		position: fixed;
		z-index: 999;
		right: 30rpx;
		bottom: 100rpx;
		animation: heart 0.3s;
		@keyframes heart {
			0% {
				right: -30rpx;
			}
			100% {
				right: 30rpx;
			}
		}
	}
</style>
