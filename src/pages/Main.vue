<template>
	<div class="mt-5">
		<main-section v-for="(section, index) in sections" :section="section" :index="index">
			<template v-if="checkSlot(section.slot, 'image')" v-slot:image>
				<div class="position-relative">
					<Ace lang="javascript" theme="monokai" height="250" v-model="code" />
					<Preloader v-if="preloader" :overlay="true" />
				</div>
			</template>
			<template v-if="checkSlot(section.slot, 'bottom')" v-slot:bottom>
				<div class="text-right mb-4">
					<button type="button" class="btn btn-success mt-3 mr-2" @click="run">Запуск</button>
				</div>
			</template>
		</main-section>
	</div>
</template>

<script>
import MainSection from "@/components/MainSection";
import Preloader from "@/components/Preloader";
import Ace from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			code: 'function greeting() { \n\treturn [ \n\t\t"Совершенствуйте", \n\t\t"свои", \n\t\t"навыки", \n\t\t"программирования" \n\t].join(" "); \n}',
			preloader: false,
			sections: [
				{
					caption: "Совершенствуйте свои навыки программирования",
					slot: ["image", "bottom"]
				},
				{
					caption: "Выполняйте задания на качество/скорость и зарабатывайте очки",
					image: {
						link: require("@/assets/brain.png")
					}
				},
				{
					caption: "Создавайте свои задания",
					image: {
						link: require("@/assets/lamp.png")
					}
				},
				{
					caption: "Обсуждайте решения других пользователей",
					image: {
						link: require("@/assets/chat.png")
					}
				}
			]
		} 
	},
	methods: {
		checkSlot(slot, value) {
			if(Array.isArray(slot)) {
				return slot.includes(value);
			} else {
				return slot === value;
			}
		},
		run() {
			let func = new Function(`
				${this.code}

				return greeting();
			`);

			this.preloader = true;
			setTimeout(() => {
				let result = func();

				if(result === undefined) {
					this.sections[0].caption = "¯\\_(ツ)_/¯";
				} else {
					this.sections[0].caption = result;
				}

				this.preloader = false;
			}, 200)
		}
	},
	components: {
		MainSection,
		Preloader,
		Ace
	}
}
</script>