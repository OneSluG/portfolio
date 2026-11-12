import "./modulepreload-polyfill-BsPm7yBB.js";
//#region projects/cyberpunk/js/scripts.js
document.addEventListener("DOMContentLoaded", () => {
	const dropZone = document.querySelector(".file-upload__label");
	const fileInput = document.querySelector(".file-upload__input");
	const previewZone = document.querySelector(".file-upload__preview");
	const previewImg = document.querySelector(".file-upload__img");
	const removeBtn = document.querySelector(".file-upload__remove-btn");
	const form = document.querySelector(".play__form");
	const BASE64_SPACER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	const MAX_FILE_SIZE = 5242880;
	if (!dropZone) return;
	function resetPreview() {
		fileInput.value = "";
		previewImg.src = BASE64_SPACER;
		previewZone.classList.remove("is-active");
	}
	function validateAndProcess(file) {
		if (!file.type.startsWith("image/")) {
			alert("Пожалуйста, выберите файл изображения (PNG, JPG, WebP).");
			resetPreview();
			return;
		}
		if (file.size > MAX_FILE_SIZE) {
			alert("Файл слишком большой! Максимальный размер картинки — 5 МБ.");
			resetPreview();
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			previewImg.src = reader.result;
			previewZone.classList.add("is-active");
		};
	}
	["dragenter", "dragover"].forEach((eventName) => {
		dropZone.addEventListener(eventName, (e) => {
			e.preventDefault();
			dropZone.classList.add("is-dragover");
		}, false);
	});
	["dragleave", "drop"].forEach((eventName) => {
		dropZone.addEventListener(eventName, (e) => {
			e.preventDefault();
			dropZone.classList.remove("is-dragover");
		}, false);
	});
	dropZone.addEventListener("drop", (e) => {
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			fileInput.files = files;
			validateAndProcess(files[0]);
		}
	});
	fileInput.addEventListener("change", (e) => {
		if (fileInput.files.length > 0) validateAndProcess(fileInput.files[0]);
	});
	removeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		resetPreview();
	});
	if (form) form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const submitBtn = form.querySelector(".form__button");
		const originalBtnText = submitBtn.textContent;
		submitBtn.textContent = "Отправка...";
		submitBtn.disabled = true;
		const formData = new FormData(form);
		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: formData
			});
			const result = await response.json();
			if (response.ok && result.status === "success") {
				const modal = document.getElementById("success-modal");
				const closeBtn = modal.querySelector(".modal__close");
				modal.classList.add("is-open");
				const closeModal = () => {
					modal.classList.remove("is-open");
					closeBtn.removeEventListener("click", closeModal);
					modal.removeEventListener("click", outerClickCheck);
				};
				closeBtn.addEventListener("click", closeModal);
				const outerClickCheck = (e) => {
					if (e.target === modal) closeModal();
				};
				modal.addEventListener("click", outerClickCheck);
				form.reset();
				resetPreview();
			} else alert(result.message || "Произошла ошибка при отправке.");
		} catch (error) {
			console.error("Ошибка:", error);
			alert("Не удалось связаться с сервером. Проверьте интернет-соединение.");
		} finally {
			submitBtn.textContent = originalBtnText;
			submitBtn.disabled = false;
		}
	});
});
//#endregion
