// import "../../assets/css/home.css";

const app = document.getElementById("app");

const html = `
        <div class="overlay" id="overlay"></div>

        <div class="container">
            <aside class="sidebar" id="sidebar">
                <h2>ShopAdmin</h2>
                <ul>
                    <li class="active">
                        <i class="fas fa-home"></i> Tổng quan
                    </li>
                    <li><i class="fas fa-box"></i> Sản phẩm</li>
                    <li><i class="fas fa-shopping-bag"></i> Đơn hàng</li>
                    <li><i class="fas fa-users"></i> Khách hàng</li>
                </ul>
            </aside>

            <main class="main-content">
                <header>
                    <button class="menu-btn" id="menuToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="user">
                        <strong>Admin</strong>
                        <i class="fas fa-user-circle"></i>
                    </div>
                </header>

                <section class="stats">
                    <div class="card">
                        <h3>Doanh thu</h3>
                        <p>2.500.000đ</p>
                    </div>
                    <div class="card">
                        <h3>Đơn mới</h3>
                        <p>12</p>
                    </div>
                </section>

                <section class="table-section">
                    <div class="table-title">
                        <h3>Đơn hàng gần đây</h3>
                    </div>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Khách hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#1234</td>
                                    <td>Anh Tuấn</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>500.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1235</td>
                                    <td>Chị Lan</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>1.200.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1236</td>
                                    <td>Minh Hoàng</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>350.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1237</td>
                                    <td>Thu Hà</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>900.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1238</td>
                                    <td>Quốc Anh</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>1.500.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1239</td>
                                    <td>Bảo Ngọc</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>750.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1240</td>
                                    <td>Hữu Thắng</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>2.100.000đ</td>
                                </tr>
                                <tr>
                                    <td>#1241</td>
                                    <td>Thanh Trúc</td>
                                    <td>
                                        <span class="status">Thành công</span>
                                    </td>
                                    <td>480.000đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
`;

const HomePage = () => {
    console.log("Home Page");
    app.innerHTML = html;
};

export default HomePage;
