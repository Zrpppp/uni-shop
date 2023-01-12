<template>
	<view>
		<view class="search-box">
			<uni-search-bar cancelButton="none" bgColor="#F7F7F7" :radius="100"  @input="input" :value='inputValue'></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="goToDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title" v-if="historyList.length !== 0">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="deleteHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="goToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				//搜索框的值
				inputValue:'',
				//搜索结果列表
				searchResults:[],
				//搜索历史数据
				historyList:[]
			};
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('inputValue',) || '[]')
		},
		methods:{
			//input输入事件
			input(e){
				//清除定时器
				clearTimeout(this.timer)
				//延迟650ms
				this.timer = setTimeout(()=>{
					this.inputValue = e
					this.getSearchList()
				},650)
			},
			async getSearchList(){
				//判断搜索关键词是否为空
				if(this.inputValue.length === 0) {
					this.searchResults = []
					return 
				}
				
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.inputValue})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				
				this.saveSearchHistory()
			},
			goToDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			saveSearchHistory(){
				//this.historyList.push(this.inputValue)
				const set = new Set(this.historyList)
				set.delete(this.inputValue)
				set.add(this.inputValue)
				
				this.historyList = Array.from(set)
				// console.log(this.historyList);
				
				//对搜索历史数据，进行持久化存储
				uni.setStorageSync('inputValue',JSON.stringify(this.historyList))
			},
			deleteHistory(){
				this.historyList = []
				uni.setStorageSync('inputValue','[]')
			},
			goToGoodsList(item){
				this.inputValue = item
				this.getSearchList()
			}
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			//超出部分用"..."代替
			text-overflow: ellipsis;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content:space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		
		.uni-tag{
			margin-top: 5px 5px 0 0;
			
		}
	}
}
</style>
