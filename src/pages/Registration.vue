<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Регистрация</h1>
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Никнейм">
				</div>
				<div class="form-group">
					<input type="text" class="form-control" placeholder="E-mail">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Пароль">
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block">Зарегистрироваться</button>
				</div>
				<div class="text-center">
					<span>Уже зарегистрированы?</span> 
					<router-link to="/login">Войдите</router-link>
				</div> 
			</div>
		</div>
	</div>
</template>