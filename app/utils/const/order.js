import { formatPhone, formatNameInitials, formatVND } from "../index.js";

const orderHeader = [
    {
        key: "product.id",
        text: "Mã đơn",
        formatter: row => {
        const strongTag = document.createElement("strong");
        const orderCode = "#ORD-" + row.product.id;
        strongTag.innerText = orderCode;
        return strongTag;
    }
    },
    {
        key: "customer.name",
        text: "Khách hàng",
        formatter: row => {
            const nameTag = document.createElement("span");
            nameTag.innerText = row.customer.name;

            const brTag = document.createElement("br");
            const spanTag = document.createElement("small");
            spanTag.innerText = (formatPhone(row.customer.phone) || "");

            const fragment = document.createDocumentFragment();
            fragment.append(nameTag, brTag, spanTag);
            return fragment;
        }
    },
    {
        key: "product.name",
        text: "Sản phẩm",
        formatter: row => {
            const spanTagProduct = document.createElement("span");
            spanTagProduct.innerText = row.product.name;

            const fragment = document.createDocumentFragment();
            fragment.append(spanTagProduct);
            return fragment;
        }
    },
    {
        key: "product.price",
        text: "Tổng tiền",
        formatter: row => {
            const spanTagProduct = document.createElement("span");
            spanTagProduct.innerText = formatVND(row.product.price);

            const fragment = document.createDocumentFragment();
            fragment.append(spanTagProduct);
            return fragment;
        }
    },
    {
        key: "status",
        text: "Trạng thái",
        formatter: row => {
            const span = document.createElement("span");
            if(row.status === "done") {
                span.innerText = "Hoàn Thành";
                span.className = "badge completed"
            } else if(row.status === "pending") {
                span.innerText = "Chờ xử lý";
                span.className = "badge pending"
            } else if(row.status === "cancel") {
                span.innerText = "Đã hủy";
                span.className = "badge cancelled"
            } else if(row.status === "delivering") {
                span.innerText = "Đang giao";
                span.className = "badge shipping"
            }


            const fragment = document.createDocumentFragment();
            fragment.append(span)

            return fragment;
        }
    },
];

export { orderHeader }