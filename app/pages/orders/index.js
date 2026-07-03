import {
    renderHeader,
    renderStats,
    renderTable,
    renderFilter,
    renderSidebar,
    getStatsConfig,
    orderHeader
} from '../../utils/index.js';
import { get, deleteById } from '../../api/api.js';
import router from "../../plugins/router.js";
import { showAlert, showConfirm } from "../../utils/modal";

const app = document.getElementById("app");

const OrdersPage = async () => {
    console.log("Orders Page");
    app.innerHTML = "";

    const header = renderHeader({
        input: true,
        placeholderText: "Tìm tên mã đơn, tên khách hàng...",
        buttons: [
            {
                buttonText: "Thêm order",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            },
            {
                buttonText: "Xuất Excel",
                buttonIcon: "fa-solid fa-file-export",
                buttonClass: "btn-export",
            },
        ]
    });

    const container = document.createElement("div");
    container.className = "container";

    const sidebar = renderSidebar("orders");

    const mainContent = document.createElement('main');
    mainContent.className = "main-content";

    mainContent.append(header);
    container.append(sidebar, mainContent);

    const editOrder = (order) => {
        router.navigate(`/orders/edit/${order.id}`);
    };

    const deleteOrder = async (order) => {
        const confirmed = await showConfirm(
            "Xác nhận xóa đơn",
            `Bạn có chắc chắn muốn xóa đơn hàng #${order.id}?`
        );

        if (!confirmed) return;

        const response = await deleteById("orders", order.id);

        if (!response) return;

        if (response.error) {
            await showAlert("Thất bại", response.message);
            return;
        }

        showAlert("Thành công", `Đã xóa thành công đơn hàng #${order.id}`);

        // Gọi lại hàm để tự động cập nhật lại bảng và số liệu Stats giảm xuống
        await loadOrders();
    };

    // Hàm tải dữ liệu, tự động tính số liệu và render giao diện
    const loadOrders = async () => {
        const data = await get("orders");
        if (!data) return;

        // update data cho stat
        const oldStats = mainContent.querySelector(".stats");
        if (oldStats) {
            oldStats.remove();
        }

        // Gọi hàm Stat
        const statsCards = getStatsConfig("orders", data);
        const stats = renderStats({
            cardContainer: "stats",
            cards: statsCards
        });

        if (header.nextSibling) {
            mainContent.insertBefore(stats, header.nextSibling);
        } else {
            mainContent.append(stats);
        }

        const oldTable = mainContent.querySelector(".table-container");
        if (oldTable) {
            oldTable.remove();
        }

        const table = await renderTable(
            orderHeader,
            data,
            editOrder,
            deleteOrder,
            {
                tableContainer: "table-container",
                tableHeader: "order-controls",
            },
            true,
            {
                title: false,
                tabs: false,
                date: true
            }
        );

        // Chèn bộ lọc Tabs vào order-controls
        const orderControls = table.querySelector(".order-controls");
        if (orderControls) {
            const filterTabs = renderFilter({
                type: "tabs",
                options: [
                    { key: "all", label: "Tất cả" },
                    { key: "pending", label: "Chờ xử lý" },
                    { key: "shipping", label: "Đang giao" },
                    { key: "done", label: "Đã xong" },
                ],
                onFilterChange: (statusKey) => {
                    console.log("User bấm tab:", statusKey);
                    const rows = table.querySelectorAll("tbody tr");

                    rows.forEach(row => {
                        const statusCell = row.querySelector("td:nth-child(5)");
                        if (!statusCell) return;

                        const statusText = statusCell.innerText.trim().toUpperCase();

                        if (statusKey === "all") {
                            row.style.display = "";
                        }
                        else if (statusKey === "pending" && statusText === "CHỜ XỬ LÝ") {
                            row.style.display = "";
                        }
                        else if (statusKey === "shipping" && statusText === "ĐANG GIAO") {
                            row.style.display = "";
                        }
                        else if (statusKey === "done" && statusText === "HOÀN THÀNH") {
                            row.style.display = "";
                        }
                        else {
                            row.style.display = "none";
                        }
                    });
                }
            });

            orderControls.prepend(filterTabs);
        }

        mainContent.append(table);
    };

    // tải dữ liệu lần đầu khi vào trang
    await loadOrders();

    app.innerHTML = "";
    app.append(container);

    // Sự kiện chuyển trang cho nút Thêm order
    const btnAdd = document.querySelector(".btn-add");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            router.navigate("/orders/create");
        });
    }
};

export default OrdersPage;