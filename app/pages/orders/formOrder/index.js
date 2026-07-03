import { get, post, put } from "../../../api/api.js";
import router from "../../../plugins/router.js";
import { showAlert } from "../../../utils/modal";
import { renderSidebar } from "../../../utils";

const html = `
     <div class="container">
         <main class="main-content">
             <div class="header-actions">
                 <a href="/orders" id="btn-back" class="btn-back">
                     <i class="fas fa-arrow-left"></i>
                     Quay lại danh sách
                 </a>

                 <h2 id="page-title"></h2>
             </div>

             <form id="orderForm">
                 <div class="card">
                     <h3>Thông tin đơn hàng</h3>

                     <div class="form-group">
                         <label>Sản phẩm</label>

                         <select id="product"></select>
                     </div>

                     <div class="form-group">
                         <label>Khách hàng</label>

                         <select id="customer"></select>
                     </div>

                     <div class="form-group">
                         <label>Số lượng</label>

                         <input id="amount" type="number" min="1" required />
                     </div>

                     <div class="form-group">
                         <label>Trạng thái</label>

                         <select id="status">
                            <option value="pending">Chờ xử lý</option>
                            <option value="delivering">Đang giao</option>
                            <option value="done">Hoàn thành</option>
                            <option value="cancel">Đã hủy</option>
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
                     ></button>
                 </div>
             </form>
         </main>
     </div>
 `;

const app = document.getElementById("app");

const formOrderPage = async (id = null) => {
    app.innerHTML = html;

    const container = app.querySelector(".container");
    const sidebar = renderSidebar("orders");
    container.prepend(sidebar);

    const pageTitle = document.getElementById("page-title");
    const btnSave = document.getElementById("btn-save");

    const productSelect = document.getElementById("product");
    const customerSelect = document.getElementById("customer");

    const products = await get("products");

    products.forEach((product) => {
        const option = document.createElement("option");

        option.value = product.id;
        option.textContent = `${product.name} (Còn ${product.remaining})`;

        productSelect.append(option);
    });

    const customers = await get("customers");

    customers.forEach((customer) => {
        const option = document.createElement("option");

        option.value = customer.id;
        option.textContent = `${customer.name} (${customer.rank})`;

        customerSelect.append(option);
    });

    if (id) {
        pageTitle.textContent = "Chỉnh sửa đơn hàng";
        btnSave.textContent = "Lưu thay đổi";

        const orders = await get("orders");

        const order = orders.find((item) => item.id === Number(id));

        if (!order) return;

        productSelect.value = order.product.id;
        customerSelect.value = order.customer.id;

        document.getElementById("amount").value = order.amount;
        document.getElementById("status").value = order.status;
    } else {
        pageTitle.textContent = "Thêm đơn hàng";
        btnSave.textContent = "Thêm đơn hàng";
    }

    const backToOrders = () => {
        router.navigate("/orders");
    };

    const btnBack = document.getElementById("btn-back");
    btnBack.addEventListener("click", (e) => {
        e.preventDefault();
        backToOrders();
    });

    const btnCancel = document.getElementById("btn-cancel");
    btnCancel.addEventListener("click", backToOrders);

    const form = document.getElementById("orderForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const order = {
            productId: Number(productSelect.value),
            customerId: Number(customerSelect.value),
            amount: Number(document.getElementById("amount").value),
            status: document.getElementById("status").value,
        };

        console.log(order);

        const response = id
            ? await put("orders", id, order)
            : await post("orders", order);

        console.log(response);

        if (!response) return;

        if (response.error) {
            await showAlert("Thất bại", response.message);
            return;
        }

        await showAlert(
            "Thành công",
            id ? "Cập nhật đơn hàng thành công." : "Thêm đơn hàng thành công.",
        );

        backToOrders();
    });
};

export default formOrderPage;
