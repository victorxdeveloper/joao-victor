
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll(".tab-panel");

function openTab(tabName) {
    const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedPanel = document.getElementById(tabName);

    if (!selectedButton || !selectedPanel) {
        return;
    }

    tabButtons.forEach((button) => {
        const isActive = button.dataset.tab === tabName;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
        panel.hidden = panel.id !== tabName;
    });
}

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openTab(button.dataset.tab);
    });
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
    button.addEventListener("click", () => {
        const tabName = button.dataset.openTab;

        openTab(tabName);

        document.querySelector(".tabs").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        document.getElementById(tabName)?.focus({
            preventScroll: true
        });
    });
});

document.querySelector(".tabs").addEventListener("keydown", (event) => {
    const currentIndex = Array.from(tabButtons).indexOf(document.activeElement);

    if (currentIndex === -1) {
        return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabButtons.length;
    } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    } else {
        return;
    }

    event.preventDefault();

    tabButtons[nextIndex].focus();
    openTab(tabButtons[nextIndex].dataset.tab);
});

document.getElementById("year").textContent = new Date().getFullYear();
