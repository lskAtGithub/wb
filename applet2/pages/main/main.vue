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
<!-- 		<view class="content">
			<view class="input-in">
				<input type="text" class="input" maxlength="17" placeholder="查询车辆">
			</view>
			<view class="icons l-none">
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view> -->
		<view class="search-box" @tap="search">
			<view class="search-btn">查 询</view>
		</view>
		
		<view class="search-box" @tap="getReport">
			<view class="search-btn">查 询 2</view>
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
				<view class="value" v-show="!isBrandName">{{brandName}}</view>
				<view v-show="isBrandName" style="flex: 1; text-align: right;">
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
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import bwSwiper from '@/wxcomponents/bw-swiper/bw-swiper.vue'

	export default {
		computed: { ...mapState(['url', 'token'])
		},
		components: {
			bwSwiper
		},
		data() {
			return {
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
				// vinVal: 'LFMKV30F6B0085121',
				vinVal: 'LSVX065N5G2158772',
				brandId: ''
			}
		},
		onShow() {
			// this.getBanner()
		},
		methods: {
			...mapMutations(['logout']),
			getReport(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/report/buy-report',
					data: {
						vin: that.vinVal
					},
					success: (res)=>{
						console.log(res);
					}
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
						vin: that.vinVal
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
								console.log('success:' + JSON.stringify(res));
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
		margin: 20upx 40upx;
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

	.search-box {
		padding: 40upx;
	}

	.search-box .search-btn {
		background: #ff1a1a;
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
	
</style>
