import {
	loadReport,
	renderStatistic,
	renderRevenueChart,
	renderCategoryChart,
	renderTopProducts,
} from "./reports.js";

const app = document.getElementById("app");

const html = `
     <div class="container">
            <aside class="sidebar">
                <h2>ShopAdmin</h2>
                <ul>
                    <li><i class="fas fa-home"></i> Tổng quan</li>
                    <li><i class="fas fa-box"></i> Sản phẩm</li>
                    <li><i class="fas fa-shopping-cart"></i> Đơn hàng</li>
                    <li><i class="fas fa-users"></i> Khách hàng</li>
                    <li class="active">
                        <i class="fas fa-chart-line"></i> Báo cáo
                    </li>
                </ul>
            </aside>

            <main class="main-content">
                <header>
                    <h2>Báo cáo kinh doanh</h2>
                    <div class="filter-group">
                        <input type="date" value="2026-01-01" />
                        <input type="date" value="2026-01-24" />
                        <button
                            style="
                                padding: 8px 15px;
                                background: var(--primary-color);
                                color: white;
                                border: none;
                                border-radius: 5px;
                                cursor: pointer;
                            "
                        >
                            Lọc
                        </button>
                    </div>
                </header>

                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>Doanh thu</h4>
                        <div class="value">128.500.000đ</div>
                        <div class="trend up">
                            <i class="fas fa-arrow-up"></i> 12% so với tháng
                            trước
                        </div>
                    </div>
                    <div class="stat-card">
                        <h4>Đơn hàng</h4>
                        <div class="value">452</div>
                        <div class="trend up">
                            <i class="fas fa-arrow-up"></i> 5%
                        </div>
                    </div>
                    <div class="stat-card">
                        <h4>Lợi nhuận</h4>
                        <div class="value">32.100.000đ</div>
                        <div class="trend down">
                            <i class="fas fa-arrow-down"></i> 2%
                        </div>
                    </div>
                    <div class="stat-card">
                        <h4>Khách mới</h4>
                        <div class="value">84</div>
                        <div class="trend up">
                            <i class="fas fa-arrow-up"></i> 18%
                        </div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-box">
                        <h3>Biểu đồ doanh thu 7 ngày gần nhất</h3>
                        <canvas id="revenueChart"></canvas>
                    </div>
                    <div class="chart-box">
                        <h3>Cơ cấu sản phẩm</h3>
                        <canvas id="categoryChart"></canvas>
                    </div>
                </div>

                <div class="top-products">
                    <h3>Sản phẩm bán chạy nhất</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng bán</th>
                                <th>Doanh thu</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </main>
        </div>
`;

const ReportsPage = async () => {
	console.log("Reports Page");

	app.innerHTML = html;

	const { orders, customers, products } = await loadReport();

	renderStatistic(orders, customers);

	renderRevenueChart(orders);

	renderCategoryChart(products);

	renderTopProducts(orders);
};

export default ReportsPage;
