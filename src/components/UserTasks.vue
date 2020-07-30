<template>
	<div>
		<div v-if="typeof tasks === 'string'">
			<Notice :text="tasks" />
		</div>
		<div v-if="tasks instanceof Array">
			<TaskCard v-for="task in tasks" :task="task" />
		</div>
	</div>
</template>

<script>
import Notice from "@/components/Notice";
import TaskCard from "@/components/TaskCard";

export default {
	props: {
		tasks: [String, Array]
	},
	components: {
		Notice,
		TaskCard
	}
}
</script>