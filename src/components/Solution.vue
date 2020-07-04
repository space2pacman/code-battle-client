<template>
	<div class="mb-3">
		<Ace lang="javascript" theme="monokai" height="200" :value="solution.code" ref="ace" :options="options" class="solution__ace" />
		<span>
			<router-link :to="'/profile/' + solution.username">{{ solution.username }}</router-link>
			| likes: {{ solution.likes }} | comments: {{ solution.comments }}
			| <router-link :to="'/solution/' + solution.id">link</router-link>
		</span>
		<!-- Slots for <hr>? -->
	</div>
</template>

<script>
import Ace from "vue2-ace-editor";

export default {
	data() {
		return {
			options: {
				readOnly: true
			}
		}
	},
	props: {
		solution: Object
	},
	components: {
		Ace
	}
}
</script>