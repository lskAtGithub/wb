<script>
	import { mapMutations } from 'vuex';
	export default {
		methods: {
			...mapMutations(['login','saveInfo','saveToken'])
		},
		onLaunch() {
			let userInfo = uni.getStorageSync('userInfo') || '';
			console.log(uni.getStorageSync('token'));
			if (userInfo.nickName) {
				this.login()
				this.saveInfo(userInfo)
				this.saveToken(uni.getStorageSync('token'))
			}
		}
	}
</script>

<style>
	/* reset */
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
