import "../../assets/css/customers.css";
import { isAuthenticated } from "../../api/auth.js";
import router from "../../plugins/router.js";

import { get, post, deleteById, patch, put } from "../../api/api.js";
import {
    renderHeader,
    renderStats,
    renderTable,
    renderFilter,
    customerHeader,
    productHeader
} from '../../utils/index.js';
const app = document.getElementById("app");

const CustomersPage = async () => {

    console.log("Customers Page");
    app.innerHTML = "";
    const header = await renderHeader({
        input: true,
        placeholderText: "Tìm tên, email hoặc số điện thoại",
        buttons: [
            {
                buttonText: "Thêm khách hàng",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            }
        ]
        
    });

    const stats = await renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card",
                cardTitle: "Tổng khách hàng",
                cardContent: "850",
                cardContentClass: "value",
                // trend: true,
                // trendText: "12% so với tháng trước",
                // trendStats: "up",
                // trendIcon: "fas fa-arrow-up"
            },  
            {
                cardClass: "card",
                cardTitle: "Khách hàng mới (Tháng)",
                cardContent: "42"
            },
            {
                cardClass: "card",
                cardTitle: "Tỉ lệ quay lại",
                cardContent: "65%"
            },
        ]
        
    });

    const getCustomers = async (accessToken) => {
        console.log("get customers");

        const response = await get("customers", accessToken);
        console.log(response);

        return response;
    };

    const data = await getCustomers();

    const table = await renderTable(customerHeader, data, {
            tableContainer: "table-container",
            tableHeader: "table-header",
        },
        true,
        {
            title: true,
            titleText: "Danh sách khánh hàng",
            tabs: false,
            date: false
        });

    const tableHeaderElement = table.querySelector(".table-header");
    if (tableHeaderElement) {
        const rankFilter = renderFilter({
            type: "select",
            options: [
                { key: "all", label: "Hạng: Tất cả" },
                { key: "vang", label: "Hạng: Vàng" },
                { key: "bac", label: "Hạng: Bạc" },
                { key: "dong", label: "Hạng: Đồng" }
            ],
            onFilterChange: (selectedRank) => {
                console.log("Danh mục được chọn:", selectedRank);

                const rows = table.querySelectorAll("tbody tr");
                rows.forEach(row => {
                    // Cột Danh mục đứng ở vị trí thứ 3
                    const rankCell = row.querySelector("td:nth-child(3)");
                    if (!rankCell) return;

                    const rankText = rankCell.innerText.trim().toUpperCase();

                    if (selectedRank === "all") {
                        row.style.display = "";
                    }
                    else if (selectedRank === "vang" && (rankText === "GOLD")) {
                        row.style.display = "";
                    }
                    else if (selectedRank === "bac" && (rankText === "SILVER")) {
                        row.style.display = "";
                    }
                    else if (selectedRank === "dong" && (rankText === "BRONZE")) {
                        row.style.display = "";
                    }
                    else {
                        row.style.display = "none";
                    }
                });
            }
        });

        tableHeaderElement.append(rankFilter);
    }

    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats, table);

    container.append(mainContent)

    app.innerHTML = "";
    app.append(container);

    const btnAddCustomer = document.querySelector(".btn-add");
    btnAddCustomer.addEventListener("click", () => {
        router.navigate("/customers/create");
        router.resolve();
    });

};

export default CustomersPage;
