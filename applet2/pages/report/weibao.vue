<template>
	<view class="page">
<!-- 		<view class="topbar">
			<text class="topbar-item" v-for="(item,index) in topbarList" :key="index">{{item.title}}</text>
		</view> -->
		<view class="lists" v-if="!isEmpty">
			<view class="list" v-for="(item,index) in reportList" :key="index" @tap="toHFive(item)">
				<view class="content">
					<view class="content-item">
						<view class="label">VIN</view>
						<view class="value">{{item.vin}}</view>
					</view>
					<view class="content-item">
						<view class="label">发动机号</view>
						<view class="value">{{item.engin_no}}</view>
					</view>
					<view class="content-item">
						<view class="label">车牌号</view>
						<view class="value">{{item.licenseplate}}</view>
					</view>
					<view class="content-item">
						<view class="label">订单号</view>
						<view class="value">{{item.order_sn}}</view>
					</view>
				</view>
				<view class="status">
					<image v-if="item.report.status === '1'" src="../../static/img/report-icon.png" class="report-icon" mode=""></image>
					<image v-else src="../../static/img/waitDown.png" class="report-icon" mode=""></image>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<view><image class="empty-icon" src="../../static/img/null.png" mode=""></image></view>
			<view>暂无维保报告</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		onShow() {
			this.page = 1
			this.reportList = []
			this.getList()
		},
		data(){
			return{
				page: 1,
				maxPage: 1,
				isEmpty: false,
				reportList: [],
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
		},
		onReachBottom() {
			const that = this
			if(that.page <= that.maxPage){
				that.page++
				that.getList()
			}
		},
		methods: {
			...mapMutations(['saveWapUrl']),
			getList(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/order/list',
					data: {
						order_sn: '',
						page: that.page,
						check_type: 'mt'
					},
					success:(res)=>{
						if(res.data && res.data.length){
							that.isEmpty = false
						}else{
							that.isEmpty = true
						}
						res.data.forEach(item=>{
							that.reportList.push(item)
						})
						that.maxPage = res.maxPage
					}
				})
			},
			toHFive(item){
				const that = this
				if(item.status === '1'){
					that.saveWapUrl(item.report.wap_url)
					uni.navigateTo({
						url: './reportDetail'
					})
				}else{
					that.$showModel('报告正在生成中，请稍等')
					return
				}
			}
		}
	}
</script>

<style scoped lang="scss" scoped>
	.page{
		box-sizing: border-box;
		background-color: #FFFFFF;
		
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
			margin: 40upx 10vw;
			.list{
				margin-bottom: 30upx;
				padding: 0 20upx;
				border-radius: 8upx;
				background-color: #fff;
				box-shadow: 0 0 10upx 0 #ccc;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.content{
					margin-bottom: 10upx;
					flex: 1;
					&:last-child{
						margin-bottom: 0;
					}
					.content-item{
						display: flex;
						align-items: center;
						justify-content: flex-start;
						font-size: 24upx;
						.label{
							width: 150upx;
							color: #666;
						}
						.value{
							color: #bcbcbc;
							padding: 10upx;
							flex: 1;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							width: 240upx;
						}
					}
				}
				.status{
					.report-icon{
						width: 80upx;
						height: 80upx;
					}
				}
			}
		}
		.empty{
			text-align: center;
			color: #333;
			font-size: 28upx;
			margin-top: 200upx;
			font-weight: bold;
			
			.empty-icon{
				width: 100upx;
				height: 100upx;
				margin-bottom: 28upx;
			}
		}
	}
</style>
