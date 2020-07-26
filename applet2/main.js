import Vue from 'vue'
import App from './App'

import store from './store'
Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$showModel = function(content="",complete){
	uni.showModal({
		title: '提示',
		content:content,
		showCancel:false,
		complete() {
			if(complete){
				complete()
			}
		}
	})
}

Vue.prototype.$quest = function (obj){
	if(store.state.token){
		uni.request({
			url: store.state.url + obj.url,
			method: obj.method || "GET",
			header:obj.header || {
				"access-token": store.state.token
			},
			success(res) {
				if(res.data.code === 200){
					if(obj.success){
						obj.success(res)
					}
				}else{
					uni.showModal({
						title: '提示',
						content:res.data.message,
						showCancel:false
					})
					if(obj.fail){
						obj.fail()
					}
				}
			},
			fail() {
				uni.showModal({
					title: '提示',
					content:'网络错误，请重试',
					showCancel:false
				})
			}
		})
	}else{
		uni.showModal({
			title: '提示',
			content:'请先登录',
			showCancel:false,
			complete() {
				uni.switchTab({
					url: '/pages/user/user'
				})
			}
		})
	}
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
