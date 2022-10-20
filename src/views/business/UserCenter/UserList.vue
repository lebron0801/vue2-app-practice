<template>
	<div class="user-list-wrapper">
		<span>{{ pageName }}</span>
		<a-input v-model="age" placeholder="请输入"></a-input>
		<a-button @click="handleClick">点击</a-button>
		<Upload :visible.sync="visible" @ok="handleOk" :fileList="fileList" />
	</div>
</template>
<script>
import Upload from '@/components/container/Upload';
export default {
	name: 'UserList',
	components: {
		Upload
	},
	data: () => ({
		pageName: '用户列表',
		age: '',
		visible: false,
		fileList: [
			{
				uid: '-1',
				name: 'xxx.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
			},
			{
				uid: '-2',
				name: 'yyy.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
			}
		]
	}),
	methods: {
		handleClick() {
			this.visible = true;
		},
		handleOk(data) {
			console.log(data);
		}
	}
};
</script>
