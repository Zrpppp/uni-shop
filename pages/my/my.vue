<template>
	<view class="my-container">
		<shop-login v-if="!token"></shop-login>
		<shop-userInfo v-else></shop-userInfo>
	</view>
</template>

<script>
	import badgeMixins from '@/mixins/tabBar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMixins],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page,.my-container{
	height: 100%;
}
</style>
