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
			let hash = this.$route.hash.slice(1);
			
			if(hash !== tab && this.changeHash) {
				this.$router.push({ hash: tab });
			}
			
			this.$emit("switchTab", tab);
		},
		changeActiveTab() {
			let hash = this.$route.hash;

			if(hash.length > 0 && this.changeHash) {
				this.tabs.active = hash.slice(1);
			}
		}
	},
	mounted() {
		this.$root.$on("onSwitchTab", this.switchTab);
		this.changeActiveTab();
		this.filtered = this.tabs.list.filter(tab => {
			if(tab.isAuthorized) {
				if(this.isAuthorized && this.getUserName === this.getAuthUserName) {
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
		tabs: Object,
		changeHash: {
			type: Boolean,
			default: true
		}
	}
}
</script>