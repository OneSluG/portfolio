document.addEventListener("DOMContentLoaded", () => {
  // --- ЭЛЕМЕНТЫ ЗАГРУЗКИ ФАЙЛА ---
  const dropZone = document.querySelector(".file-upload__label");
  const fileInput = document.querySelector(".file-upload__input");
  const previewZone = document.querySelector(".file-upload__preview");
  const previewImg = document.querySelector(".file-upload__img");
  const removeBtn = document.querySelector(".file-upload__remove-btn");

  // --- ЭЛЕМЕНТЫ ФОРМЫ ---
  const form = document.querySelector(".play__form");

  // Заглушка, чтобы не нарушать валидацию пустого src
  const BASE64_SPACER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ в байтах

  if (!dropZone) return;

  // Функция очистки зоны превью и инпута
  function resetPreview() {
    fileInput.value = "";
    previewImg.src = BASE64_SPACER;
    previewZone.classList.remove("is-active");
  }

  // Вспомогательная функция для валидации и запуска чтения файла
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

  // 1. Подсветка зоны drag-and-drop
  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        dropZone.classList.add("is-dragover");
      },
      false,
    );
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        dropZone.classList.remove("is-dragover");
      },
      false,
    );
  });

  // 2. Обработка сброса файла (Drop)
  dropZone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      fileInput.files = files;
      validateAndProcess(files[0]);
    }
  });

  // 3. Обработка стандартного выбора через клик и проводник
  fileInput.addEventListener("change", (e) => {
    if (fileInput.files.length > 0) {
      validateAndProcess(fileInput.files[0]);
    }
  });

  // 4. Кнопка удаления превью
  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetPreview();
  });

  // =========================================================================
  // 5. 🚀 ОТПРАВКА ФОРМЫ ЧЕРЕЗ FETCH (БЕЗ ПЕРЕЗАГРУЗКИ)
  // =========================================================================
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Блокируем перезагрузку страницы

      const submitBtn = form.querySelector(".form__button");
      const originalBtnText = submitBtn.textContent;

      // Блокируем кнопку на время отправки
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;

      // Автоматически собираем все поля и файлы формы
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
          // --- НАЧАЛО ИЗМЕНЕНИЙ ДЛЯ МОДАЛЬНОГО ОКНА ---
          const modal = document.getElementById("success-modal");
          const closeBtn = modal.querySelector(".modal__close");

          // Показываем модальное окно
          modal.classList.add("is-open");

          // Функция для закрытия окна
          const closeModal = () => {
            modal.classList.remove("is-open");
            closeBtn.removeEventListener("click", closeModal);
            modal.removeEventListener("click", outerClickCheck);
          };

          // Закрытие по клику на крестик
          closeBtn.addEventListener("click", closeModal);

          // Закрытие по клику на область вокруг окна (на подложку)
          const outerClickCheck = (e) => {
            if (e.target === modal) closeModal();
          };
          modal.addEventListener("click", outerClickCheck);
          // --- КОНЕЦ ИЗМЕНЕНИЙ ДЛЯ МОДАЛЬНОГО ОКНА ---

          form.reset(); // Очищаем текстовые поля формы
          resetPreview(); // Очищаем превью картинки
        } else {
          alert(result.message || "Произошла ошибка при отправке.");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Не удалось связаться с сервером. Проверьте интернет-соединение.");
      } finally {
        // Возвращаем кнопку в исходное состояние
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});
