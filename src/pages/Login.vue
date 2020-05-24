<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Вход</h1>
		<div class="card">
			<div class="card-body">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="E-mail">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Пароль">
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block">Войти</button>
				</div>
				<div class="text-center">
					<span>Ещё нет аккаунта?</span> 
					<router-link to="/registration">Зарегистрируйтесь</router-link>
				</div> 
			</div>
		</div>
	</div>
</template>