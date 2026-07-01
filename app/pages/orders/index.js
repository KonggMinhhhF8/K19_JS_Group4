import {renderHeader, renderStats, renderTable, renderFilter, orderHeader, productHeader} from '../../utils/index.js';
import { get } from '../../api/api.js';
const app = document.getElementById("app");

const OrdersPage = async () => {
    console.log("Orders Page");

    const header = renderHeader({
        input: true,
        placeholderText: "Tìm tên mã đơn, tên khách hàng...",        
        buttons: [
            {
                buttonText: "Thêm order",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            },
            {
                buttonText: "Xuất Excel",
                buttonIcon: "fa-solid fa-file-export",
                buttonClass: "btn-export",
            },
            
        ]
       
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
    const table = await renderTable(productHeader, data, {

            tableContainer: "table-container",

            tableHeader: "product-controls",

        },

        true,

        { title: true,

            titleText: "Danh mục sản phẩm",

            date: false

        })

    const orderControls = table.querySelector(".order-controls");
    if (orderControls) {

        const filterTabs = renderFilter({
            type: "tabs",
            options: [
                { key: "all", label: "Tất cả" },
                { key: "pending", label: "Chờ xử lý" },
                { key: "shipping", label: "Đang giao" },
                { key: "done", label: "Đã xong" },
            ],
            onFilterChange: (statusKey) => {
                console.log("User bấm tab:", statusKey);
                // Tí nữa ông xử lý lọc mảng `data` theo statusKey ở đây rồi render lại body nhé!
                const rows = table.querySelectorAll("tbody tr");

                rows.forEach(row => {
                    // Lấy ô chứa Trạng thái là cột thứ 5 trong bảng
                    const statusCell = row.querySelector("td:nth-child(5)");
                    if (!statusCell) return;

                    // Lấy chữ viết hoa bên trong cột trạng thái
                    const statusText = statusCell.innerText.trim().toUpperCase();

                    if (statusKey === "all") {
                        row.style.display = ""; // thỏa mãn thì giữ nguyên hiển thị ban đầu
                    }
                    else if (statusKey === "pending" && statusText === "CHỜ XỬ LÝ") {
                        row.style.display = "";
                    }
                    else if (statusKey === "shipping" && statusText === "ĐANG GIAO") {
                        row.style.display = "";
                    }
                    else if (statusKey === "done" && statusText === "HOÀN THÀNH") {
                        row.style.display = "";
                    }
                    else {
                        row.style.display = "none"; // Không thỏa mãn thì ẩn dòng đó đi
                    }
                });
            }
        });


        orderControls.prepend(filterTabs);
    }

    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement('main');
    mainContent.className = "main-content"

    mainContent.append(header, stats, table)

    container.append(mainContent);
    
    app.innerHTML = "";
    app.append(container);
};

export default OrdersPage;
