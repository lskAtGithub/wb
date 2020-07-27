<template>
	<view class="page">
		<!-- 轮播 -->
		<view class="carousel-section">
			<bw-swiper :swiperList="swiperList" :swiperType="swiperType" :indicatorDots="false" @change="changItem"
			 :textTip="true" indicatorColor="#DDDDDD" indicatorActiveColor="#666666"></bw-swiper>
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
				<input type="text" class="input" maxlength="17" placeholder="查询车辆">
			</view>
			<view class="icons l-none">
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view>
		<view class="search-box" @click="search">
			<view class="search-btn">查 询</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: { ...mapState(['url', 'token']) },
		data(){
			return {
				swIndex:0,
				swiperList: [],
				swiperType: true,

				vinVal: ''
			}
		},
		onShow() {
			this.getBanner()
		},
		methods: {
			...mapMutations(['logout']),
			changItem(e) {
				this.swIndex = e.detail.current
			},
			getBanner(){
				const that = this
				this.$quest({
					url: '/api/qscc/v1/banner/list',
					method: 'POST',
					success:(res)=>{
						this.swiperList = [] 
						if(res.data){
							res.data.forEach(item=>{
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
							method: 'POST',
							success: (uploadFileRes) => {
								var result = JSON.parse(uploadFileRes.data)
								if(result.code === 401){
									that.logout()
									uni.showModal({
										title: '提示',
										content: res.data.message,
										showCancel:false,
										complete() {
											uni.switchTab({
												url: '/pages/user/user'
											})
										}
									})
								}
								if(result.code === 200){
									that.$quest({
										url: '/api/qscc/v1/site/get-vin-code',
										data:{
											file_url: result.data.url,
										},
										success: (res)=>{
											if(res.code === 200){
												that.vinVal = res.data.data[0]
											}else{
												that.$showModel(res.data.message)
											}
										}
									})
								}else{
									that.$showModel(result.message)
								}
							}
						});
					}
				});
			},
			search(){
				const that = this
				if(!that.vinVal){
					that.$showModel('请输入vin码')
					return
				}
				that.$quest({
					url: '/api/qscc/v1/report/check-brand',
					method: 'GET',
					data: {
						vin: 'LFMKV30F6B0085122' || that.vinVal,
					},
					success: (res)=>{
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
			padding-top: 80upx;
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
			font-size: 26upx;
			color: #333;
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
