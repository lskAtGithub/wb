<template>
	<view class="page">
		<!-- 车辆信息 -->
		<view class="car-msg-box">
			<image class="car-msg-icon" src="../../static/h5icon/baoma.jpg" mode=""></image>
			宝马5系
		</view>
		<!-- 单号，时间 -->
		<view class="info-box">
			<view class="info">
				<image class="info-icon" src="../../static/h5icon/V.png" mode=""></image>
				<text>216345641563146545674563156</text>
			</view>
			<view class="info">
				<image class="info-icon" src="../../static/h5icon/clock.png" mode=""></image>
				<text>2019-02-18 12:02:25</text>
			</view>
		</view>
		<!-- 块 信息 -->
		<view class="div-box">
			<view class="div-title-box">
				<viwe class="div-title">历史车况评级</viwe>
				<view>评级说明</view>
			</view>
			<view class="rate-box">
				<view class="rate-item">
					<view class="rate-level"> <text class="rate-val">S</text> 级</view>
					<view class="rate-label">事故火烧水泡</view>
					<view class="rate-levels">SMR</view>
				</view>
				<view class="rate-item">
					<view class="rate-level"> <text class="rate-val">4.8</text></view>
					<view class="rate-label">整车车况评分</view>
					<view class="rate-levels">满分5</view>
				</view>
				<view class="rate-item">
					<view class="rate-level"> <text class="rate-val">A</text> 级</view>
					<view class="rate-label">重要部件评级</view>
					<view class="rate-levels">ABC</view>
				</view>
			</view>
			<view class="div-title-box">
				<viwe class="div-title">解析顺序</viwe>
				<view>解析规则</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.page{
		padding: 1px;
		.car-msg-box{
			display: flex;
			align-items: flex-start;
			font-weight: bold;
			font-size: 26upx;
			border-bottom: 1px solid #EBEBED;
			padding: 30upx;
			margin: 0 2vw;
			
			.car-msg-icon{
				width: 100upx;
				height: 100upx;
				margin-right: 20upx;
			}
		}
		.info-box{
			display: flex;
			align-items: center;
			color: #60554f;
			font-size: 24upx;
			justify-content: flex-start;
			padding: 20upx 2vw;
			margin: 0 2vw;
			.info{
				margin-right: 10upx;
				
				.info-icon{
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					margin-right: 5upx;
				}
			}
		}
		.div-box{
			background-color: #FFFFFF;
			box-shadow: 0 0 10upx #ccc;
			margin: 0 2vw;
			padding-right: 2vw;
			
			.div-title-box{
				position: relative;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #6B6B70;
				font-size: 24upx;
				padding-top: 50upx;
				.div-title{
					color: #25252A;
					font-weight: bold;
					font-size: 30upx;
					padding-left: 18upx;
					&::after{
						content: '';
						position: absolute;
						left: 0;
						top: 55upx;
						height: 30upx;
						width: 3px;
						background-image: linear-gradient(153deg, #FF8C1F 0%, #FF541F 100%);
						border-radius: 0 4px 4px 0;
					}
				}
			}
			
			.rate-box{
				display: flex;
				align-items: center;
				padding: 60upx 0;
				border-bottom: 1px solid #ebebeb;
				
				.rate-item{
					flex: 1;
					text-align: center;
					.rate-level{
						color: #FF6127;
						font-size: 24upx;
						font-weight: bold;
						.rate-val{
							font-size: 30upx;
							margin-right: 20upx;
							margin-left: 20upx;
						}
					}
					.rate-label{
						padding: 30upx 0;
						color: #67676E;
						font-size: 24upx;
					}
					.rate-levels{
						color: #9999AD;
						font-weight: bold;
						font-size: 24upx;
						letter-spacing: 10upx;
					}
				}
			}
			
		}
	}
</style>
