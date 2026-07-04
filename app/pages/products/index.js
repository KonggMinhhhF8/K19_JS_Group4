import {
    renderHeader,
    renderStats,
    renderTable,
    renderSidebar,
    renderFilter,
    getStatsConfig,
    productHeader,
} from "../../utils/index.js";
import router from "../../plugins/router.js";
import { showAlert, showConfirm } from "../../utils/modal";
import { get, deleteById } from "../../api/api.js";

const app = document.getElementById("app");

const ProductsPage = async () => {
    app.innerHTML = "";


    const header = await renderHeader({
        type: "product",
        input: true,
        placeholderText: "Tìm tên sản phẩm, mã SKU ...",
        buttons: [
            {
                buttonText: "Thêm sản phẩm",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            },
        ],
        onSearch: (searchValue) => {
            const keyword = searchValue.trim().toLowerCase();
            const rows = document.querySelectorAll("tbody tr");

            rows.forEach(row => {
                const cells = row.querySelectorAll("td");
                let match = false;

                cells.forEach(td => {
                    const raw = (td.dataset.raw || "").toLowerCase();
                    if (raw.includes(keyword)) {
                        match = true;
                    }
                });

                row.style.display = match || keyword === "" ? "" : "none";
            });
        }
    });

    const container = document.createElement("div");
    container.className = "container";

    const sidebar = renderSidebar("products");

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header);
    container.append(sidebar, mainContent);

    const editProduct = (product) => {
        router.navigate(`/products/edit/${product.id}`);
    };

    const deleteProduct = async (product) => {
        const confirmed = await showConfirm(
            "Xác nhận xóa",
            `Bạn có chắc muốn xóa "${product.name}"?`,
        );

        if (!confirmed) return;

        const response = await deleteById("products", product.id);

        if (!response) return;

        if (response.error) {
            await showAlert("Thất bại", response.message);
            return;
        }

        showAlert("Thành công", `Đã xóa thành công "${product.name}"`);

        // Gọi lại hàm để cập nhật lại bảng và làm mới số liệu Stats giảm xuống
        await loadProducts();
    };

    // Hàm tải dữ liệu, tự động tính số liệu sản phẩm và render giao diện
    const loadProducts = async () => {
        const products = await get("products");
        if (!products) return;

        //update stats
        const oldStats = mainContent.querySelector(".stats");
        if (oldStats) {
            oldStats.remove();
        }

        // gọi hàm tính stats
        const statsCards = getStatsConfig("products", products);
        const stats = await renderStats({
            cardContainer: "stats",
            cards: statsCards
        });

        // Chèn stats
        if (header.nextSibling) {
            mainContent.insertBefore(stats, header.nextSibling);
        } else {
            mainContent.append(stats);
        }

        // RENDER BẢNG DỮ LIỆU
        const oldTable = mainContent.querySelector(".table-container");
        if (oldTable) {
            oldTable.remove();
        }

        const table = await renderTable(
            productHeader,
            products,
            editProduct,
            deleteProduct,
            {
                tableContainer: "table-container",
                tableHeader: "table-header",
            },
            true,
            {
                title: true,
                titleText: "Danh mục sản phẩm",
                tabs: false,
                date: false,
            },
        );

        // Chèn bộ lọc Select vào table-header
        const tableHeaderElement = table.querySelector(".table-header");
        if (tableHeaderElement) {
            const categoryFilter = renderFilter({
                type: "select",
                options: [
                    { key: "all", label: "Tất cả danh mục" },
                    { key: "dien-thoai", label: "Điện thoại" },
                    { key: "quan-ao", label: "Quần áo" },
                    { key: "giay-dep", label: "Giày dép" },
                ],
                onFilterChange: (selectedCategory) => {
                    console.log("Danh mục được chọn:", selectedCategory);

                    const rows = table.querySelectorAll("tbody tr");
                    rows.forEach((row) => {
                        const categoryCell = row.querySelector("td:nth-child(3)");
                        if (!categoryCell) return;

                        const categoryText = categoryCell.innerText.trim().toUpperCase();

                        if (selectedCategory === "all") {
                            row.style.display = "";
                        } else if (
                            selectedCategory === "dien-thoai" &&
                            categoryText === "ĐIỆN THOẠI"
                        ) {
                            row.style.display = "";
                        } else if (
                            selectedCategory === "quan-ao" &&
                            categoryText === "QUẦN ÁO"
                        ) {
                            row.style.display = "";
                        } else if (
                            selectedCategory === "giay-dep" &&
                            categoryText === "GIÀY DÉP"
                        ) {
                            row.style.display = "";
                        } else {
                            row.style.display = "none";
                        }
                    });
                },
            });

            tableHeaderElement.append(categoryFilter);
        }

        mainContent.append(table);
    };

    // Tải dữ liệu lần đầu khi khởi tạo trang
    await loadProducts();

    app.append(container);

    // Sự kiện chuyển trang cho nút Thêm sản phẩm
    const btnAdd = document.querySelector(".btn-add");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            router.navigate("/products/create");
        });
    }
};

export default ProductsPage;