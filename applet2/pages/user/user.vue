<template>
	<view class="content">
		<view class="info-box">
			<view class="avatar-box">
				<image v-if="!hasLogin" src="../../static/img/empty.png" class="avatar"></image>
				<image v-else :src="info.avatar" class="avatar"></image>
			</view>
			<view  class="info" v-if="hasLogin">
				<view class="name">{{ info.nickName }}</view>
				<view>{{info.gender}}</view>
			</view>
			<button open-type="getUserInfo" @getuserinfo="getUserInfo" class="info get-info-btn" v-else>
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
			<view class="list">
				<image src="../../static/img/contact.png" class="icon"></image>
				<view class="list-title">联系客服</view>
				<image src="../../static/img/right.png" class="icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin','url','token','info'])
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			...mapMutations(['login','saveToken','saveInfo']),
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

<style scoped>
.content{
	background: #fff;
}
.info-box{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 50upx 30upx;
}
.info-box .avatar-box{
	margin-right: 40upx;
}
.info-box .avatar-box .avatar{
	width: 80upx;
	height: 80upx;
	border: 2px solid #f2f2f2;
	border-radius: 80upx;
	box-shadow: 0 0 5upx;
}
.info-box .info{
	font-size: 26upx;
}
.info-box .info.get-info-btn{
	margin: 0;
}
.info-box .info .name{
	font-size: 36upx;
	font-weight: bold;
}
.lists{
	box-shadow: 0 0 4px #a3a3a3;
	border-radius: 8upx;
	margin: 0 30upx;
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
</style>
