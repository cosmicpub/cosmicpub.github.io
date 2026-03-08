async function loadSharedFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  try {
    const res = await fetch("/components/footer.html");
    if (!res.ok) throw new Error(`Failed to load footer: ${res.status}`);
    const html = await res.text();
    mount.innerHTML = html;
  } catch (err) {
    console.error("Footer include failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadSharedFooter);
