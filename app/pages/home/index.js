// import "../../assets/css/home.css";
import { get, post, deleteById, patch, put } from "../../api/api.js";
import { renderHeader, renderStats, renderTable, homeHeader} from '../../utils/index.js';

const app = document.getElementById("app");

const html = `
        <div class="overlay" id="overlay"></div>

        <div class="container">
            

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

const HomePage = async () => {
    console.log("Home Page");

    const header = await renderHeader({
        input: false,
        button: false,
        title: true,
        innerTitle: "Admin",
        iconTitle: "fa-solid fa-user"
        
    });

    const stats = renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card",
                cardTitle: "Doanh thu",
                cardContent: "2.500.000đ",
            },  
            {
                cardClass: "card",
                cardTitle: "Đơn mới",
                cardContent: "12"
            }
        ]
        
    });

    const getHome = async (accessToken) => {
        console.log("get home");

        const response = await get("orders", accessToken);
        console.log(response);

        return response;
    };

    const data = await getHome();
    const table = await renderTable(homeHeader, data, {
        tableContainer: "table-section",
        tableHeader: "table-title",
        tableBox: "table-wrapper" 
    }, false, {
        title: true,
        titleText: "Đơn hàng gần đây",
    })

    app.innerHTML = html;
    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats, table)
    const container = document.createElement("div");
    container.className = "container"
    container.append(mainContent)
    app.append(container);
};

export default HomePage;
