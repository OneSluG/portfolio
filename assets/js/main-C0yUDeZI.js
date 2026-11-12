import "./modulepreload-polyfill-BsPm7yBB.js";
//#region src/js/main.js
document.addEventListener("DOMContentLoaded", () => {
	const themeToggleBtn = document.getElementById("themeToggle");
	if (!themeToggleBtn) return;
	if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-theme");
	themeToggleBtn.addEventListener("click", () => {
		if (document.body.classList.toggle("dark-theme")) localStorage.setItem("theme", "dark");
		else localStorage.setItem("theme", "light");
	});
});
//#endregion
