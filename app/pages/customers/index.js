import "../../assets/css/customers.css";
import { showAlert, showConfirm } from "../../utils/modal";
import { isAuthenticated } from "../../api/auth.js";
import router from "../../plugins/router.js";
import { get, post, deleteById, patch, put } from "../../api/api.js";
import {
    renderHeader,
    renderStats,
    renderTable,
    renderFilter,
    customerHeader,
    productHeader,
} from "../../utils/index.js";
const app = document.getElementById("app");

const CustomersPage = async () => {
    app.innerHTML = "";
    const header = await renderHeader({
        input: true,
        placeholderText: "Tìm tên, email hoặc số điện thoại",
        buttons: [
            {
                buttonText: "Thêm khách hàng",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            },
        ],
    });

    const stats = renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card",
                cardTitle: "Tổng khách hàng",
                cardContent: "850",
            },
            {
                cardClass: "card",
                cardTitle: "Khách hàng mới (Tháng)",
                cardContent: "42",
            },
            {
                cardClass: "card",
                cardTitle: "Tỉ lệ quay lại",
                cardContent: "65%",
            },
        ],
    });

    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats);

    container.append(mainContent);
    app.append(container);

    const editCustomer = (customer) => {
        router.navigate(`/customers/edit/${customer.id}`);
    };

    const deleteCustomer = async (customer) => {
        const confirmed = await showConfirm(
            "Xác nhận xóa",
            `Bạn có chắc muốn xóa "${customer.name}"?`,
        );

        if (!confirmed) return;

        const response = await deleteById("customers", customer.id);

        if (!response) return;

        if (response.error) {
            await showAlert("Thất bại", response.message);
            return;
        }

        await showAlert("Thành công", "Đã xóa khách hàng thành công.");

        await loadCustomers();
    };

    const loadCustomers = async () => {
        const customers = await get("customers");

        if (!customers) return;

        const oldTable = mainContent.querySelector(".table-container");

        if (oldTable) {
            oldTable.remove();
        }

        const table = renderTable(
            customerHeader,
            customers,
            editCustomer,
            deleteCustomer,
        );

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

        mainContent.append(table);
    };

    await loadCustomers();


    btnAddCustomer.addEventListener("click", () => {
        router.navigate("/customers/create");
    });

    app.innerHTML = "";
    app.append(container);
};

export default CustomersPage;
