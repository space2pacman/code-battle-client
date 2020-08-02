<template>
	<div>
		<Task caption="Задача" :tabs="tabs" :task="task">
			<template v-slot:tabs-content>
				<Description v-if="tabs.active === 'description'" :task="task" />
				<Result v-show="tabs.active === 'result'" />
				<Solutions v-if="tabs.active === 'solutions'" :task="task" />
			</template>
			<template v-slot:buttons>
				<button type="button" class="btn btn-success float-right mt-3" @click="run">Запуск</button>
			</template>
		</Task>
	</div>
</template>

<script>
import Task from "@/components/Task";
import Description from "@/components/Description";
import Result from "@/components/Result";
import Solutions from "@/components/Solutions";

export default {
	data() {
		return {
			id: this.$route.params.id,
			tabs: {
				list: [
					{
						caption: "Описание",
						type: "description"
					},
					{
						caption: "Результат",
						type: "result"
					},
					{
						caption: "Решения",
						type: "solutions"
					}
				],
				active: "description"
			},
			task: null,
			code: null
		}
	},
	methods: {
		run() {
			let data = {
				code: this.code,
				id: this.id
			}

			this.$root.$emit("onSwitchTab", "result");
			this.$root.$emit("onTestStart");
			this.send("task/test", data).then(response => {
				if(response.status === "success") {
					this.$root.$emit("onTestEnd", null, response.data);
				}

				if(response.status === "error") {
					this.$root.$emit("onTestEnd", response.error);
				}
			});
		},
		onCodeInput(code) {
			this.code = code;
		}
	},
	mounted() {
		this.receive(`task/${this.id}`);
		this.$root.$on("onCodeInput", this.onCodeInput);
		this.$store.subscribe(mutation => {
			if(mutation.type === "task") {
				this.task = mutation.payload;
			}
		})
	},
	components: {
		Task,
		Description,
		Result,
		Solutions
	}
}
</script>