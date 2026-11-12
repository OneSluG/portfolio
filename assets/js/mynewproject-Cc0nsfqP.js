import "./modulepreload-polyfill-BsPm7yBB.js";
//#region projects/kitchen/src/js/scripts.js
var FormValidator = class {
	constructor(formSelector) {
		this.form = document.querySelector(formSelector);
		if (!this.form) return;
		this.inputs = this.form.querySelectorAll(".contact-form__input, .contact-form__textarea");
		this.init();
	}
	init() {
		this.inputs.forEach((input) => {
			input.addEventListener("blur", () => this.validateField(input));
			input.addEventListener("input", () => {
				if (input.classList.contains("is-invalid")) this.validateField(input);
			});
		});
		this.form.addEventListener("submit", (e) => this.handleSubmit(e));
	}
	validateField(input) {
		let isValid = true;
		const value = input.value.trim();
		if (input.hasAttribute("required") && value === "") isValid = false;
		else if (input.type === "email" && value !== "") isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
		else if (input.type === "tel" && value !== "") isValid = value.replace(/\D/g, "").length >= 7;
		if (isValid) input.classList.remove("is-invalid");
		else input.classList.add("is-invalid");
		return isValid;
	}
	handleSubmit(e) {
		e.preventDefault();
		let isFormValid = true;
		this.inputs.forEach((input) => {
			if (!this.validateField(input)) isFormValid = false;
		});
		if (isFormValid) this.sendData();
		else {
			const firstInvalid = this.form.querySelector(".is-invalid");
			if (firstInvalid) firstInvalid.focus();
		}
	}
	sendData() {
		const submitBtn = this.form.querySelector(".contact-form__btn");
		const originalBtnText = submitBtn.textContent;
		submitBtn.disabled = true;
		submitBtn.textContent = "Отправка...";
		new FormData(this.form);
		setTimeout(() => {
			submitBtn.disabled = false;
			submitBtn.textContent = originalBtnText;
			this.form.reset();
			const successModal = document.getElementById("successModal");
			if (successModal) {
				successModal.classList.add("is-active");
				successModal.setAttribute("aria-hidden", "false");
			} else alert("Сообщение успешно отправлено в бэкграунде!");
		}, 1500);
	}
};
document.addEventListener("DOMContentLoaded", () => {
	new FormValidator(".contact__form");
	const successModal = document.getElementById("successModal");
	if (!successModal) return;
	const closeModal = () => {
		successModal.classList.remove("is-active");
		successModal.setAttribute("aria-hidden", "true");
	};
	successModal.querySelectorAll("[data-modal-close]").forEach((trigger) => {
		trigger.addEventListener("click", closeModal);
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && successModal.classList.contains("is-active")) closeModal();
	});
});
//#endregion
