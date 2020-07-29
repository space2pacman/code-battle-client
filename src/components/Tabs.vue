<template>
	<ul class="nav nav-tabs">
		<li v-for="tab in tabs.list" class="nav-item">
			<a class="nav-link" :class="{ 'active': tab.type === tabs.active }" href="#" @click.prevent="switchTab(tab.type)">{{ tab.caption }}</a>
		</li>
	</ul>
</template>

<script>
export default {
	methods: {
		switchTab(tab) {
			this.$emit("switchTab", tab);
		}
	},
	props: {
		tabs: Object
	}
}
</script>