import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const [prevButton, nextButton] = document.querySelectorAll(".pagination__arrow-button");
  const bulletButtons = document.querySelectorAll(".pagination__bullets-button");

  if (prevButton) prevButton.removeAttribute("disabled");
  if (nextButton) nextButton.removeAttribute("disabled");
  bulletButtons.forEach((btn) => btn.removeAttribute("disabled"));

  const slider = new KeenSlider(".testimonials__slider", {
    loop: true,
    mode: "snap",
    slides: {
      perView: "auto",
      origin: "center", // Слайд строго по центру
      spacing: 50,
    },
    // 🔥 СОБЫТИЕ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ: срабатывает один раз при старте
    created(s) {
      const currentAbs = s.track.details.abs;
      s.slides.forEach((slide, idx) => {
        const isCentered = s.track.details.slides[idx].abs === currentAbs;
        slide.classList.toggle("is-current", isCentered);
      });
    },
    // СОБЫТИЕ ПРИ ПРОЛИСТЫВАНИИ: срабатывает каждый раз при смене слайда
    slideChanged(s) {
      // 1. Относительный индекс для звёздочек пагинации (всегда от 0 до 4)
      const currentRel = s.track.details.rel;

      bulletButtons.forEach((btn, i) => {
        btn.parentElement.classList.toggle("is-current", i === currentRel);
        btn.classList.toggle("is-current", i === currentRel);
      });

      // 2. Идеальный расчёт для класса is-current на бесконечных кругах
      s.slides.forEach((slide, idx) => {
        const isCentered = s.track.details.slides[idx].abs === s.track.details.abs;
        slide.classList.toggle("is-current", isCentered);
      });
    },
  });

  prevButton?.addEventListener("click", () => slider.prev());
  nextButton?.addEventListener("click", () => slider.next());

  bulletButtons.forEach((button, index) => {
    button.addEventListener("click", () => slider.moveToIdx(index));
  });
});
