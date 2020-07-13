<template>
	<view class="content">
		<view class="info-box">
			<!-- <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button> -->
			<view class="avatar-box">
				<image src="../../static/img/empty.png" class="avatar"></image>
			</view>
			<view  class="info">
				<view class="name">{{ nickName }}</view>
				<view>{{gender}}</view>
			</view>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		data(){
			return {
				nickName: '披荆斩棘',
				gender: '男'
			}
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style>
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
