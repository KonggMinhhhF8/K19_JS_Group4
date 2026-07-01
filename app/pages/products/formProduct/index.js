import { get, post, put } from "../../../api/api.js";
import router from "../../../plugins/router.js";
import "../../../assets/css/formCustomer.css";
import { showAlert } from "../../../utils/modal";
import { getCategories } from "../../../api/category.js";

const html = `
<div class="container">
    <aside class="sidebar">
        <h2>ShopAdmin</h2>

        <ul>
            <li><i class="fas fa-home"></i> Tổng quan</li>
            <li class="active"><i class="fas fa-box"></i> Sản phẩm</li>
            <li><i class="fas fa-shopping-cart"></i> Đơn hàng</li>
            <li><i class="fas fa-users"></i> Khách hàng</li>
            <li><i class="fas fa-chart-line"></i> Báo cáo</li>
        </ul>
    </aside>

    <main class="main-content">
        <div class="header-actions">
            <a href="/products" id="btn-back" class="btn-back">
                <i class="fas fa-arrow-left"></i>
                Quay lại danh sách
            </a>

            <h2 id="page-title"></h2>
        </div>

        <form id="productForm">
            <div class="card">
                <h3>Thông tin sản phẩm</h3>

                <div class="form-group">
                    <label>Tên sản phẩm</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Nhập tên sản phẩm"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>SKU</label>
                    <input
                        id="sku"
                        type="text"
                        placeholder="Ví dụ: IP14PM-256"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Giá bán</label>
                    <input
                        id="price"
                        type="number"
                        placeholder="20000000"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Tồn kho</label>
                    <input
                        id="remaining"
                        type="number"
                        placeholder="100"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Ảnh sản phẩm</label>
                    <input
                        id="imageUrl"
                        type="text"
                        placeholder="https://..."
                    />
                </div>

                <div class="form-group">
                    <select id="category"></select>
                </div>
            </div>

            <div class="form-footer">
                <button
                    type="button"
                    id="btn-cancel"
                    class="btn btn-cancel"
                >
                    Hủy bỏ
                </button>

                <button
                    type="submit"
                    id="btn-save"
                    class="btn btn-save"
                >
                </button>
            </div>
        </form>
    </main>
</div>
`;

const app = document.getElementById("app");

const formProductPage = async (id = null) => {
    app.innerHTML = html;

    const pageTitle = document.getElementById("page-title");
    const btnSave = document.getElementById("btn-save");

    const categories = await getCategories();

    console.log(categories);

    const select = document.getElementById("category");
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.append(option);
    });

    if (id) {
        pageTitle.textContent = "Chỉnh sửa sản phẩm";
        btnSave.textContent = "Lưu thay đổi";

        const products = await get("products");

        const product = products.find((item) => item.id === Number(id));

        if (!product) return;

        document.getElementById("name").value = product.name ?? "";
        document.getElementById("sku").value = product.sku ?? "";
        document.getElementById("price").value = product.price ?? "";
        document.getElementById("remaining").value = product.remaining ?? "";
        document.getElementById("imageUrl").value = product.imageUrl ?? "";
        document.getElementById("category").value = product.category.id;
    } else {
        pageTitle.textContent = "Thêm sản phẩm";
        btnSave.textContent = "Thêm sản phẩm";
    }

    const backToProducts = () => {
        router.navigate("/products");
    };

    const btnBack = document.getElementById("btn-back");
    btnBack.addEventListener("click", (e) => {
        e.preventDefault();
        backToProducts();
    });

    const btnCancel = document.getElementById("btn-cancel");
    btnCancel.addEventListener("click", backToProducts);

    const form = document.getElementById("productForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const product = {
            categoryId: Number(document.getElementById("category").value),
            imageUrl: document.getElementById("imageUrl").value.trim() || null,
            name: document.getElementById("name").value.trim(),
            sku: document.getElementById("sku").value.trim(),
            price: Number(document.getElementById("price").value),
            remaining: Number(document.getElementById("remaining").value),
        };

        const response = id
            ? await put("products", id, product)
            : await post("products", product);

        if (!response) return;

        if (response.error) {
            await showAlert("Thất bại", response.message);
            return;
        }

        await showAlert(
            "Thành công",
            id ? "Cập nhật sản phẩm thành công." : "Thêm sản phẩm thành công.",
        );

        backToProducts();
    });
};

export default formProductPage;
