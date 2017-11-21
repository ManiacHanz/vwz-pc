<template>
<!-- 	<div v-if="this.$props.contentBody==='菜单配置'">
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
	</div> -->

	<div v-if="this.showRightContent==='菜单配置'">
		<MenuSet></MenuSet>
	</div>
	<div v-else-if="this.showRightContent==='文章管理'">
		<MaterManage></MaterManage>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
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
		props:['contentBody'],
		computed: {
			...mapState([
					'showRightContent'
				])
		}
	}
</script>

<style scoped>
	

</style>

