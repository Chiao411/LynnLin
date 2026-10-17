// Lynn — shared site script

(function () {
  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "關閉選單" : "開啟選單");
      menu.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Contact form: compose an email in the visitor's mail app
  const form = document.getElementById("contact-form");
  if (!form) return;

  const EMAIL = "yushan.lin.1313@gmail.com";
  const status = form.querySelector(".form-status");

  const showError = (field, message) => {
    const error = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements.name;
    const message = form.elements.message;
    let firstInvalid = null;

    showError(name, name.value.trim() ? "" : "請填寫你的稱呼，方便我回覆你。");
    if (!name.value.trim()) firstInvalid = firstInvalid || name;

    showError(message, message.value.trim() ? "" : "請簡單描述你想解決的問題。");
    if (!message.value.trim()) firstInvalid = firstInvalid || message;

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const company = form.elements.company.value.trim();
    const type = form.elements.type.value;
    const services = Array.from(form.querySelectorAll('input[name="service"]:checked'))
      .map((el) => el.value);

    const subject = `合作詢問｜${company || name.value.trim()}`;
    const body = [
      `稱呼：${name.value.trim()}`,
      `公司／品牌：${company || "（未填）"}`,
      `類型：${type || "（未選）"}`,
      `想討論的服務：${services.length ? services.join("、") : "（未選）"}`,
      "",
      "需求說明：",
      message.value.trim(),
    ].join("\n");

    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = "已開啟你的 Email 程式，確認內容後寄出即可。如果沒有跳出視窗，請直接寄信到 " + EMAIL + "。";
    }
  });
})();
