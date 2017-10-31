<template>
	<div v-if="this.$props.contentBody==='菜单配置'">
		<MenuSet></MenuSet>
	</div>
	<div v-else-if="this.$props.contentBody==='数据分析'">
		<DataAnalysis></DataAnalysis>
	</div>
	<div v-else-if="this.$props.contentBody==='文章管理'">
		<MaterManage></MaterManage>
	</div>
	<div v-else-if="this.$props.contentBody==='用户管理'">
		<UserManage></UserManage>
	</div>
	<div v-else-if="this.$props.contentBody==='回收管理'">
		<RecoverManage></RecoverManage>
	</div>
</template>

<script>
	import MenuSet from './MenuSet'
	import DataAnalysis from './DataAnalysis'
	import MaterManage from './MaterManage'
	import UserManage from './UserManage'
	import RecoverManage from './RecoverManage'
	export default {

		data() {
			return {
				
			}
		},
		components: {
			MenuSet,
			DataAnalysis,
			MaterManage,
			UserManage,
			RecoverManage
		},
		props:['contentBody']
	}
</script>

<style scoped>
	

</style>

