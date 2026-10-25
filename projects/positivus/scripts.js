document.addEventListener("DOMContentLoaded", () => {
  // 1. Находим элементы модального окна успеха
  const modal = document.getElementById("successModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalOkBtn = document.getElementById("modalOkBtn");
  const modalOverlay = document.getElementById("modalOverlay");

  const openModal = () => modal?.classList.add("is-open");
  const closeModal = () => modal?.classList.remove("is-open");

  // Слушатели для закрытия модалки
  if (modal) {
    modalCloseBtn?.addEventListener("click", closeModal);
    modalOkBtn?.addEventListener("click", closeModal);
    modalOverlay?.addEventListener("click", closeModal);

    // ДОПОЛНИТЕЛЬНО: Закрытие окна по нажатию на клавишу Esc
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  // 2. Находим ВСЕ формы отправки на странице по их классам
  const forms = document.querySelectorAll(".footer-form, .contact-us__form");

  forms.forEach((form) => {
    // Внутри каждой формы ищем её собственную кнопку и блок для сообщений
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : "Send";

    // Ищем блок сообщения (поддерживает и footer-form__message, и contact-us__message)
    const messageBlock = form.querySelector('[class*="__message"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!submitButton) return;

      // Блокируем интерфейс конкретной отправляемой формы
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      if (messageBlock) {
        messageBlock.textContent = "";
        messageBlock.style.color = ""; // Сбрасываем цвет кастомной ошибки
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          // УСПЕХ: Показываем всплывающий поп-ап и очищаем только эту форму
          openModal();
          form.reset();
        } else {
          // ОШИБКА СЕРВЕРА
          const data = await response.json();
          if (messageBlock) {
            messageBlock.textContent = data.error || "Something went wrong. Try again.";
            messageBlock.style.color = "#ff4757"; // Красим ошибку в красный
          }
        }
      } catch (error) {
        // ОШИБКА СЕТИ
        if (messageBlock) {
          messageBlock.textContent = "Submission error. Please check your settings.";
          messageBlock.style.color = "#ff4757";
        }
      } finally {
        // В любом случае возвращаем кнопку текущей формы в активный режим
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }

      // Прячем текстовое сообщение об ошибке через 5 секунд
      if (messageBlock) {
        setTimeout(() => {
          messageBlock.textContent = "";
        }, 5000);
      }
    });
  });
});
