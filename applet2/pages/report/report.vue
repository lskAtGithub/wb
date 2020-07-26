<template>
	<view class="page">
		<view class="topbar" v-for="(item,index) in topbarList" :key="index">{{item.title}}</view>
		<view class="lists">
			<list class="list"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				topbarList: [
					{
						title: '维修报告'
					},
					{
						title: '出险报告'
					},
					{
						title: '车挡报告'
					}
				]
			}
		}
	}
</script>

<style>
	.lists {}
	.lists .list{
		background-color: rgb(247,247,255);
		padding: 60upx 40upx;
		border-radius: 8upx;
	}
</style>
