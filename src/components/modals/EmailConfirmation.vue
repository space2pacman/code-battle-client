<template>
	<b-modal id="email-confirmation">
		<template v-slot:modal-title>
			Подтверждение e-mail адреса
		</template>
		<div>На ваш e-mail адрес отправлено письмо с подтверждением e-mail адреса</div>
		<template v-slot:modal-footer="{ ok }">
			<button class="btn btn-primary" @click="ok">OK</button>
		</template>
	</b-modal>
</template>