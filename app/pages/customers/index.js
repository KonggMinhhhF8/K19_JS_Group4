import {
    renderHeader,
    renderStats,
    renderTable,
    renderFilter,
    renderSidebar,
    getStatsConfig,
    customerHeader,
} from "../../utils/index.js";
import router from "../../plugins/router.js";
import { showAlert, showConfirm } from "../../utils/modal";
import { get, deleteById } from "../../api/api.js";
import "../../assets/css/customers.css";

const app = document.getElementById("app");

const CustomersPage = async () => {
    app.innerHTML = "";

    // 1. Khởi tạo Header thanh tìm kiếm và nút chức năng
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

    const container = document.createElement("div");
    container.className = "container";

    const sidebar = renderSidebar("customers");

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    // Ban đầu chỉ append header, khối stats sẽ render động theo dữ liệu thực tế
    mainContent.append(header);
    container.append(sidebar, mainContent);

    // Hàm xử lý khi bấm nút Sửa khách hàng
    const editCustomer = (customer) => {
        router.navigate(`/customers/edit/${customer.id}`);
    };

    // Hàm xử lý khi bấm nút Xóa khách hàng
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

        showAlert("Thành công", "Đã xóa khách hàng thành công.");

        // Gọi lại hàm để cập nhật lại bảng và làm mới số liệu Stats giảm xuống
        await loadCustomers();
    };

    // Hàm tải dữ liệu, tự động tính số liệu khách hàng và render giao diện
    const loadCustomers = async () => {
        const customers = await get("customers");
        if (!customers) return;

        // --- XỬ LÝ UPDATE KHỐI SỐ LIỆU (STATS) TỰ ĐỘNG ---
        const oldStats = mainContent.querySelector(".stats");
        if (oldStats) {
            oldStats.remove();
        }

        // Lấy cấu hình mảng card tính toán tự động từ API khách hàng
        const statsCards = getStatsConfig("customers", customers);
        const stats = renderStats({
            cardContainer: "stats",
            cards: statsCards
        });

        // Chèn khối stats vào ngay sau header để đúng thứ tự UI
        if (header.nextSibling) {
            mainContent.insertBefore(stats, header.nextSibling);
        } else {
            mainContent.append(stats);
        }
        // -------------------------------------------------

        // --- XỬ LÝ RENDER BẢNG DỮ LIỆU ---
        const oldTable = mainContent.querySelector(".table-container");
        if (oldTable) {
            oldTable.remove();
        }

        const table = renderTable(
            customerHeader,
            customers,
            editCustomer,
            deleteCustomer,
            {
                tableContainer: "table-container",
                tableHeader: "table-header",
                tableBox: "",
            },
            true,
            {
                title: true,
                titleText: "Danh sách khách hàng",
            },
        );

        // Chèn bộ lọc phân hạng vào table-header
        const tableHeaderElement = table.querySelector(".table-header");
        if (tableHeaderElement) {
            const rankFilter = renderFilter({
                type: "select",
                options: [
                    { key: "all", label: "Tất cả" },
                    { key: "vang", label: "Hạng: Vàng" },
                    { key: "bac", label: "Hạng: Bạc" },
                    { key: "dong", label: "Hạng: Đồng" },
                ],
                onFilterChange: (selectedRank) => {
                    console.log("Danh mục được chọn:", selectedRank);

                    const rows = table.querySelectorAll("tbody tr");
                    rows.forEach((row) => {
                        const rankCell = row.querySelector("td:nth-child(3)");
                        if (!rankCell) return;

                        const rankText = rankCell.innerText.trim().toUpperCase();

                        if (selectedRank === "all") {
                            row.style.display = "";
                        } else if (
                            selectedRank === "vang" &&
                            rankText === "GOLD"
                        ) {
                            row.style.display = "";
                        } else if (
                            selectedRank === "bac" &&
                            rankText === "SILVER"
                        ) {
                            row.style.display = "";
                        } else if (
                            selectedRank === "dong" &&
                            rankText === "BRONZE"
                        ) {
                            row.style.display = "";
                        } else {
                            row.style.display = "none";
                        }
                    });
                },
            });

            tableHeaderElement.append(rankFilter);
        }

        mainContent.append(table);
    };

    // Tải dữ liệu lần đầu khi khởi tạo trang
    await loadCustomers();

    app.append(container);

    // Sự kiện chuyển trang cho nút Thêm khách hàng
    const btnAdd = document.querySelector(".btn-add");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            router.navigate("/customers/create");
        });
    }
};

export default CustomersPage;
