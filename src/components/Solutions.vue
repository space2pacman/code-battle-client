<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Решения</h4>
		<Notice v-if="!isAuthorized" :text="solutions" />
		<div v-else>
			<Preloader v-if="isLoading" />
			<Notice v-if="typeof solutions === 'string'" :text="solutions" />
			<div v-if="!isLoading && Array.isArray(solutions)">
				<Solution  v-for="solution in solutions" :solution="solution" />
			</div>
		</div>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";
import Solution from "@/components/Solution";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			id: this.$route.params.id,
			isLoading: false,
			solutions: null
		}
	},
	mounted() {
		this.receive(`solution/task/${this.id}`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "solution/task") {
				this.solutions = mutation.payload;
			}
		})
	},
	components: {
		Preloader,
		Solution,
		Notice
	}
}
</script>