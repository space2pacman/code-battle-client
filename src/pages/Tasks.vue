<template>
	<div>
		<h4 class="mb-3">Задания</h4>
		<div class="row">
			<div class="col-9">
				<TaskCard />
				<TaskCard />
				<TaskCard />
				<TaskCard />
				<TaskCard />
			</div>
			<div class="col-3">
				<div class="card">
					<div class="card-body">
						<h5 class="mb-4">Фильтр</h5>
						<div class="mb-4">
							<h6>Уровень</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck1">
								<label class="custom-control-label" for="customCheck1">Легкий</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck2">
								<label class="custom-control-label" for="customCheck2">Средений</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck3">
								<label class="custom-control-label" for="customCheck3">Сложный</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Компании</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck4">
								<label class="custom-control-label" for="customCheck4">Github</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck5">
								<label class="custom-control-label" for="customCheck5">Google</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck6">
								<label class="custom-control-label" for="customCheck6">Yandex</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Теги</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck7">
								<label class="custom-control-label" for="customCheck7">Javasript</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck8">
								<label class="custom-control-label" for="customCheck8">PHP</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck9">
								<label class="custom-control-label" for="customCheck9">Vue.js</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>