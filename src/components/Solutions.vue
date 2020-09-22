<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Решения</h4>
		<Notice v-if="!isAuthorized" :text="solutions" />
		<div v-else>
			<Preloader v-if="isLoading" />
			<div v-if="checkSolution">
				<Solution v-for="solution in solutions" :solution="solution">
					<template v-slot:separator>
						<hr>
					</template>
				</Solution>
			</div>
			<div v-if="typeof solutions === 'string'">
				<Notice :text="solutions" />
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
			isLoading: true,
			solutions: null
		}
	},
	mounted() {
		this.receive(`solution/task/${this.id}`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "solution/task") {
				this.solutions = mutation.payload;
				this.isLoading = false;
			}
		})
	},
	computed: {
		checkSolution() {
			return !this.isLoading && Array.isArray(this.solutions);
		}
	},
	props: {
		task: [String, Object]
	},
	components: {
		Preloader,
		Solution,
		Notice
	}
}
</script>