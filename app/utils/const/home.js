const homeHeader = [
    {
        key: "id",
        text: "Mã đơn",
        formatter: row => {
            const span = document.createElement("span");
            span.innerText = "#" + row.product.id;


            const fragment = document.createDocumentFragment();
            fragment.append(span)

            return fragment;
        }
    },
    {
        key: "customer.name",
        text: "Khách hàng",
        formatter: row => {
            const span = document.createElement("span");
            span.innerText = row.customer.name;


            const fragment = document.createDocumentFragment();
            fragment.append(span)

            return fragment;
        }
    },
    {
        key: "status",
        text: "Trạng thái",
        formatter: row => {
            const span = document.createElement("span");
            if(row.status === "done") {
                span.innerText = "Thành công";
                span.className = "status"
            } else {
                span.innerText = "Đang xử lý";
                span.className = "status pending"
            }


            const fragment = document.createDocumentFragment();
            fragment.append(span)

            return fragment;
        }
    },
    {
        key: "customer.totalSpending",
        text: "Tổng tiền"
    },
];

export { homeHeader };