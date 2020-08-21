<template>
	<view class="page">
<!-- 		<view class="topbar">
			<text class="topbar-item" v-for="(item,index) in topbarList" :key="index">{{item.title}}</text>
		</view> -->
		<view class="lists" v-if="!isEmpty">
			<view class="list" v-for="(item,index) in reportList" :key="index"></view>
		</view>
		<view class="empty" v-else>
			<view><image class="empty-icon" src="../../static/img/null.png" mode=""></image></view>
			<view>暂无报告</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getList()
		},
		data(){
			return{
				page: 1,
				isEmpty: true,
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
		methods: {
			getList(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/report/list',
					data: {
						vin: '',
						page: that.page,
						check_type: 'mt'
					},
					success:(res)=>{
						console.log(res);
						if(res.data && res.data.length){
							that.isEmpty = false
						}else{
							that.isEmpty = true
						}
						that.reportList = res.data
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss" scoped>
	.page{
		box-sizing: border-box;
		width: 100vw;
		height: 100vh;
		overflow-y: auto;
		
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
				background-color: rgb(247,247,255);
				margin-bottom: 40upx;
				border-radius: 10upx;
				padding: 30upx 20upx;
				border-radius: 8upx;
				background-color: #fff;
				box-shadow: 0 0 5upx 0 #000;
				
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
