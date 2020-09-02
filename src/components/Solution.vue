<template>
	<div class="mb-3">
		<Ace lang="javascript" theme="monokai" height="200" :value="solution.code" ref="ace" :options="options" class="solution__ace" />
		<div class="mt-2">
			<router-link :to="'/user/' + solution.username">
				<span class="badge badge-primary p-2 font-weight-normal">
					<i class="fas fa-user"></i>
					<span class="ml-2">{{ solution.username }}</span>
				</span>
			</router-link>
			<a href="#" @click.prevent="like">
				<span class="badge p-2 font-weight-normal ml-2" :class="likes ? 'badge-success' : 'badge-primary'">
					Нравится
					<span class="badge badge-light">
						<slot v-if="hasLikes" name="likes" :state="likes" />
						<span v-else>{{ solution.likes }}</span>
					</span>
				</span>
			</a>
			<a href="#" @click.prevent="">
				<span class="badge badge-primary p-2 font-weight-normal ml-2">
					Комментариев
					<span class="badge badge-light">{{ solution.comments }}</span>
				</span>
			</a>
			<router-link :to="'/solution/' + solution.id">
				<div type="button" class="btn btn-link btn-sm ml-2">Ссылка</div>
			</router-link>
		</div>
		<slot name="separator" />
	</div>
</template>

<script>
import Ace from "vue2-ace-editor";

export default {
	data() {
		return {
			likes: false,
			options: {
				readOnly: true
			}
		}
	},
	methods: {
		like() {
			let payload = {
				data: {
					id: this.solution.id
				}
			}

			this.send("solution/like", payload).then(response => {
				if(response.status === "success") {
					let route = this.$route.name;

					if(route === "task") {
						let taskId = this.$route.params.id;

						this.receive(`solution/task/${taskId}`);
					}

					if(route === "solution") {
						this.receive(`solution/${this.solution.id}`);
					}

					if(route === "user") {
						this.receive("solution/liked");
					}

					this.receive(`user/${this.getAuthUserName}`).then(response => {
						if(response.status === "success") {
							this.$store.commit("user/auth", response.data);
							this.changeLike();
						}
					});

				}
			});
		},
		changeLike() {
			let user = this.$store.state["user/auth"];

			if(user) {
				if(user.likes.solutions.includes(this.solution.id)) {
					this.likes = true;
				} else {
					this.likes = false;
				}
			}
		}
	},
	computed: {
		hasLikes() {
			return this.$scopedSlots.likes !== undefined;
		}
	},
	mounted() {
		this.changeLike();
	},
	props: {
		solution: Object
	},
	components: {
		Ace
	}
}
</script>

<style>
.solution__ace .ace_cursor-layer {
	opacity: 0;
}

.solution__ace .ace_print-margin-layer {
	display: none;
}
</style>