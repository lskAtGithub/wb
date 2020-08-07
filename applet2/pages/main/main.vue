<template>
	<view class="page">
		<!-- 轮播 -->
		<view class="carousel-section">
			<bw-swiper :swiperList="swiperList" :swiperType="swiperType" :indicatorDots="false" @change="changItem" :textTip="true"
			 indicatorColor="#DDDDDD" indicatorActiveColor="#666666"></bw-swiper>
			<view class="sw-wrap">
				<text v-for="(item,index) in swiperList" :key="index" class="sw-item" :class="{'active': swIndex == index}"></text>
			</view>
		</view>
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" v-model="vinVal" maxlength="17" placeholder="请输入17位车架号VIN码">
			</view>
			<view class="icons" @tap="upload">
				<image src="../../static/img/xiangji.png" class="icon"></image>
			</view>
		</view>
		<view class="content">
			<view class="input-in">
				<input type="text" class="input" placeholder="查询车辆" v-model="carKeyVal" disabled @tap="carKey">
				<tki-float-keyboard ref="keyb" mode="car" @del="keyDel" @val="keyVal"></tki-float-keyboard>
			</view>
			<view class="icons l-none">
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view>
		<view style="text-align: right; font-size: 24upx; color: #007AFF; margin: 0 40upx;" @tap="getHFiveUrl">查看实例报告</view>
		<view class="search-box" @tap="search">
			<view class="search-btn">查 询</view>
		</view>
		<view class="tips-box">
			<view style="color: #0f0f0f; font-size: 24upx;font-weight: bold;">温馨提示：</view>
			<view>1：车架号为必填项目，可通过拍照智能识别车架号。发动机号码与车牌号为非必填项目，部分汽车品牌需提供发动机号与车牌号才可查询；</view>
			<view>2：请仔细核对输入的车架号，查询服务时间为9：00-18：00，非此时间段的查询失败请于服务时间再试或联系客服人工查询；</view>
			<view>3：不同品牌查询费用有所不同，价格请以输入车架号后显示的品牌价格为准；</view>
			<view>4：若查询失败，请联系客服退还查询费用，平台不收取任何查询失败费用；</view>
			<view>5：数据来源于网络第三方平台，请勿将此数据用于非法用途。查询报告结果仅供车况参考，不做任何交易担保和诉讼依据。</view>
		</view>
		<!-- 支付popup -->
		<view class="pay-model-shade" v-show="payModel"></view>
		<view class="pay-model-box" v-show="payModel">
			<view class="title">订单信息</view>
			<view class="info-box">
				<view class="label">VIN码</view>
				<view class="value">{{vinVal}}</view>
			</view>
			<view class="info-box">
				<view class="label">品牌</view>
				<view class="value" v-show="isBrandName">{{brandName}}</view>
				<view v-show="!isBrandName" style="flex: 1; text-align: right;">
					<picker :value="index" :range="brandList" @change="selectBrand">
						<view class="value">{{brandName}}</view>
					</picker>
				</view>
			</view>
			<view class="info-box">
				<view class="label">待支付</view>
				<view class="value"><text style="color: red;">￥{{money}}</text> 元</view>
			</view>
			<view class="create-btn" @tap="isPay">生成报告</view>
			<view class="close-btn" @tap="payModel=false">取消查询</view>
		</view>
		<!-- 报告popup -->
		<view class="pay-model-shade" v-show="reportModel"></view>
		<view class="pay-model-box report-box" v-show="reportModel">
			<view class="report-label">
				<image src="../../static/img/loading.png" class="load" mode=""></image>
				<text class="t1 t">报告生成中</text>
			</view>
			<view class="tips-content">购买成功，可在我的报告中查看</view>
			<view class="close-btn" @tap="reportModel=false">关闭</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'
	import tkiFloatKeyboard from '@/components/tki-float-keyboard/tki-float-keyboard.vue'

	export default {
		computed: { ...mapState(['url', 'token'])
		},
		components: {
			bwSwiper,tkiFloatKeyboard
		},
		data() {
			return {
				reportModel: false,
				isBrandName: false,
				brandList: [],
				money: '',
				brandName: '',
				payModel: false,
				swIndex: 0,
				swiperList: [{
						type: 'image',
						img: 'https://tse2-mm.cn.bing.net/th/id/OIP.3Ve6WFCk6Fp-kSzB-2W7LAHaEc?w=311&h=187&c=7&o=5&dpr=1.2&pid=1.7'
					},
					{
						type: 'image',
						img: 'https://tse4-mm.cn.bing.net/th/id/OIP.SJpXZVwQnWvK7f-kjzDnggHaEK?w=333&h=187&c=7&o=5&dpr=1.2&pid=1.7'
					}
				],
				swiperType: true,
				vinVal: '',
				brandId: '',
				timer: null,
				carKeyVal: ''
			}
		},
		onShow() {
			this.getBanner()
		},
		methods: {
			...mapMutations(['logout']),
			getHFiveUrl(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/report/share-report',
					success: (res)=>{
						uni.setStorageSync('wapUrl', res.data.wap_url)
						that.toLink()
					}
				})
			},
			carKey(){
				this.$refs.keyb._keyShow()
			},
			keyDel(){
				this.carKeyVal = this.carKeyVal.substring(0,this.carKeyVal.length-1)
			},
			keyVal(v){
				this.carKeyVal += v
			},
			toLink(){
				const that = this
				uni.navigateTo({
					url: '../HFive/HFive'
				})
			},
			isPay(){
				const that = this
				if(that.isBrandName){
					// 不需要补全
					that.pay()
				}else{
					// 需要补全
					if(that.brandId){
						that.$quest({
							url: '/api/qscc/v1/site/add-vin-to-brand',
							data: {
								auto_brand_id: that.brandId,
								vin: that.vinVal
							},
							success: (res)=>{
								that.pay()
							}
						})
					}else{
						that.$showModel('请选择您的爱车品牌')
					}
				}
			},
			pay() {
				const that = this
				that.$quest({
					url: '/api/qscc/v1/order/mp-pay',
					data: {
						vin: that.vinVal,
						licenseplate: that.carKeyVal
					},
					success: (res) => {
						uni.requestPayment({
							appId: res.data.appId,
							provider: 'wxpay',
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType: 'MD5',
							paySign: res.data.paySign,
							success: function(res) {
								that.reportModel = true
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					}
				})
			},
			changItem(e) {
				this.swIndex = e.detail.current
			},
			getBanner() {
				const that = this
				this.$quest({
					url: '/api/qscc/v1/banner/list',
					noToken: true,
					method: 'POST',
					success: (res) => {
						this.swiperList = []
						if (res.data) {
							res.data.forEach(item => {
								this.swiperList.push({
									type: 'image',
									img: item.img
								})
							})
						}
					}
				})
			},
			upload() {
				const that = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						uni.uploadFile({
							url: that.url + '/api/v1/file/images?access-token=' + that.token,
							filePath: chooseImageRes.tempFilePaths[0],
							name: 'file',
							fileType: 'image',
							header: {
								'access-token': that.token,
								'content-type': 'multipart/form-data'
							},
							success: (uploadFileRes) => {
								var result = JSON.parse(uploadFileRes.data)
								if (result.code === 401) {
									that.logout()
									uni.showModal({
										title: '提示',
										content: res.data.message,
										showCancel: false,
										complete() {
											uni.switchTab({
												url: '/pages/user/user'
											})
										}
									})
								}
								if (result.code === 200) {
									that.$quest({
										url: '/api/qscc/v1/site/get-vin-code',
										data: {
											file_url: result.data.url,
										},
										success: (res) => {
											if (res.code === 200) {
												that.vinVal = res.data[0]
											} else {
												that.$showModel(res.data.message)
											}
										}
									})
								} else {
									that.$showModel(result.message)
								}
							}
						});
					}
				});
			},
			selectBrand(val){
				this.brandId = val.detail.value
				this.brandName = this.brandList[this.brandId]
			},
			search() {
				const that = this
				if (!that.vinVal) {
					that.$showModel('请输入vin码')
					return
				}
				that.$quest({
					url: '/api/qscc/v1/report/check-brand',
					method: 'GET',
					data: {
						vin: that.vinVal,
					},
					success: (res) => {
						for (let i in res.data.auto_brands){
							that.brandList.push(res.data.auto_brands[i])
						}
						if(res.data.auto_brand_name){
							// 已查询到车品牌，调起支付
							that.isBrandName = true
							that.brandName = res.data.auto_brand_name
							that.money = res.data.total_price
						}else{
							//  未查询到车品牌，下拉让用户选择品牌
							that.brandList = []
							for (let i in res.data.auto_brands){
								that.brandList.push(res.data.auto_brands[i])
							}
							that.isBrandName = false
		
						}
						that.payModel = true
					}
				})
			}
		}
	}
</script>	

<style lang="scss" scoped>
	.page {
		height: 100vh;
		background-color: #fff;
	}

	.carousel-section {
		text-align: center;
		background: #FFFFFF;
		padding: 30upx 0;

		.sw-item {
			display: inline-block;
			width: 16upx;
			height: 16upx;
			margin-right: 20upx;
			background: #DDDDDD;
			border-radius: 16upx;
		}

		.sw-item.active {
			background: #666666;
		}
	}

	.content {
		display: flex;
		margin: 10upx 40upx;
		font-size: 28upx;
		height: 72upx;
		line-height: 70upx;
	}

	.content .input-in {
		border: 1px solid #a5aab3;
		align-items: center;
		padding: 0 24upx;
		font-size: 28upx;
		border-top-left-radius: 6upx;
		border-bottom-left-radius: 6upx;
		border-right: 0;
		flex: 1;
	}

	.content .input-in .input {
		height: 70upx;
		line-height: 70upx;
		font-size: 26upx;
		color: #333;
	}

	.content .icons {
		border: 1px solid #a5aab3;
		padding: 10upx 10upx 0 10upx;
		border-top-right-radius: 6upx;
		border-bottom-right-radius: 6upx;
	}

	.content .icons .icon {
		width: 50upx;
		height: 50upx;
	}

	.content .icons.l-none {
		border-left: 0;
	}
	.tips-box{
		padding: 20upx 40upx;
		font-size: 24upx;
		color: #666;
	}

	.search-box {
		padding: 30upx 40upx;
	}

	.search-box .search-btn {
		background: #4a68e9;
		border-radius: 10upx;
		border: 1px solid #fff;
		text-align: center;
		color: #fff;
		padding: 20upx 0;
	}
	.pay-model-shade{
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: #000;
		opacity: .7;
		z-index: 3;
	}
	.pay-model-box{
		box-sizing: border-box;
		position: fixed;
		left: calc(50vw - 300upx);
		top: calc(50vh - 250upx);
		width: 600upx;
		height: 500upx;
		z-index: 6;
		border: 1px solid #eee;
		border-radius: 6upx;
		background-color: #fff;
		padding: 40upx 30upx 0 30upx;
		.title{
			text-align: center;
			font-size: 30upx;
			font-weight: bold;
			margin-bottom: 40upx;
		}
		.info-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16upx;
			font-size: 28upx;
			.label{
				color: #666;
			}
		}
		.create-btn{
			padding: 16upx 24upx;
			background-color: rgb(15,174,255);
			text-align: center;
			color: #fff;
			padding: 16upx 24upx;
			border-radius: 6upx;
			margin-top:  60upx;
		}
		.close-btn{
			padding: 16upx 24upx;
			text-align: center;
			border: 1px solid #ccc;
			color: #333;
			padding: 16upx 24upx;
			border-radius: 6upx;
			margin-top:  20upx;
		}
	}
	
	.pay-model-box.report-box{
		height: 320upx;
		text-align: center;
		.report-label{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 20upx;
			.load{
				animation: load 2s linear infinite;
				width: 30upx;
				height: 30upx;
				margin-right: 10upx;
			}
			.t{
				font-size: 26upx;
				font-weight: bold;
			}
			// .t1{
			// 	animation: jump 3s  linear infinite;
			// }
			// .t2{
			// 	animation: jump 3s .4s linear infinite;
			// }
			// .t3{
			// 	animation: jump 3s .8s linear infinite;
			// }
			// .t4{
			// 	animation: jump 3s 1.2s linear infinite;
			// }
			// .t5{
			// 	animation: jump 3s 1.4s linear infinite;
			// }
		}
		.tips-content{
			font-size: 24upx;
			color: #666;
			margin-bottom: 80upx;
		}
		.isGetReport{
			background-color: #ccc;
		}
	}
	
	@keyframes load {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	@keyframes jump {
		0% {
			transform: translateY(0upx);
		}
		50% {
			transform: translateY(-10upx);
		}
		100% {
			transform: translateY(0upx);
		}
	}
	
</style>
