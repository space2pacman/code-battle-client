<template>
	<div>
		<h1 class="mb-4">Решение</h1>
		<Notice v-if="!isAuthorized" :text="solution" />
		<div v-else>
			<div v-if="solution instanceof Object">
				<Solution :solution="solution" />
			</div>
			<div v-if="typeof solution === 'string'">
				<Notice :text="solution" />
			</div>
		</div>
	</div>
</template>

<script>
import Solution from "@/components/Solution";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			id: this.$route.params.id,
			solution: null
		}
	},
	mounted() {
		this.receive(`solution/${this.id}`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "solution") {
				this.solution = mutation.payload;
			}
		})
	},
	components: {
		Solution,
		Notice
	}
}
</script>