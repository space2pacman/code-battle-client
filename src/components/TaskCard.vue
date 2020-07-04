<template>
	<router-link :to="'/task/' + task.id" class="card mb-3 text-decoration-none text-muted">
		<div class="card-body d-flex justify-content-between align-items-center">
			<div class="mr-auto">
				<div class="mb-1">{{ task.caption }}</div>
				<small class="text-muted">Уровень: {{ task.level }} | Решений: {{ task.solutions }} | Комментариев: 324</small>
			</div>
			<span class="badge badge-light p-2 font-weight-normal ml-3">
				Автор: {{ task.author }}
				<i v-if="task.company" class="fas fa-check"></i>
			</span>
			<span class="badge p-2 font-weight-normal ml-3" :class="task.completed ? 'badge-success' : 'badge-danger'">{{ task.completed ? "Выполнена" : "Не выполнена" }}</span>
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		task: Object
	}
}
</script>