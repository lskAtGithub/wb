<template>
	<view class="page">
		<view v-if="!isEmpty" class="lists">
			<view v-for="(item,index) in carList" :key="index" class="list">
				<view>
					<image class="avatar" src="../../static/img/empty.png" mode=""></image>
				</view>
				<view class="content-box">
					<view class="title">元涌鑫（深圳宇达车行）</view>
					<view class="content">{{item.content}}</view>
					<view class="imgs">
						<image v-for="(i,n) in item.imgs" :key="n" class="img" :src="i" mode="" @tap="preview(item.imgs)"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 暂无二手车信息-->
		<view class="empty" v-else>
			<view><image class="empty-icon" src="../../static/img/null.png" mode=""></image></view>
			<view>暂无信息</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getNews()
		},
		data(){
			return {
				carList: [],
				isEmpty: true
			}
		},
		methods:{
			getNews(){
				const that = this
				that.$quest({
					noToken: true,
					url: '/api/qscc/v1/auto-on-sale/list',
					success: (res)=>{
						that.carList = []
						if(res.data && res.data.length){
							that.isEmpty = false
						}else{
							that.isEmpty = true
						}
						res.data.forEach(item=>{
							that.carList.push({
								imgs: item.imgs ? JSON.parse(item.imgs) : [],
								content: item.content,
								time: that.setDate(item.updated_at)
							})
						})
					}
				})
			},
			preview(imglist){
				uni.previewImage({
					urls: imglist
				});
			},
			setDate(date){
				let y, m, d
				y = new Date(date * 1000).getFullYear()
				m = parseInt(new Date(date * 1000).getMonth()) + 1
				d = new Date(date * 1000).getDate()
				if(m < 10){
					m = '0' + m
				}
				if(d < 10){
					d = '0' + d
				}
				return y + '-' + m + '-' + d
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.page{
		padding: 10upx 0;
		.lists{
			padding: 20upx;
			
			.list{
				display: flex;
				border-radius: 10upx;
				margin-bottom: 25upx;
				border-bottom: 2px solid #f5f5f5;
				
				.avatar{
					width: 80upx;
					height: 80upx;
					margin-right: 30upx;
					border-radius: 100upx;
					box-shadow: 0 0 5px #ccc;
				}
				
				.content-box{
					flex: 1;
					.title{
						font-size: 24upx;
						color: #333;
						margin-bottom: 10upx;
						font-weight: bold;
					}
					.content{
						font-size: 24upx;
						color: #666;
					}
					.imgs{
						margin: 20upx 0;
						width: 100%;
						.img{
							width: 31%;
							height: 185upx;
							margin-right: 2%;
							margin-bottom: 5upx;
							&:last-child{
								margin-right: 0;
							}
						}
						
					}
					.time{
						font-size: 22upx;
						color: #666;
					}
				}
			}
		}
		.empty{
			text-align: center;
			color: #333;
			font-size: 28upx;
			margin-top: 200upx;
			font-weight: bold;
			
			.empty-icon{
				width: 100upx;
				height: 100upx;
				margin-bottom: 28upx;
			}
		}
	}
</style>
