<template>
	<div>
		<h1 class="mb-4">Настройки профиля</h1>
		<div class="row">
			<div class="col">
				<div>
					<div class="mb-1">E-mail</div>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="E-mail">
					</div>
				</div>
				<div class="mb-3">
					<div class="mb-1">Аватар</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-file-image"></i>
							</div>
						</div>
						<div class="custom-file">
							<input type="file" class="custom-file-input" id="userpic">
							<label class="custom-file-label" for="userpic">Выберите файл</label>
						</div>
					</div>
				</div>
				<div class="mb-2">
					<div class="mb-1">Смена пароля</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Старый пароль">
					</div>
				</div>
				<div class="mb-3">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Новый пароль">
					</div>
				</div>
				<div>
					<div class="mb-1">Уведомления на e-mail</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="email" type="radio" id="e-mail-0" checked>
						<label class="custom-control-label" for="e-mail-0">Присылать письма от code-battle</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="email" type="radio" id="e-mail-1">
						<label class="custom-control-label" for="e-mail-1">Не присылать письма</label>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="mb-3">
					<div class="mb-1">Социальные сети</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fab fa-github"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="github">
					</div>
				</div>
				<div class="mb-3">
					<div class="mb-1">Страна</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-globe"></i>
							</div>
						</div>
						<select class="form-control">
							<option>Россия</option>
						</select>
					</div>
				</div>
				<div class="mb-1">Ваш уровень</div>
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
			</div>
		</div>
		<button class="btn btn-success float-right">Обновить</button>
	</div>
</template>