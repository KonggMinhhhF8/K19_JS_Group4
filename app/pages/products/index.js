import {
    renderHeader,
    renderStats,
    renderTable,
    renderFilter,
    productHeader,
    orderHeader,
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

        // extraOptions: {
        //     filterClass: "filter-group",
        //     dateStart: "2026-01-01",
        //     dateEnd: "2026-01-24",
        //     filterText: "Lọc"
        // }
    });

    const stats = await renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card",
                cardTitle: "Tổng sản phẩm",
                cardContent: "1240",
                cardContentClass: "value",
                // trend: true,
                // trendText: "12% so với tháng trước",
                // trendStats: "up",
                // trendIcon: "fas fa-arrow-up"
            },
            {
                cardClass: "card",
                cardTitle: "Sắp hết hàng",
                cardContent: "12",
            },
            {
                cardClass: "card",
                cardTitle: "Danh mục",
                cardContent: "15",
            },
        ],
    });

    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats);

    container.append(mainContent);

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

        showAlert("Thành công", `Đã xóa thành công"${product.name}"`);

        await loadProducts();
    };

    const loadProducts = async () => {
        const products = await get("products");

        if (!products) return;

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
                        // Cột Danh mục đứng ở vị trí thứ 3
                        const categoryCell =
                            row.querySelector("td:nth-child(3)");
                        if (!categoryCell) return;

                        const categoryText = categoryCell.innerText
                            .trim()
                            .toUpperCase();

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

    await loadProducts();

    app.append(container);

    const btnAdd = document.querySelector(".btn-add");

    btnAdd.addEventListener("click", () => {
        router.navigate("/products/create");
    });
};

export default ProductsPage;
