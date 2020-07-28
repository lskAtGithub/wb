<template>
	<view class="page">
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" maxlength="17" placeholder="请输入17位车架号VIN码">
			</view>
			<view class="icons" @tap="upload">
				<image src="../../static/img/xiangji.png" class="icon"></image>
			</view>
		</view>
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" maxlength="17" placeholder="查询车辆">
			</view>
			<view class="icons l-none">
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view>
		<view class="search-box">
			<view class="search-btn">查 询</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: { ...mapState(['url', 'token']) },
		onLoad() {
		},
		methods: {
			upload() {
				const that = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths; 
						uni.uploadFile({
							url: that.url + '/api/v1/file/images',
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								"access-token": that.token
							},
							data: {
								
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.page{
			padding-top: 80upx;
			height: 100vh;
			background-color: #fff;
		}
		.content{
			display: flex;
			margin: 20upx 40upx;
			font-size: 28upx;
			height: 72upx;
			line-height: 70upx;
		}
		.content .input-in{
			border: 1px solid #a5aab3;
			align-items: center;
			padding: 0 24upx;
			font-size: 28upx;
			border-top-left-radius: 6upx;
			border-bottom-left-radius: 6upx;
			border-right: 0;
			flex: 1;
		}
		.content .input-in .input{
			height: 70upx;
			line-height: 70upx;
		}
		.content .icons{
			border: 1px solid #a5aab3;
			padding: 10upx 10upx 0 10upx;
			border-top-right-radius: 6upx;
			border-bottom-right-radius: 6upx;
		}
		.content .icons .icon{
			width: 50upx;
			height: 50upx;
		}
		.content .icons.l-none{
			border-left: 0;
		}
		.search-box{
			padding: 40upx;
		}
		.search-box .search-btn{
			background: #ff1a1a;
			border-radius: 10upx;
			border: 1px solid #fff;
			text-align: center;
			color: #fff;
			padding: 20upx 0;
		}
</style>
