import { get, post, deleteById, patch, put } from "/app/api/api.js";
import { isAuthenticated } from "../../api/auth.js";
import router from "../../plugins/router.js";
import "../../assets/css/createCustomer.css";

const app = document.getElementById("app");

const html = `
<div class="container">
    <aside class="sidebar">
        <h2>ShopAdmin</h2>
        <ul>
            <li><i class="fas fa-home"></i> Tổng quan</li>
            <li><i class="fas fa-box"></i> Sản phẩm</li>
            <li><i class="fas fa-shopping-cart"></i> Đơn hàng</li>
            <li class="active">
                <i class="fas fa-users"></i> Khách hàng
            </li>
            <li><i class="fas fa-chart-line"></i> Báo cáo</li>
        </ul>
    </aside>

    <main class="main-content">
        <div class="header-actions">
            <a href="/customers" id="btn-back" class="btn-back">
                <i class="fas fa-arrow-left"></i>
                Quay lại danh sách
            </a>

            <h2>Thêm khách hàng</h2>
        </div>

        <form id="customerForm">
    <div class="card">
        <h3>Thông tin khách hàng</h3>

        <div class="form-group">
            <label>Họ và tên</label>
            <input
                id="name"
                type="text"
                placeholder="Nhập họ và tên"
                required
            />
        </div>

        <div class="form-group">
            <label>Email</label>
            <input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
            />
        </div>

        <div class="form-group">
            <label>Số điện thoại</label>
            <input
                id="phone"
                type="text"
                placeholder="0123456789"
                required
            />
        </div>

        <div class="form-group">
            <label>Địa chỉ</label>
            <textarea
                id="address"
                rows="4"
                placeholder="Nhập địa chỉ khách hàng"
            ></textarea>
        </div>

        <div class="form-group">
            <label>Hạng khách hàng</label>

            <select id="rank">
                <option value="BRONZE">Đồng</option>
                <option value="SILVER">Bạc</option>
                <option value="GOLD">Vàng</option>
            </select>
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
            Thêm khách hàng
        </button>
    </div>
</form>
    </main>
</div>
`;

const CreateCustomerPage = () => {
    app.innerHTML = html;

    const btnBack = document.getElementById("btn-back");
    btnBack.addEventListener("click", () => {
        router.navigate("/customers");
    });

    const btnCancel = document.getElementById("btn-cancel");
    btnCancel.addEventListener("click", () => {
        router.navigate("/customers");
    });

    const form = document.getElementById("customerForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("click");

        const customer = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim() || null,
            rank: document.getElementById("rank").value,
        };

        console.log(customer);

        const response = await post("customers", customer);

        console.log(response);
    });
};

export { CreateCustomerPage };
