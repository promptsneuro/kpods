/**
 * Elite Website Global Scripts
 * Версия: 2.0 (Robust & Integrated)
 */

document.addEventListener("DOMContentLoaded", () => {
  try {
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");
    if (burger && navMenu) {
      burger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        burger.innerHTML = navMenu.classList.contains("active")
          ? '<i class="ph-bold ph-x"></i>'
          : '<i class="ph ph-list"></i>';
      });
      // document.querySelectorAll(".nav-link").forEach((link) => {
      //   link.addEventListener("click", () =>
      //     navMenu.classList.remove("active"),
      //   );
      // });
    }
  } catch (e) {
    console.warn("Menu Error:", e);
  }

  function initReveal(selector, threshold = 0.1) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { root: null, threshold, rootMargin: "0px" },
    );
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  }
  initReveal(".reveal", 0.15);

  try {
    const header = document.getElementById("header");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
          header.style.height = "70px";
        } else {
          header.style.boxShadow = "none";
          header.style.height = "80px";
        }
      });
    }
  } catch (e) {
    console.warn("Scroll Error:", e);
  }

  try {
    const filters = document.querySelectorAll(".team-controls .btn");
    const cards = document.querySelectorAll(".team-card");
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        cards.forEach((card) => {
          if (
            filter === "all" ||
            card.getAttribute("data-category") === filter
          ) {
            card.style.display = "revert";
            setTimeout(() => card.classList.remove("hidden"), 10);
          } else {
            card.classList.add("hidden");
            setTimeout(() => (card.style.display = "none"), 300);
          }
        });
      });
    });
  } catch (e) {
    console.warn("Team Error:", e);
  }

  try {
    const timelineItems = document.querySelectorAll(".timeline-item");
    // if (timelineItems.length > 0) {
    //     initReveal(timelineItems, { threshold: 0.2 });
    // }
    if (timelineItems.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.2 },
      );

      timelineItems.forEach((item) => observer.observe(item));
    }
  } catch (e) {
    console.warn("Timeline error:", e);
  }

  try {
    const form = document.getElementById("cooperationForm");
    const successMessage = document.getElementById("successMessage");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Валидация
        const inputs = form.querySelectorAll("input, textarea, select");
        let isValid = true;

        inputs.forEach((input) => {
          if (input.required && !input.value.trim()) {
            isValid = false;
            input.classList.add("error");
          } else {
            input.classList.remove("error");
          }
        });

        if (!isValid) return;

        // Отправка формы
        const submitBtn = form.querySelector(".submit-btn");
        submitBtn.textContent = "Отправка...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        setTimeout(() => {
          // Показ сообщения успеха
          form.style.display = "none";
          successMessage.style.display = "block";

          // Сброс кнопки
          document
            .getElementById("send-more")
            ?.addEventListener("click", () => {
              form.style.display = "block";
              successMessage.style.display = "none";

              // Очистка формы
              inputs.forEach((input) => {
                input.value = "";
                input.classList.remove("error");
              });

              submitBtn.textContent = "Отправить заявку";
              submitBtn.style.opacity = "1";
              submitBtn.disabled = false;
            });
        }, 1500);
      });
    }
  } catch (e) {
    console.warn("Ошибка в обработке формы:", e);
  }

  try {
    const searchInput = document.getElementById("archiveSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll(".archive-item").forEach((item) => {
          item.style.display = item.textContent.toLowerCase().includes(term)
            ? "flex"
            : "none";
        });
      });
    }
  } catch (e) {
    console.warn("Search Error:", e);
  }

  try {
    const regionCards = document.querySelectorAll(".region-card");

    if (regionCards.length > 0) {
      regionCards.forEach((card) => {
        card.addEventListener("click", () => {
          // Сброс активности
          regionCards.forEach((c) => {
            c.classList.remove("active");
            c.style.background = "var(--color-white)";
          });

          // Активация текущей карточки
          card.classList.add("active");
          card.style.background = "#f0fdf4";

          // SEO-мета-данные для карточки
          const regionName = card.querySelector("h4").textContent;
          document
            .querySelector("meta[name='region']")
            ?.setAttribute("content", regionName);

          // Логирование
          console.log("Выбран регион:", regionName);
        });
      });
    }
  } catch (e) {
    console.warn("Ошибка в обработке региональных карточек:", e);
  }

  try {
    const tabs = document.querySelectorAll(".tab-btn");
    const articles = document.querySelectorAll(".news-item");

    if (tabs.length > 0 && articles.length > 0) {
      tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
          // Сброс активности
          tabs.forEach((t) => t.classList.remove("active"));
          e.currentTarget.classList.add("active");

          // Получение категории
          const category =
            e.currentTarget.getAttribute("data-category") || "all";

          // Фильтрация
          articles.forEach((item) => {
            if (category === "all" || item.dataset.category === category) {
              item.style.display = "flex";
              item.style.opacity = "0";
              setTimeout(() => (item.style.opacity = "1"), 50);
            } else {
              item.style.display = "none";
            }
          });

          // SEO-мета-данные
          document
            .querySelector("meta[name='news-filter']")
            ?.setAttribute("content", category);
        });
      });
    }
  } catch (e) {
    console.warn("Ошибка в фильтрации новостей:", e);
  }

  try {
    const mapBtns = document.querySelectorAll(".map-btn");
    const mapLayers = document.querySelectorAll(".map-layer");
    mapBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        mapBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const type = btn.getAttribute("data-map-type");
        mapLayers.forEach((layer) => layer.classList.remove("active"));
        if (type === "ostm")
          document.getElementById("map-ostm").classList.add("active");
        if (type === "google")
          document.getElementById("map-google").classList.add("active");
        if (type === "static")
          document.getElementById("map-static").classList.add("active");
      });
    });
  } catch (e) {
    console.warn("Map Error:", e);
  }

  try {
    const modal = document.getElementById("tourModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.querySelector(".modal-close");
    const infoBtns = document.querySelectorAll(".btn-info");

    if (modal && modalTitle && modalBody) {
      function openModal(event) {
        const btn = event.currentTarget;
        const title = btn.getAttribute("data-title");
        const detailsData = btn.getAttribute("data-details");

        if (title && detailsData) {
          try {
            const details = JSON.parse(detailsData);console
            // Вставляем контент в модальное окно
            modalTitle.textContent = title;
            modalBody.innerHTML = `
                    <div class="detail-section">
                        <h4>Маршрут программы</h4>
                        <p>${details.route}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Условия проживания</h4>
                        <p>${details.accommodation}</p>
                    </div>
                    <div class="detail-section">
                        <h4>Питание</h4>
                        <p>${details.food}</p>
                    </div>
                    <div class="modal-map" id="tourMapContainer">
                    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${details.map}&amp;layer=mapnik" ></iframe><br/>
                    </div>
                `;

            // Активируем модальное окно (доступно для скринридеров)
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");

            // Блокируем скролл страницы для UX
            document.body.style.overflow = "hidden";
          } catch (e) {
            console.error("Ошибка парсинга JSON в data-details:", e);
            modalTitle.textContent = "Ошибка загрузки данных";
          }
        }
      }
      function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }

    if (infoBtns.length > 0) {
      infoBtns.forEach((btn) => {
        btn.addEventListener("click", openModal);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }

    // Закрытие по клавише ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  } catch (e) {
    console.warn("Modal Error:", e);
  }
});
