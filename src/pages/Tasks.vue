<template>
	<div>
		<h1 class="mb-4">Задания</h1>
		<div class="row">
			<div class="col-9">
				<TaskCard v-for="task in filtered.tasks" :task="task" />
			</div>
			<div class="col-3">
				<div class="card">
					<div class="card-body">
						<h5 class="mb-4">Фильтр</h5>
						<div class="mb-4">
							<h6>Уровень</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck1" @change="filter('level', 1)">
								<label class="custom-control-label" for="customCheck1">Легкий</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck2" @change="filter('level', 2)">
								<label class="custom-control-label" for="customCheck2">Средений</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck3" @change="filter('level', 3)">
								<label class="custom-control-label" for="customCheck3">Сложный</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Компании</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck4" @change="filter('company', 'Github')">
								<label class="custom-control-label" for="customCheck4">Github</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck5" @change="filter('company', 'Google')">
								<label class="custom-control-label" for="customCheck5">Google</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck6" @change="filter('company', 'Yandex')">
								<label class="custom-control-label" for="customCheck6">Yandex</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Язык</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck7" @change="filter('language', 'javascript')">
								<label class="custom-control-label" for="customCheck7">JavaScript</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck8" @change="filter('language', 'php')">
								<label class="custom-control-label" for="customCheck8">PHP</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck9" @change="filter('language', 'vue')">
								<label class="custom-control-label" for="customCheck9">Vue.js</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			filtered: {
				tasks: [],
				tags: {},
			},
			tasks: []
		}
	},
	methods: {
		filter(key, value) {
			let tags = this.filtered.tags;

			// init array
			if(!tags[key]) tags[key] = [];

			let index = tags[key].indexOf(value);

			// check value in array
			if(index === -1) {
				tags[key].push(value);				
			} else {
				tags[key].splice(index, 1);

				// remove array if empty
				if(tags[key].length === 0) {
					delete tags[key];
				}
			}

			this.filtered.tasks = this.tasks;

			for(let key in tags) {
				this.filtered.tasks = this.filtered.tasks.filter(task => {
					return tags[key].some(tag => task[key] === tag);
				})
			}
		}
	},
	mounted() {
		this.receive("tasks");
		this.$store.subscribe(mutation => {
			if(mutation.type === "tasks") {
				this.tasks = mutation.payload;
				this.filtered.tasks = mutation.payload;
			}
		})
	}
}
</script>