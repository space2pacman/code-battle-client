<template>
	<ul class="nav nav-tabs">
		<li v-for="tab in filtered" class="nav-item">
			<a class="nav-link" :class="{ 'active': tab.type === tabs.active }" href="#" @click.prevent="switchTab(tab.type)">{{ tab.caption }}</a>
		</li>
	</ul>
</template>

<script>
export default {
	data() {
		return {
			filtered: []
		}
	},
	methods: {
		switchTab(tab) {
			this.$emit("switchTab", tab);
		}
	},
	mounted() {
		this.filtered = this.tabs.list.filter(tab => {
			if(tab.isAuthorized) {
				if(this.isAuthorized) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		})
	},
	props: {
		tabs: Object
	}
}
</script>