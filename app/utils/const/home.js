const homeHeader = [
    {
        key: "",
        text: "Mã đơn"
    },
    {
        key: "",
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
        key: "",
        text: "Trạng thái",
        formatter: row => {
            const span = document.createElement("span");
            if(row.status === "done") {
                span.innerText = "Thành công";
                span.className = "status"
            }


            const fragment = document.createDocumentFragment();
            fragment.append(span)

            return fragment;
        }
    },
    {
        key: "",
        text: "Tổng tiền"
    },
];

export { homeHeader };