import renderModal from "./renderModal";

const showConfirm = (
    title,
    message,
    confirmText = "Đồng ý",
    cancelText = "Hủy",
) => {
    return renderModal({
        title,
        message,
        confirmText,
        cancelText,
        showCancel: true,
    });
};

export default showConfirm;
