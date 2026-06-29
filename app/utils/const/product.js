const productHeader = [
    {
        key: 'imageUrl',
        text: 'Hình',
        formatter: row => row.imageUrl ? row.imageUrl : "No image"
    },
    {
        key: 'name',
        text: 'Thông tin sản phẩm',
        formatter: row => {
            const strongTag = document.createElement("strong");
            strongTag.innerText = row.name;

            const brTag = document.createElement("br");
            const spanTag = document.createElement("span");
            spanTag.innerText = "SKU: " + (row.sku || "");

            const fragment = document.createDocumentFragment();
            fragment.append(strongTag, brTag, spanTag);
            return fragment;
        }
    },
    {
        key: 'category',
        text: 'Danh mục',
        formatter: row => row.category?.name || ""
    },
    {
        key: 'price',
        text: 'Gía bán',
        formatter: row => row.price.toLocaleString("vi-VN") + "đ"
    },
    {
        key: 'remaining',
        text: 'Tồn kho',
        formatter: row => {
            if(row.remaining < 10) {
                const strongTag = document.createElement("strong");
                const spanWarnTag = document.createElement("span");
                spanWarnTag.innerText = "(Cảnh báo)"
                strongTag.innerText = row.remaining;
                strongTag.style.color = "red";
                const fragment = document.createDocumentFragment();
                fragment.append(strongTag, spanWarnTag)
                return fragment;
            } 
            return row.remaining;
        }
    },
];

export { productHeader }
