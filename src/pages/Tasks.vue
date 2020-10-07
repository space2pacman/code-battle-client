<template>
	<div>
		<h1 class="mb-4">Задачи</h1>
		<div class="row">
			<div class="col-9">
				<Preloader v-if="preloader" :overlay="true" />
				<TaskCard v-for="task in tasks.filtered" :task="task" />
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
								<input type="checkbox" class="custom-control-input" id="customCheck4" @change="filter('author', 'Github')">
								<label class="custom-control-label" for="customCheck4">Github</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck5" @change="filter('author', 'Google')">
								<label class="custom-control-label" for="customCheck5">Google</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck6" @change="filter('author', 'Yandex')">
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
import TaskCard from "@/components/TaskCard";
import Preloader from "@/components/Preloader";

export default {
	data() {
		return {
			preloader: true,
			tags: {},
			tasks: {
				list: [],
				filtered: []
			}
		}
	},
	methods: {
		filter(key, value) {
			// init array
			if(!this.tags[key]) this.tags[key] = [];

			let index = this.tags[key].indexOf(value);

			// check value in array
			if(index === -1) {
				this.tags[key].push(value);				
			} else {
				this.tags[key].splice(index, 1);

				// remove array if empty
				if(this.tags[key].length === 0) {
					delete this.tags[key];
				}
			}

			this.tasks.filtered = this.tasks.list;

			for(let key in this.tags) {
				this.tasks.filtered = this.tasks.filtered.filter(task => {
					return this.tags[key].some(tag => task[key] === tag);
				})
			}
		}
	},
	mounted() {
		this.receive("tasks");
		this.$store.subscribe(mutation => {
			if(mutation.type === "tasks") {
				this.tasks.list = mutation.payload;
				this.tasks.filtered = mutation.payload;
				this.preloader = false;
			}
		})
	},
	components: {
		TaskCard,
		Preloader
	}
}
</script>