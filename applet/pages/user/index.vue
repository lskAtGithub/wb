
<template>
	<view>
		<view class="info-wrap">
			<button class="avatar" open-type="getUserInfo" @getUserInfo="getUserInfo">登录</button>
			<img class="avatar" src="../../static/logo.png" alt="">
		</view>
		

		<view class="cu-bar bg-white">
			<view class="action">
				<button class="cu-btn bg-cyan shadow" @tap="ToggleDelay">开始执行</button>
			</view>
		</view>

		<view class="padding-sm">
			<view>
				<view class="margin-sm basis-sm shadow" :class="['bg-' + item.color,toggleDelay?'animation-slide-bottom':'']"
				 :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in list" :key="index">0.{{index+1}}s</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animation:'',
				list: [
					{
						name: 'fade',
						color: 'red'
					},
					{
						name: 'scale-up',
						color: 'orange'
					}
				],
				toggleDelay: false

			};
		},
		onShow() {
			console.log(1);
			this.ToggleDelay()
		},
		methods: {
			Toggle(e) {
				var anmiaton = e.currentTarget.dataset.class;
				this.animation= anmiaton;
				setTimeout(()=>{
					this.animation= '';
				}, 1000)
			},
			ToggleDelay() {
				this.toggleDelay= true;
				setTimeout(()=>{
					this.toggleDelay= false
				}, 1000)
			}
		},
	}
</script>

<style>
	@import "../../colorui/animation.css";
	
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}
</style>
