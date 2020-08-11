import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		url: 'https://www.51qscc.com',
		token: '',
		userInfo: {
			nickName: '',
			gender: '',
			avatar: ''
		},
		wapUrl: ''
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
		},
		saveWapUrl(state,provider){
			state.wapUrl = provider
			uni.setStorageSync('wapUrl',provider)
		}
	}
})

export default store
