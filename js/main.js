document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("[data-email-form]");

  if (form) {
    if (typeof emailjs === "undefined") {
      console.error("EmailJS no se ha cargado correctamente.");
      return;
    }

    emailjs.init({
      publicKey: "Vs3JQevqViinj8UPm"
    });

    form.addEventListener("submit", async event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const button = form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      const data = new FormData(form);

      let status = form.querySelector("[data-form-status]");

      if (!status) {
        status = document.createElement("p");
        status.setAttribute("data-form-status", "");
        status.setAttribute("role", "status");
        form.appendChild(status);
      }

      button.disabled = true;
      button.textContent = "Enviando solicitud...";
      status.textContent = "";

      try {
        await emailjs.send(
          "service_e1qfv6i",
          "template_k4skr6r",
          {
            nombre: data.get("nombre"),
            email: data.get("email"),
            telefono: data.get("telefono") || "No indicado",
            servicio: data.get("servicio"),
            mensaje: data.get("mensaje") || "No indicado"
          }
        );

        form.reset();

        status.textContent = "¡Solicitud enviada correctamente! Nerea se pondrá en contacto contigo.";
        status.style.color = "green";

      } catch (error) {
        console.error("Error al enviar el formulario:", error);

        status.textContent = "No se ha podido enviar la solicitud. Inténtalo de nuevo o contacta por correo electrónico.";
        status.style.color = "red";

      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }
});