<template>
	<view class="page">
		<view class="lists">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="title">{{item.title}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
		<view class="add-btn" @tap="feedModel = true">
			<image src="../../static/img/add.png" class="add" mode=""></image>
		</view>
		<view class="feed-model" v-show="feedModel"></view>
		<view class="feedback-wrap" v-show="feedModel">
			<input type="text" v-model="title" class="feed-title" placeholder="请输入标题">
			<textarea v-model="content" class="feed-content" placeholder="请输入内容" />
			<view class="feed-submit">
				<text @tap="submit">提 交</text>
				<text @tap="feedModel = false">取 消</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.getData()
		},
		data(){
			return {
				list: [
				],
				title: '',
				content: '',
				feedModel: false
			}
		},
		methods:{
			getData(){
				const that = this
				that.$quest({
					url: '/api/qscc/v1/client-message/index',
					success: (res)=>{
						that.list = res.data
					}					
				})
			},
			submit(){
				const that = this
				if(!that.title){
					that.$showModel('标题不能为空')
					return
				}
				if(!that.content){
					that.$showModel('内容不能为空')
					return
				}
				that.$quest({
					url: '/api/qscc/v1/client-message/add',
					method: 'POST',
					data: {
						title: that.title,
						content: that.content
					},
					success: (res)=>{
						that.$showModel('意见已反馈',()=>{
							that.feedModel = false
						})
						that.getData()
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page{
		.lists {
			width: 80vw;
			margin: 0 10vw;
			.list{
				background-color: rgb(247,247,255);
				margin-top: 20upx;
				border-radius: 10upx;
				padding: 20upx;
				.title{
					font-size: 30upx;
					font-weight: bold;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
					margin-bottom: 10upx;
				}
				.content{
					font-size: 26upx;
					color: #666;
				}
			}
		}
		.add-btn{
			background: transparent;
			border: 1px solid #000;
			position: absolute;
			right: 50upx;
			bottom: 50upx;
			border-radius: 100upx;
			width: 100upx;
			height: 100upx;
			display: flex;
			  justify-content: center; 
			  align-items: center; 
			text-align: center;
			z-index: 66;
			
			.add{
				width: 50upx;
				height: 50upx;
			}
		}
		.feed-model{
			width: 100vw;
			height: 100vh;
			z-index: 68;
			position: fixed;
			left: 0;
			top: 0;
			opacity: .7;
			background-color: #000;
		}
		.feedback-wrap{
			position: absolute;
			left: 10vw;
			top: 40vw;
			z-index: 99;
			width: 80vw;
			background-color: #fff;
			border-radius: 10upx;
			border: 1px solid #ccc;
			
			.feed-title{
				width: 92%;
				border-bottom: 1px solid #ccc;
				padding: 18upx 4%;
			}
			.feed-content{
				width: 92%;
				height: 200upx;
				padding: 18upx 4%;
				resize: none;
			}
			.feed-submit{
				width: 100%;
				display: flex;
				border-top: 1px solid #ccc;
				border-radius: 10upx;
				margin-top: 40upx;
				
				text{
					flex: 1;
					text-align: center;
					padding: 20upx 0;
				}
			}
		}
	}
</style>
