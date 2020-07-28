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
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		saveToken(state,provider){
			state.token = provider
			uni.setStorage({
				key: 'token',
				data: provider
			})
		},
		login(state) {
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
		}
	}
})

export default store
