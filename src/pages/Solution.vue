<template>
	<div>
		<h1 class="mb-4">Решение</h1>
		<div v-if="solution">
			<Solution :solution="solution" />
		</div>
		<div v-else>
			Решение не найдено
		</div>
	</div>
</template>

<script>
import Solution from "@/components/Solution";

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
		Solution
	}
}
</script>