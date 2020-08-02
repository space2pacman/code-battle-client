<template>
	<footer class="footer bg-light">
		<div class="container">
			<div class="d-flex justify-content-between">
				<ul class="list-inline mb-0">
					<li class="list-inline-item">
						<router-link to="/about" class="text-decoration-none text-muted mr-2">О проекте</router-link>
					</li>
					<li class="list-inline-item">
						<router-link to="/privacy" class="text-decoration-none text-muted mr-2">Конфиденциальность</router-link>
					</li>
					<li class="list-inline-item">
						<router-link to="/faq" class="text-decoration-none text-muted">FAQ</router-link>
					</li>
				</ul>
				<ul class="list-inline mb-0">
					<li class="list-inline-item">
						<a href="#" class="text-muted">
							<i class="fab fa-vk"></i>
						</a>
					</li>
					<li class="list-inline-item ml-2">
						<a href="#" class="text-muted">
							<i class="fab fa-facebook-f"></i>
						</a>
					</li>
					<li class="list-inline-item ml-2">
						<a href="#" class="text-muted">
							<i class="fab fa-twitter"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer__copyright">
			<div class="container">
				<span class="footer__copyright-symbol">&copy; 2020 Copyright: </span>
				<span class="footer__copyright-name">code-battle</span>
			</div>
		</div>
	</footer>
</template>

<style>
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 90px;
	line-height: 60px;
    z-index: 10;
}

.footer__copyright {
	background-color: rgba(0,0,0,0.2);
	height: 30px;
	line-height: 30px;
}

.footer__copyright-symbol {
	color: rgba(255,255,255,0.6);
}

.footer__copyright-name {
	color: #fff;
}
</style>