import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		url: 'https://qscc.halopay.cn',
		token: '',
		userInfo: {
			nickName: '',
			gender: '',
			avatar: ''
		}
	},
	mutations: {
		saveInfo(state, provider){
			state.userInfo = provider
			uni.setStorageSync('userInfo',provider)
		},
		saveToken(state,provider){
			state.token = provider
			uni.setStorageSync('token',provider)
		},
		login(state) {
			state.hasLogin = true;
			uni.setStorageSync('hasLogin',true)
		},
		logout(state) {
			state.hasLogin = false;
			uni.setStorageSync('hasLogin',false)
		}
	}
})

export default store
