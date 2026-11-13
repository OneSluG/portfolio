import "./modulepreload-polyfill-BsPm7yBB.js";
//#region projects/kroppfitness/js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
	const burgerBtn = document.querySelector(".burger-button");
	const mobileMenu = document.querySelector(".header-mobile-menu");
	const body = document.body;
	if (!burgerBtn || !mobileMenu) return;
	const closeMenu = () => {
		burgerBtn.classList.remove("is-active");
		burgerBtn.setAttribute("aria-expanded", "false");
		mobileMenu.classList.remove("is-active");
		mobileMenu.setAttribute("aria-hidden", "true");
		body.classList.remove("is-menu-opened");
	};
	burgerBtn.addEventListener("click", () => {
		const isActive = burgerBtn.classList.toggle("is-active");
		burgerBtn.setAttribute("aria-expanded", isActive);
		mobileMenu.classList.toggle("is-active", isActive);
		mobileMenu.setAttribute("aria-hidden", !isActive);
		body.classList.toggle("is-menu-opened", isActive);
	});
	mobileMenu.querySelectorAll(".header-mobile-menu__link").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && mobileMenu.classList.contains("is-active")) {
			closeMenu();
			burgerBtn.focus();
		}
	});
	window.addEventListener("resize", () => {
		if (window.innerWidth > 768 && mobileMenu.classList.contains("is-active")) closeMenu();
	});
});
//#endregion
