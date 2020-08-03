<template>
	<div>
		<h1 class="mb-4">Настройки профиля</h1>
		<input type="text" class="form-control mb-3" placeholder="E-mail">
		<div class="custom-file mb-3">
			<input type="file" class="custom-file-input" id="userpic">
			<label class="custom-file-label" for="userpic">Choose file</label>
		</div>
		<div class="mb-3">
			<div class="custom-control custom-radio">
				<input class="custom-control-input" name="level" type="radio" id="junior">
				<label class="custom-control-label" for="junior">Junior</label>
			</div>
			<div class="custom-control custom-radio">
				<input class="custom-control-input" name="level" type="radio" id="middle">
				<label class="custom-control-label" for="middle">Middle</label>
			</div>
			<div class="custom-control custom-radio">
				<input class="custom-control-input" name="level" type="radio" id="senior">
				<label class="custom-control-label" for="senior">Senior</label>
			</div>
		</div>
		<div class="mb-3">
			Социальные сети
			<input type="text" class="form-control" placeholder="github">
		</div>
		<div class="mb-3">
			Смеша пароля
			<input type="password" class="form-control mb-2" placeholder="Старый пароль">
			<input type="password" class="form-control" placeholder="Новый пароль">
		</div>
		<div class="mb-3">
			Страна
			<select class="form-control">
				<option>Россия</option>
			</select>
		</div>
		<div>
			<div class="custom-control custom-radio">
				<input class="custom-control-input" name="email" type="radio" id="e-mail-0" checked>
				<label class="custom-control-label" for="e-mail-0">Присылать письма от code-battle</label>
			</div>
			<div class="custom-control custom-radio">
				<input class="custom-control-input" name="email" type="radio" id="e-mail-1">
				<label class="custom-control-label" for="e-mail-1">Не присылать письма</label>
			</div>
		</div>
		<button class="btn btn-success float-right">Обновить</button>
	</div>
</template>