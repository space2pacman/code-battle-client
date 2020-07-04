<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Решения</h4>
		<Preloader v-if="isLoading" />
		<div v-if="!isLoading">
			<div v-for="solution in solutions" class="mb-3">
				<hr>
				<div>{{ solution.username }}</div>
				<Ace lang="javascript" theme="monokai" height="200" :value="solution.code" ref="ace" :options="options" class="solution__ace" />
				<span>likes: {{ solution.likes }} | comments: {{ solution.comments }} | <router-link :to="'/solution/' + solution.id">link</router-link></span>
			</div>
		</div>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";
import Ace from "vue2-ace-editor";

export default {
	data() {
		return {
			id: this.$route.params.id,
			isLoading: false,
			options: {
				readOnly: true
			},
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
		Ace
	}
}
</script>

<style>
.solution__ace .ace_cursor-layer {
	opacity: 0;
}
</style>