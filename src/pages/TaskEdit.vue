<template>
	<div>
		<Task caption="Редактирование задачи" :tabs="tabs" :task="task">
			<template v-slot:tabs-content>
				<task-fields v-show="tabs.active === 'description'" :task="task" @data="onTaskFields" />
				<Result v-show="tabs.active === 'result'" />
			</template>
			<template v-slot:buttons>
				<div class="text-right">
					<button type="button" class="btn btn-success ml-3 mt-3 mr-2" @click="check">Тест</button>
					<button type="button" class="btn btn-success mt-3" @click="edit">Редактировать</button>
				</div>
			</template>
		</Task>
	</div>
</template>

<script>
import Task from "@/components/Task";
import TaskFields from "@/components/TaskFields";
import Result from "@/components/Result";

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
						caption: "Результат проверки",
						type: "result"
					}
				],
				active: "description"
			},
			task: null,
			code: null,
			fields: null
		}
	},
	methods: {
		check() {
			let payload = {
				data: {
					func: {
						name: this.fields.func.name,
						body: this.code
					},
					tests: this.fields.tests
				}
			}

			this.$root.$emit("onSwitchTab", "result");
			this.$root.$emit("onTestStart");
			this.send("task/check", payload).then(response => {
				if(response.status === "success") {
					this.$root.$emit("onTestEnd", null, response.data);
				}

				if(response.status === "error") {
					this.$root.$emit("onTestEnd", response.error);
				}
			});
		},
		edit() {
			let payload = {
				data: {
					id: this.id,
					fields: this.fields,
					func: this.code,
					author: this.getAuthUserName
				}
			}
			
			this.$root.$emit("onPreloaderStart");
			setTimeout(() => {
				this.send('task/edit', payload).then(response => {
					if(response.status === "success") {
						this.$root.$emit("onPreloaderEnd");
					}
				});
			}, 1000);
		},
		onTaskFields(data) {
			this.fields = data;
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
		TaskFields,
		Result
	}
}
</script>