import { renderHeader, renderStats, renderTable, orderHeader} from '../../utils/index.js';
import { get } from '../../api/api.js';
const app = document.getElementById("app");

const html = `
        <div class="container">
            

            <main class="main-content">
                <header>
                    <div class="search-bar">
                        <input
                            type="text"
                            placeholder="Tìm mã đơn, tên khách hàng..."
                        />
                    </div>
                    <button class="btn-export">
                        <i class="fas fa-download"></i> Xuất Excel
                    </button>
                </header>

                <section class="stats">
                    <div class="card blue">
                        <h3>Tổng đơn hàng</h3>
                        <p>1,024</p>
                    </div>
                    <div class="card orange">
                        <h3>Đang xử lý</h3>
                        <p>15</p>
                    </div>
                    <div class="card green">
                        <h3>Thành công</h3>
                        <p>980</p>
                    </div>
                    <div class="card red">
                        <h3>Đã hủy</h3>
                        <p>29</p>
                    </div>
                </section>

                <section class="table-container">
                    <div class="order-controls">
                        <div class="tabs">
                            <button class="tab active">Tất cả</button>
                            <button class="tab">Chờ xử lý</button>
                            <button class="tab">Đang giao</button>
                            <button class="tab">Đã xong</button>
                        </div>
                        <div class="date-filter">
                            <input
                                type="date"
                                style="
                                    padding: 5px;
                                    border: 1px solid #ddd;
                                    border-radius: 5px;
                                "
                            />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>#ORD-7721</strong></td>
                                <td>
                                    Nguyễn Văn An<br /><small
                                        >0912.345.xxx</small
                                    >
                                </td>
                                <td>iPhone 15 Pro Max (x1)</td>
                                <td>32.500.000đ</td>
                                <td>
                                    <span class="badge shipping"
                                        >Đang giao</span
                                    >
                                </td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Xem chi tiết"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button
                                        class="btn-action"
                                        title="In hóa đơn"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#ORD-7722</strong></td>
                                <td>
                                    Lê Thị Bình<br /><small>0988.777.xxx</small>
                                </td>
                                <td>AirPods Pro (x2), Case (x2)</td>
                                <td>11.200.000đ</td>
                                <td>
                                    <span class="badge completed"
                                        >Hoàn thành</span
                                    >
                                </td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Xem chi tiết"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button
                                        class="btn-action"
                                        title="In hóa đơn"
                                    >
                                        <i class="fas fa-print"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#ORD-7723</strong></td>
                                <td>
                                    Phạm Minh Cường<br /><small
                                        >0355.123.xxx</small
                                    >
                                </td>
                                <td>Ốp lưng Silicon</td>
                                <td>250.000đ</td>
                                <td>
                                    <span class="badge pending">Chờ xử lý</span>
                                </td>
                                <td>
                                    <button class="btn-action" title="Xử lý">
                                        <i class="fas fa-check"></i>
                                    </button>
                                    <button class="btn-action" title="Hủy đơn">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>#ORD-7724</strong></td>
                                <td>
                                    Hoàng Anh Tuấn<br /><small
                                        >0909.888.xxx</small
                                    >
                                </td>
                                <td>Sạc nhanh 20W</td>
                                <td>490.000đ</td>
                                <td>
                                    <span class="badge cancelled">Đã hủy</span>
                                </td>
                                <td>
                                    <button
                                        class="btn-action"
                                        title="Xem chi tiết"
                                    >
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
`;



const OrdersPage = async () => {
    console.log("Orders Page");

    const header = renderHeader({
        input: true,
        placeholderText: "Tìm tên mã đơn, tên khách hàng...",
        button: true,
        buttonText: "Xuất Excel",
        buttonIcon: "fa-solid fa-file-export",
        buttonClass: "btn-export",
       
    })

    const stats = renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card blue",
                cardTitle: "Tổng đơn hàng",
                cardContent: "1,024",
                cardContentClass: "value",
                // trend: true,
                // trendText: "12% so với tháng trước",
                // trendStats: "up",
                // trendIcon: "fas fa-arrow-up"
            },  
            {
                cardClass: "card orange",
                cardTitle: "Đang xử lý",
                cardContent: "15"
            },
            {
                cardClass: "card green",
                cardTitle: "Thành công",
                cardContent: "980"
            },
            {
                cardClass: "card red",
                cardTitle: "Đã hủy",
                cardContent: "29"
            },
        ]
        
    })

    const getOrders = async (accessToken) => {
        console.log("get orders");

        const response = await get("orders", accessToken);
        console.log(response);

        return response;
    };

    const data = await getOrders();
    const table = await renderTable(orderHeader, data, {
        tableContainer: "table-container",
        tableHeader: "order-controls",
    },
    true,
    {   title: true,
        titleText: "Tabs sẽ ở đây",
        date: true
    })


    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement('main');
    mainContent.className = "main-content"

    mainContent.append(header, stats, table)

    container.append(mainContent);
    
    app.innerHTML = html;
    app.append(container)
};

export default OrdersPage;
