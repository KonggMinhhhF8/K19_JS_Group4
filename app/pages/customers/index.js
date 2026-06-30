import { get, post, deleteById, patch, put } from "../../api/api.js";
import { renderHeader, renderStats, renderTable, customerHeader} from '../../utils/index.js';
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
                <header>
                    <div class="search-bar">
                        <input
                            type="text"
                            id="search"
                            onkeyup="searchCustomer()"
                            placeholder="Tìm tên, email hoặc số điện thoại"
                        />
                    </div>
                    <button class="btn-add" onclick="openModal()">
                        <i class="fas fa-user-plus"></i> Thêm khách hàng
                    </button>
                </header>

                <section class="stats">
                    <div class="card">
                        <h3>Tổng khách hàng</h3>
                        <p>850</p>
                    </div>
                    <div class="card">
                        <h3>Khách hàng mới (Tháng)</h3>
                        <p>42</p>
                    </div>
                    <div class="card">
                        <h3>Tỉ lệ quay lại</h3>
                        <p>65%</p>
                    </div>
                </section>

                <section class="table-container">
                    <div class="table-header">
                        <h3>Danh sách khách hàng</h3>
                        <select
                            style="
                                padding: 8px;
                                border-radius: 5px;
                                border: 1px solid #ddd;
                            "
                        >
                            <option>Hạng: Tất cả</option>
                            <option>Hạng: Vàng</option>
                            <option>Hạng: Bạc</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Khách hàng</th>
                                <th>Liên hệ</th>
                                <th>Hạng</th>
                                <th>Đơn hàng</th>
                                <th>Tổng chi tiêu</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="cust-info">
                                        <div
                                            class="avatar"
                                            style="
                                                background: #ebf5fb;
                                                color: #3498db;
                                            "
                                        >
                                            NA
                                        </div>
                                        <div>
                                            <strong>Nguyễn Anh</strong><br />
                                            <small>ID: CUST-001</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    anh.nguyen@email.com<br /><small
                                        >0912.345.xxx</small
                                    >
                                </td>
                                <td><span class="tier gold">VÀNG</span></td>
                                <td>25</td>
                                <td><strong>45.200.000đ</strong></td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Lịch sử mua hàng"
                                    >
                                        <i class="fas fa-history"></i>
                                    </button>
                                    <button
                                        class="btn-action"
                                        onclick="editCustomer(this)"
                                        title="Sửa"
                                    >
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="cust-info">
                                        <div
                                            class="avatar"
                                            style="
                                                background: #fdf2e9;
                                                color: #e67e22;
                                            "
                                        >
                                            TL
                                        </div>
                                        <div>
                                            <strong>Trần Lan</strong><br />
                                            <small>ID: CUST-002</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    lan.tran@email.com<br /><small
                                        >0988.777.xxx</small
                                    >
                                </td>
                                <td><span class="tier silver">BẠC</span></td>
                                <td>12</td>
                                <td><strong>18.500.000đ</strong></td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Lịch sử mua hàng"
                                    >
                                        <i class="fas fa-history"></i>
                                    </button>
                                    <button
                                        class="btn-action"
                                        onclick="editCustomer(this)"
                                        title="Sửa"
                                    >
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="cust-info">
                                        <div
                                            class="avatar"
                                            style="
                                                background: #f4f6f7;
                                                color: #7f8c8d;
                                            "
                                        >
                                            VD
                                        </div>
                                        <div>
                                            <strong>Vũ Duy</strong><br />
                                            <small>ID: CUST-003</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    duy.vu@email.com<br /><small
                                        >0355.999.xxx</small
                                    >
                                </td>
                                <td><span class="tier bronze">ĐỒNG</span></td>
                                <td>3</td>
                                <td><strong>2.100.000đ</strong></td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Lịch sử mua hàng"
                                    >
                                        <i class="fas fa-history"></i>
                                    </button>
                                    <button
                                        class="btn-action"
                                        onclick="editCustomer(this)"
                                        title="Sửa"
                                    >
                                        <i class="fas fa-user-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>

        <!-- Modal thêm khách hàng -->
        <div
            id="modal"
            style="
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
            "
        >
            <div
                style="
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 300px;
                "
            >
                <h3>Thêm khách hàng</h3>
                <input
                    id="name"
                    placeholder="Tên"
                    style="width: 100%; margin: 5px 0; padding: 8px"
                />
                <input
                    id="email"
                    placeholder="Email"
                    style="width: 100%; margin: 5px 0; padding: 8px"
                />
                <input
                    id="phone"
                    placeholder="SĐT"
                    style="width: 100%; margin: 5px 0; padding: 8px"
                />
                <select
                    id="tier"
                    style="width: 100%; margin: 5px 0; padding: 8px"
                >
                    <option value="gold">Vàng</option>
                    <option value="silver">Bạc</option>
                    <option value="bronze">Đồng</option>
                </select>
                <button onclick="addCustomer()" style="margin-top: 10px">
                    Lưu
                </button>
                <button onclick="closeModal()">Hủy</button>
            </div>
        </div>
`;

const CustomersPage = async () => {
    console.log("Customers Page");

    const header = await renderHeader({
        input: true,
        placeholderText: "Tìm tên, email hoặc số điện thoại",
        button: true,
        buttonText: "Thêm khách hàng",
        buttonIcon: "fas fa-plus",
        buttonClass: "btn-add",
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

        const response = await get("/customers", accessToken);
        console.log(response);

        return response;
    };

    const data = await getCustomers();

    const table = await renderTable(customerHeader, data);

    app.innerHTML = html;
    app.append(header, stats, table);
};

export default CustomersPage;
