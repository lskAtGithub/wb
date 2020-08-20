<template>
	<web-view :src="src"></web-view>
</template>

<script>
	export default {
		onShow() {
			this.src = uni.getStorageSync('wapUrl')
			console.log(this.src);
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
