<template>
	<router-link :to="'/task/' + task.id" class="card mb-3 text-decoration-none text-muted">
		<div class="card-body d-flex justify-content-between align-items-center">
			<div class="mr-auto">
				<div class="mb-1">{{ task.caption }}</div>
				<small class="text-muted">Уровень: {{ task.level }} | Решено: {{ task.solutions }} | Комментариев: 324</small>
			</div>
			<span class="badge badge-light p-2 font-weight-normal ml-3">
				Автор: {{ task.author }}
				<svg v-if="task.company" class="bi bi-check-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					<path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
				</svg>
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