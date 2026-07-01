import renderModal from "./renderModal";

const showAlert = (title, message) => {
    return renderModal({
        title,
        message,
        confirmText: "Đóng",
    });
};

export default showAlert;
