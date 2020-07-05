<template>
	<div class="page">
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" maxlength="17" placeholder="请输入17位车架号VIN码">
			</view>
			<view class="icons">
				<text class='cuIcon-camera icon'></text>
			</view>
		</view>
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" maxlength="17" placeholder="查询车辆">
			</view>
			<view class="icons l-none">
				<text class='cuIcon-right icon'></text>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg">查 询</button>
		</view>
	</div>
</template>

<script>
</script>

<style>
	.page{
		padding-top: 80upx;
	}
	.content{
		display: flex;
		margin: 20upx 40upx;
		font-size: 28upx;
		height: 70upx;
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
		font-size: 50upx;
		border: 1px solid #a5aab3;
		padding: 0 10upx;
		border-top-right-radius: 6upx;
		border-bottom-right-radius: 6upx;
	}
	.content .icons.l-none{
		border-left: 0;
		font-size: 40upx;
	}
</style>
