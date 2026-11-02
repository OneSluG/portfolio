document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger-button");
  const mobileMenu = document.querySelector(".header-mobile-menu");
  const body = document.body;

  // Проверяем, что элементы существуют на странице
  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener("click", () => {
    // 1. Переключаем бургер кнопку (анимация в крестик)
    const isActive = burgerBtn.classList.toggle("is-active");
    burgerBtn.setAttribute("aria-expanded", isActive);

    // 2. Включаем/выключаем само полноэкранное меню
    mobileMenu.classList.toggle("is-active");
    mobileMenu.setAttribute("aria-hidden", !isActive);

    // 3. Блокируем скролл у body, чтобы сайт не двигался на фоне
    body.classList.toggle("is-menu-opened");
  });

  // ДОПОЛНИТЕЛЬНО: Закрывать меню, если кликнули по любой ссылке внутри него
  const menuLinks = mobileMenu.querySelectorAll(".header-mobile-menu__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burgerBtn.classList.remove("is-active");
      burgerBtn.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-active");
      mobileMenu.setAttribute("aria-hidden", "true");
      body.classList.remove("is-menu-opened");
    });
  });
});
