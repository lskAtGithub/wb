<template>
	<view class="content">
		<view class="info-box">
			<view class="avatar-box">
				<image v-if="!hasLogin" src="../../static/img/empty.png" class="avatar"></image>
				<image v-else :src="userInfo.avatar" class="avatar"></image>
			</view>
			<view  class="info" v-if="hasLogin">
				<view class="name">{{ userInfo.nickName }}</view>
				<!-- <view>{{userInfo.gender}}</view> -->
			</view>
			<button size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo" class="info get-info-btn" v-else>
				登录
			</button>
		</view>
		<view class="lists">
			<view class="list">
				<button class="share" open-type="share"></button>
				<image src="../../static/img/share.png" class="icon"></image>
				<view class="list-title">分享给好友</view>
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
			<view class="list" @tap="toLink('../report/pageReport')">
				<image src="../../static/img/baogao.png" class="icon"></image>
				<view class="list-title">我的报告</view>
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
			<view class="list" @tap="toLink('../feedback/feedback')">
				<image src="../../static/img/fankui.png" class="icon"></image>
				<view class="list-title">意见反馈</view>
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
			<view class="list" @tap="call">
				<image src="../../static/img/contact.png" class="icon"></image>
				<view class="list-title">联系客服</view>
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view>
		<!-- 二维码弹出 -->
		<view class="code-box" v-show="codeModel">
			<view class="code-mask" @tap="codeModel = false"></view>
			<view class="img-box" @tap="showImg">
				<image style="width: 500upx;height: 500upx;" src="../../static/img/code.jpg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin','url','token','userInfo'])
		},
		data(){
			return {
				phone: '',
				codeModel: false,
			}
		},
		onLoad() {
			const that = this
			this.getPhone()
		},
		methods: {
			...mapMutations(['login','saveToken','saveInfo']),
			toLink(url){
				uni.navigateTo({
					url: url
				})
			},
			showImg(){
				const that = this
				uni.getImageInfo({
					src: '../../static/img/code.jpg',
					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,
						});
					}
				})
			},
			getPhone(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/member/contact',
					noToken: true,
					success:(res)=>{
						if(res.data.tel){
							that.phone = res.data.tel
						}
					}
				})
			},
			call(){
				const that = this
				this.codeModel = true
			},
			getUserInfo(){
				const that = this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  uni.getUserInfo({
						provider: 'weixin',
						success: function (infoRes) {
							uni.request({
								url: that.url + '/api/v1/mini-program/login',
								method: 'POST',
								data: {
									code: loginRes.code,
									encryptedData: infoRes.encryptedData,
									iv: infoRes.iv,
									signature: infoRes.signature,
									rawData: infoRes.rawData,
								},
								success(response) {
									if(response.data.code === 200){
										that.saveInfo({
											nickName: infoRes.userInfo.nickName,
											gender: infoRes.userInfo.gender === 1 ? '男' : '女' ,
											avatar: infoRes.userInfo.avatarUrl
										})
										that.login()
										that.saveToken(response.data.data.access_token)
									}else{
										that.$showModel(response.data.message)
									}
								},
								fail() {
									that.$showModel('网络错误，请重试')
								}
							})
						}
					});
				  }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.content{
	background: #fff;
}
.info-box{
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 140upx 30upx 50upx 30upx;
	background-image: linear-gradient(#4a68e9, #6793ea);
}
.info-box .avatar-box{
	margin-bottom: 40upx;
}
.info-box .avatar-box .avatar{
	width: 120upx;
	height: 120upx;
	border: 2px solid #f2f2f2;
	border-radius: 80upx;
	box-shadow: 0 0 5upx;
}
.info-box .info.get-info-btn{
	margin: 0;
}
.info-box .info .name{
	font-size: 30upx;
	font-weight: bold;
	color: #f8f8f8;
}
.lists{
	box-shadow: 0 0 4px #a3a3a3;
	border-radius: 8upx;
	margin: 30upx;
}
.lists .list{
	display: flex;
	align-items: center;
	padding: 28upx 0;
	margin: 0 36upx;
	border-bottom: 1px solid #f3f3f3;
	position: relative;
}
.lists .list:last-child{
	border-bottom: 0;
}
.lists .list .share{
	position: absolute;
	left: 1;
	top: 1;
	width: 100%;
	height: 100%;
	z-index: 2;
	opacity: 0;
}
.lists .list .list-title{
	flex: 1;
	font-weight: bold;
	color: #666;
	font-size: 28upx;
	padding: 0 20upx;
}
.lists .list .icon{
	width: 50upx;
	height: 50upx;
	margin: 0 10upx;
}
.code-box{
	position: relative;
	.code-mask{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: rgba($color: #000000, $alpha: .7);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 3;
	}
	.img-box{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		box-shadow: 0 0 10upx #cccccc;
		z-index: 6;
		font-size: 0;
	}
}
</style>
