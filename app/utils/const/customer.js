import { formatPhone, formatNameInitials } from "../index.js";

const customerHeader = [
    {
        key: "name",
        text: "Khách hàng",
        formatter: row => {
            // const strongTag = document.createElement("strong");
            // strongTag.innerText = row.name;

            // const brTag = document.createElement("br");
            // const spanTag = document.createElement("small");
            // spanTag.innerText = "ID: CUST-" + (row.id || "");

            // const fragment = document.createDocumentFragment();
            // fragment.append(strongTag, brTag, spanTag);
            // return fragment;

            const divBox = document.createElement("div");
            divBox.className = "cust-info";

            const divAvatar = document.createElement("div");
            divAvatar.className = "avatar";
            Object.assign(divAvatar.style, {
                backgroundColor: "#ebf5fb",
                color: "#3498db",
            });

            divAvatar.innerText = formatNameInitials(row.name);

            const strongTag = document.createElement("strong");
            strongTag.innerText = row.name;
            divBox.append(divAvatar);

            const brTag = document.createElement("br");
            const spanTag = document.createElement("small");
            spanTag.innerText = "ID: CUST-" + (row.id || "");
            const divBoxChild = document.createElement("div");
            divBoxChild.append(strongTag, brTag, spanTag);
            divBox.append(divBoxChild)

            const fragment = document.createDocumentFragment();
            fragment.append(divBox)

            return fragment;
        }
    },
    {
        key: "email",
        text: "Liên hệ",
        formatter: row => {
            const strongTag = document.createElement("strong");
            strongTag.innerText = row.email;

            const brTag = document.createElement("br");
            const spanTag = document.createElement("small");
            spanTag.innerText = (formatPhone(row.phone) || "");

            const fragment = document.createDocumentFragment();
            fragment.append(strongTag, brTag, spanTag);
            return fragment;
        }
    },
    {
        key: "rank",
        text: "Hạng",
        formatter: row => {
            const rankTag = document.createElement("span");
            rankTag.innerText = row.rank;
            rankTag.className = "tier";
            const rankName = row.rank;
            if(rankName) {
                rankTag.classList.add(rankName.toLowerCase())
            }            

            const fragment = document.createDocumentFragment();
            fragment.append(rankTag);
            return fragment;
        }
    },
    {
        key: "id",
        text: "Đơn hàng"
    },
    {
        key: "totalSpending",
        text: "Tổng chi tiêu"
    },
];

export { customerHeader }