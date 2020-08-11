<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		onShow() {
			that.src = uni.getStorageSync('wapUrl')
		},
		data(){
			return {
				src: ''
			}
		}
	}
</script>

<style>
</style>
