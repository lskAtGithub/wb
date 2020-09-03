<template>
	<view class="page">
		<view class="head-box">
			<view class="avatar">
				<image :src="obj.notify_url" class="car-icon" mode=""></image>
			</view>
			<view class="right-content">
				<view style="color: #232323;font-size: 30upx;">订单号: 20200903123456</view>
				<view style="font-size: 26upx; color: #cccccc; margin: 20upx 0;">XCC124</view>
				<view class="right-item"> <text v-for="(item,index) in headList" :key="index" :class="{'active': item.active}" class="right-item-label">{{item.label}}</text> </view>
			</view>
		</view>
		<view class="update-time">
			<text>报告更新时间:</text>
			<text style="color: #ccc;">2019-11-13</text>
		</view>
		<view class="title-box">
			<view class="icon"></view>
			<view class="title">基础信息</view>
		</view>
		<view class="table-box">
			<view class="table-item">
				<view class="table-label">车险次数</view>
				<view class="table-value">1</view>
			</view>
			<view class="table-item">
				<view class="table-label">材料总金额/费用</view>
				<view class="table-value">10000</view>
			</view>
			<view class="table-item">
				<view class="table-label">理赔总金额</view>
				<view class="table-value">10000</view>
			</view>
			<view class="table-item">
				<view class="table-label">维修总金额/费用</view>
				<view class="table-value">10000</view>
			</view>
		</view>
		<view class="title-box">
			<view class="icon"></view>
			<view class="title">概要信息</view>
		</view>
		<view class="time-line-box">
			<view class="time-line-item">
				<view class="time-line-item-index"><text class="time-line-item-index-label">1</text></view>
				<view class="time-line-item-content">
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">事故日期:</view>
						<view class="time-line-item-content-item-value">2018-11-12</view>
					</view>
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">事故描述:</view>
						<!-- <rich-text class="time-line-item-content-item-value" :nodes="item.claimDetails[0].itemType"></rich-text> -->
						<view class="time-line-item-content-item-value">碰撞 / 两车相碰 本车损 对方车损 无人伤 其它无损 责任不清 建议报交警</view>
					</view>
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">维修详情:</view>
						<!-- <rich-text class="time-line-item-content-item-value" :nodes="item.claimDetails[0].itemName"></rich-text> -->
						<view>
							<p>钣金:后翼子板</p>
							<p>拆装:后保险杠皮</p>
						</view>
					</view>
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">理赔金额:</view>
						<view class="time-line-item-content-item-value">10000</view>
					</view>
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">维修金额:</view>
						<view class="time-line-item-content-item-value">10000</view>
					</view>
					<view class="time-line-item-content-item">
						<view class="time-line-item-content-item-label">材料金额:</view>
						<view class="time-line-item-content-item-value">10000</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="foot">
			<view class="foot-title">
				<text class="heng text"></text>
				<text class="text" style="margin: 0 5upx;">报告诠释&免责条款</text>
				<text class='heng text'></text>
			</view>
			<view class="foot-content">
				此报告所包含内容及判断,仅基于截止到生成报告日期之前收集到的相关数据,关于此车其他车辆信息(包括但不限于在非4s店或非制造商授权店的维修信息)有可能未被采集或收录,本报告仅作参考.请结合实车勘验和试乘试驾体验,做出更精准的交易决策,如有疑问请联系客服咨询.
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onShow() {
			console.log(234);
			const that = this
			that.$quest({
				url: '/api/qscc/v1/report/share-insurance-report',
				success: (res)=>{
					that.obj = res.data[0]
					that.obj.num = 0
					that.obj.renewalAmount = 0
					that.obj.damageMoney = 0
					that.obj.repairAmount = 0
					that.reportInfo = JSON.parse(res.data[0].report.json_data)
					console.log(that.reportInfo);
					that.reportInfo.forEach((item,index)=>{
						that.obj.num = index
						that.obj.renewalAmount += parseFloat(item.renewalAmount)
						that.obj.damageMoney += parseFloat(item.damageMoney)
						that.obj.repairAmount += parseFloat(item.repairAmount)
					})
				}
			})
		},
		data(){
			return {
				obj: {},
				reportInfo: [],
				headList: [
					{
						label: '维保',
						active: false
					},
					{
						label: '事故',
						active: true
					},
					{
						label: '投保',
						active: false
					},
					{
						label: '状态',
						active: false
					},
					{
						label: '违章',
						active: false
					},
					{
						label: '抵押',
						active: false
					},
					
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		background-color: #F5F5F5;
		width: 100vw;
		height: 100vh;
		overflow: auto;
		.head-box{
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: 20upx;
			border-bottom: 1px solid #dcdcdc;
			.avatar{
				vertical-align: middle;
				.car-icon{
					width: 120upx;
					height: 120upx;
					border-radius: 8upx;
					margin-right: 20upx;
				}
			}
			.right-content{
				.right-item{
					display: flex;
					align-items: center;
					.right-item-label{
						display: inline-block;
						background-color: #e5e5e5;
						color: #333333;
						margin-right: 10upx;
						padding: 5upx 10upx;
						border-radius: 8upx;
						font-size: 24upx;
						&.active{
							color: #FFFFFF;
							background-color: #007AFF;
						}
					}
				}
			}
		}
		.update-time{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26upx;
			padding: 20upx;
			background-color: #FFFFFF;
		}
		.title-box{
			padding: 20upx;
			margin: 14upx 0;
			font-size: 30upx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			background-color: #FFFFFF;
			.icon{
				width: 12upx;
				background-color: #007AFF;
				height: 30upx;
				margin-right: 10upx;
			}
		}
		.table-box{
			background-color: #FFFFFF;
			margin: 0 30upx;
			.table-item{
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F5F5F5;
				font-size: 26upx;
				.table-label{
					border-right: 1px solid #F5F5F5;
					width: 200upx;
					padding: 20upx;
				}
				.table-value{
					padding: 20upx;
				}
			}
		}
		.foot{
			margin: 0 20upx 20upx 20upx;
			padding: 20upx 0;
			font-size: 26upx;
			color: #666;
			background-color: #FFFFFF;
			.foot-title{
				display: flex;
				align-items: center;
				.text{
					display: inline-block;
					flex: 1;
					&.heng{
						height: 2px;
						background-color: #F5F5F5;
					}
				}
			}
			.foot-content{
				margin-top: 20upx;
				padding: 0 20upx;
			}
		}
		.time-line-box{
			.time-line-item{
				display: flex;
				align-items: flex-start;
				
				.time-line-item-index{
					width: 4upx;
					margin: 0 40upx;
					background-color: #000;
					position: relative;
					.time-line-item-index-label{
						position: absolute;
						top: 0;
						width: 50upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
						color: #FFFFFF;
						background-color: #007AFF;
						border-radius: 100upx;
						left: -22upx;
					}
				}
				// right content
				.time-line-item-content{
					background-color: #FFFFFF;
					padding: 0 40upx 20upx 40upx;
					flex: 1;
					margin-bottom: 30upx;
					margin-right: 20upx;
					.time-line-item-content-item{
						display: flex;
						margin-top: 20upx;
						.time-line-item-content-item-label{
							width: 200upx;
							white-space: nowrap;
						}
						.time-line-item-content-item-value{
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>
