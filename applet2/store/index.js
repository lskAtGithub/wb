import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		url: 'https://qscc.halopay.cn',
		token: '',
		info: {
			nickName: '',
			gender: '',
			avatar: ''
		}
	},
	mutations: {
		saveInfo(state, info){
			state.info = info
		},
		saveToken(state,token){
			state.token = token
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
