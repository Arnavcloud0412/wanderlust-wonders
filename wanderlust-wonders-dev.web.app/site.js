(function () {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (header && document.body.classList.contains("home")) {
        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 24);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && nav && header) {
        toggle.addEventListener("click", () => {
            const open = header.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                header.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const shots = Array.from(document.querySelectorAll(".shot"));
    const lightbox = document.querySelector(".lightbox");
    if (!shots.length || !lightbox) return;

    const img = lightbox.querySelector("img");
    const count = lightbox.querySelector(".lightbox-count");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    let index = 0;
    let lastFocus = null;

    function show(nextIndex) {
        index = (nextIndex + shots.length) % shots.length;
        const source = shots[index].querySelector("img");
        img.src = source.currentSrc || source.src;
        img.alt = source.alt;
        count.textContent = (index + 1) + " / " + shots.length;
    }

    function open(start) {
        lastFocus = document.activeElement;
        show(start);
        lightbox.hidden = false;
        document.body.classList.add("no-scroll");
        closeBtn.focus();
    }

    function close() {
        lightbox.hidden = true;
        document.body.classList.remove("no-scroll");
        img.removeAttribute("src");
        if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }

    shots.forEach((shot, shotIndex) => {
        shot.addEventListener("click", () => open(shotIndex));
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) return;
        if (event.key === "Escape") close();
        if (event.key === "ArrowLeft") show(index - 1);
        if (event.key === "ArrowRight") show(index + 1);
    });
})();
