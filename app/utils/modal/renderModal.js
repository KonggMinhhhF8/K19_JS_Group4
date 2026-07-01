import "./../../assets/css/modal.css";

const renderModal = ({
    title,
    message,
    confirmText = "OK",
    cancelText = "Hủy",
    showCancel = false,
}) => {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "popup-overlay";

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.remove();
                resolve(false);
            }
        });

        const modal = document.createElement("div");
        modal.className = "popup-container";

        const titleElement = document.createElement("h3");
        titleElement.className = "popup-title";
        titleElement.textContent = title;

        const messageElement = document.createElement("p");
        messageElement.className = "popup-message";
        messageElement.textContent = message;

        const footer = document.createElement("div");
        footer.className = "popup-footer";

        const confirmBtn = document.createElement("button");
        confirmBtn.className = "popup-btn popup-btn-confirm";
        confirmBtn.textContent = confirmText;

        confirmBtn.addEventListener("click", () => {
            overlay.remove();
            resolve(true);
        });

        footer.append(confirmBtn);

        if (showCancel) {
            const cancelBtn = document.createElement("button");
            cancelBtn.className = "popup-btn popup-btn-cancel";
            cancelBtn.textContent = cancelText;

            cancelBtn.addEventListener("click", () => {
                overlay.remove();
                resolve(false);
            });

            footer.prepend(cancelBtn);
        }

        modal.append(titleElement, messageElement, footer);

        overlay.append(modal);

        document.body.append(overlay);
    });
};

export default renderModal;
