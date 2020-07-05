<template>
	<div>
		<div class="plate" :class="{show:show}">
			<div :class="['item',{active:index===0}]" @click.stop="handleChange(0)">{{plate[0]}}</div>
			<div :class="['item ml10',{active:index===1}]" @click="handleChange(1)">{{plate[1]}}</div>
			<div>●</div>
			<div :class="['item',{active:index===2}]" @click="handleChange(2)">{{plate[2]}}</div>
			<div :class="['item ml10',{active:index===3}]" @click="handleChange(3)">{{plate[3]}}</div>
			<div :class="['item ml10',{active:index===4}]" @click="handleChange(4)">{{plate[4]}}</div>
			<div :class="['item ml10',{active:index===5}]" @click="handleChange(5)">{{plate[5]}}</div>
			<div :class="['item ml10',{active:index===6}]" @click="handleChange(6)">{{plate[6]}}</div>
			<div :class="['item ml10 column',{active:index===7}]" @click="handleChange(7)">
				<template v-if="newEnergy">
					<text>{{plate[7]}}</text>
				</template>
				<template v-else>
					<u-icon name="plus-circle"></u-icon>
					<div style="font-size: 20upx;">新能源</div>
				</template>
			</div>
		</div>
		<section class="panel" :class="{show:show}">
			<div class="header">
				<div class="p24" @click="panelReset">重置</div>
				<img src="/static/down.png" style="width: 140upx;" mode="widthFix" @click="panelHide" />
				<div class="p24" @click="panelHide">关闭</div>
			</div>
			<div class="panelList clearfix">
				<div class="item" v-for="(item,index) of currentDatas" @click.stop="clickKeyBoard(item)">{{item}}</div>
			</div>
			<div class="backspace shadow" @click="backspace">
				<u-icon name="backspace" color="#333" size="34"></u-icon>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: {
			characterDatas: {
				type: Array,
				default () {
					return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q',
						'R',
						'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '港', '澳', '学', '领'
					]
				}
			},
			areaDatas: {
				type: Array,
				default () {
					return ['京', '沪', '粤', '津', '冀', '晋', '蒙', '黑', '吉', '辽', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '桂',
						'琼', '渝', '川', '贵', '云', '藏',
						'陕', '甘', '青', '宁', '新', '临', '领', '警', '学', '港', '澳'
					]
				}
			},
			defaultPlate:{
				type:Array,
				default () {
					return Array.from({
					length: 8
				}, v => '')
				}
			}
		},
		data() {
			return {
				show: false,
				index: -1,
				newEnergy: false,
				plate: this.defaultPlate
			}
		},
		created() {

		},
		computed: {
			currentDatas() {
				return this.index === 0 ? this.areaDatas : this.characterDatas;
			}
		},
		watch: {
			plate(value) {
				this.$emit("listenPlateChange",value);
			}
		},
		methods: {
			panelShow() {
				this.show = true;
			},
			panelHide() {
				this.show = false;
			},
			handleChange(index) {
				this.index = index;
				if (index === 7) {
					this.newEnergy = true;
				}
				this.panelShow();
			},
			clickKeyBoard(item) {
				if (this.index < 7 || this.newEnergy) {
					this.$set(this.plate, this.index, item);
				}

				if (this.index < 7) {
					this.index++;
				}
			},
			backspace() {
				if (this.index > 0) {
					this.$set(this.plate, this.index, '');
					this.index--;
				}
			},
			panelReset() {
				this.index = 0;
				this.plate = Array.from({
					length: 8
				}, v => '');
				this.newEnergy = false;
			},
		}
	}
</script>

<style scoped lang='scss'>
	.plate {
		display: flex;
		align-items: center;
		justify-content: center;

		.item {
			width: 66upx;
			height: 66upx;
			background-color: #fffbe9;
			border: 1px solid #fdd62f;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;

			&.ml10 {
				margin-left: 10upx;
			}

			&.column {
				flex-direction: column;
			}

			&.active {
				background-color: #f2c817;
			}
		}
	}

	.panel {
		position: fixed;
		left: 0;
		width: 100%;
		bottom: 0;
		z-index: 999;
		box-sizing: border-box;
		background-color: #cfd0d5;
		transition: all 0.3s ease;
		transform: translateY(100%);

		.p24 {
			padding: 24upx;
		}

		&.show {
			transform: translateX(0);
		}

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;
			border-top: 1px solid #c9cacd;
			border-bottom: 1px solid #c9cacd;
		}

		.panelList {
			padding-top: 20upx;
			padding-left: 16upx;
			text-align: center;

			.item {
				float: left;
				width: 62upx;
				height: 84upx;
				background: #fff;
				border-radius: 10upx;
				line-height: 84upx;
				margin-right: 10upx;
				margin-bottom: 10upx;
				font-size: 32upx;
				font-weight: bold;
				box-shadow: 0 0 8px 1px #e5e5e5;
			}
		}

		.backspace {
			position: absolute;
			bottom: 10upx;
			right: 22upx;
			width: 100upx;
			height: 84upx;
			background-color: #adb2bc;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.clearfix::before,
	.clearfix::after {
		content: ' ';
		display: table;
		height: 0;
		line-height: 0;
		visibility: hidden;
		clear: both;
	}
</style>
