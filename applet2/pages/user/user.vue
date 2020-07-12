<template>
	<view class="content">
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
		<view class="lists">
			<view class="list">
				<view class="icons">
					<image src="../../static/img/contact.png" class="icon"></image>
				</view>
				<view class="list-title">联系客服</view>
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

.lists .list{
	display: flex;
	align-items: center;
}
.list .lists .list-title{
	flex: 1;
	
}
.lists .list .icons .icon{
	width: 50upx;
	height: 50upx;
}
</style>
