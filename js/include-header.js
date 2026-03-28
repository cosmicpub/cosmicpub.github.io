async function loadSharedHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  try {
    const res = await fetch("/components/header.html");
    if (!res.ok) throw new Error(`Failed to load header: ${res.status}`);
    const html = await res.text();
    mount.innerHTML = html;

    const toggle = document.getElementById("siteMenuToggle");
    const nav = document.getElementById("siteNav");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  } catch (err) {
    console.error("Header include failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadSharedHeader);
