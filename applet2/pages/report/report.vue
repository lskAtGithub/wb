<template>
	<view class="page">
		<view class="topbar">
			<text class="topbar-item" v-for="(item,index) in topbarList" :key="index">{{item.title}}</text>
		</view>
		<view class="lists">
			<view class="list">content</view>
			<view class="list">content</view>
			<view class="list">content</view>
			<view class="list">content</view>
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

<style scoped lang="scss" scoped>
	.page{
		.topbar{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20upx 0;
			border-bottom: 1px solid #ccc;
			.topbar-item{
				flex: 1;
				text-align: center;
			}
		}
		.lists {
			width: 80vw;
			margin: 0 10vw;
			.list{
				background-color: rgb(247,247,255);
				margin-top: 20upx;
				border-radius: 10upx;
				padding: 20upx 10upx;
				border-radius: 8upx;
			}
		}
	}
</style>
