<template>
	<div style="padding-top: 40upx;">
		<plate @listenPlateChange="plateChange" :defaultPlate="plateNumber" />
	</div>
</template>

<script>
	import {
		plate
	} from '@/components/plate/index.vue'
	export default {
		name: "index",
		components: {
			plate
		},
		data() {
			return {
				plateNumber:['粤','S','8','8','8','8','H']
			}
		},
		onLoad() {
			
		},
		onShow() {

		},
		methods: {
			plateChange(val){
				console.log(val);
			}
		}
	}
</script>

<style scoped lang='scss'>
	
</style>
