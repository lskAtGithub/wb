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
Vue.prototype.$dateStr = function (time,type="date"){
	let y,m,d,H,M,S,result
	let date = new Date(time * 1000)
	y = date.getFullYear()
	m = date.getMonth() + 1
	d = date.getDate()
	H = date.getHours()
	M = date.getMinutes()
	S = date.getSeconds()
	if(type === 'date'){
		result = `${y}-${m}-${d}`
	}else{
		result = `${y}-${m}-${d} ${H}:${M}:${S}`
	}
	
	return result
}
Vue.prototype.$quest = function (obj){
	if(obj.noToken || store.state.token){
		uni.showLoading()
		uni.request({
			url: !obj.noToken ? store.state.url + obj.url + '?access-token=' + store.state.token : store.state.url + obj.url,
			method: obj.method || "GET",
			header:obj.header || {
				"access-token": store.state.token
			},
			data: obj.data || {},
			success(res) {
				uni.hideLoading()
				if(res.data.code === 401){
					store.commit('logout')
					uni.showModal({
						title: '提示',
						content: res.data.message,
						showCancel:false,
						complete() {
							uni.switchTab({
								url: '/pages/user/user'
							})
						}
					})
				}
				if(res.data.code === 200){
					if(obj.success){
						obj.success(res.data)
					}
				}else{
					if(!obj.noErrorTip && res.data.code !== 401){
						uni.showModal({
							title: '提示',
							content:res.data.message,
							showCancel:false
						})
					}
					if(obj.fail){
						obj.fail(res)
					}
				}
			},
			fail() {
				uni.hideLoading()
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
