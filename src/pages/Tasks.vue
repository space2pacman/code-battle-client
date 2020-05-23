<template>
	<div class="mt-4">
		<h4 class="mb-3">Задания</h4>
		<router-link to="/task/0" class="card mb-3 text-decoration-none text-muted">
			<div class="card-body d-flex justify-content-between align-items-baseline">
				<span>Перевернуть строку</span>
				<span class="badge badge-danger p-2 font-weight-normal">Не выполнено</span>
			</div>
		</router-link>
		<router-link to="/task/1" class="card mb-3 text-decoration-none text-muted">
			<div class="card-body d-flex justify-content-between align-items-baseline">
				<span>Факториал</span>
				<span class="badge badge-success p-2 font-weight-normal">Выполнено</span>
			</div>
		</router-link>
	</div>
</template>