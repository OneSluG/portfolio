import "./modulepreload-polyfill-DQevEmWy.js";

//#region projects/kroppfitness/js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
	const burgerBtn = document.querySelector(".burger-button");
	const mobileMenu = document.querySelector(".header-mobile-menu");
	const body = document.body;
	if (!burgerBtn || !mobileMenu) return;
	burgerBtn.addEventListener("click", () => {
		const isActive = burgerBtn.classList.toggle("is-active");
		burgerBtn.setAttribute("aria-expanded", isActive);
		mobileMenu.classList.toggle("is-active");
		mobileMenu.setAttribute("aria-hidden", !isActive);
		body.classList.toggle("is-menu-opened");
	});
	mobileMenu.querySelectorAll(".header-mobile-menu__link").forEach((link) => {
		link.addEventListener("click", () => {
			burgerBtn.classList.remove("is-active");
			burgerBtn.setAttribute("aria-expanded", "false");
			mobileMenu.classList.remove("is-active");
			mobileMenu.setAttribute("aria-hidden", "true");
			body.classList.remove("is-menu-opened");
		});
	});
});

//#endregion