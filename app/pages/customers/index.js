import "../../assets/css/customers.css";
import { isAuthenticated } from "../../api/auth.js";
import router from "../../plugins/router.js";

import { get, post, deleteById, patch, put } from "../../api/api.js";
import { renderHeader, renderStats, renderTable, customerHeader} from '../../utils/index.js';
const app = document.getElementById("app");

const CustomersPage = async () => {

    console.log("Customers Page");

    const header = await renderHeader({
        input: true,
        placeholderText: "Tìm tên, email hoặc số điện thoại",
        buttons: [
            {
                buttonText: "Thêm khách hàng",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            }
        ]
        
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

        const response = await get("customers", accessToken);
        console.log(response);

        return response;
    };

    const data = await getCustomers();

    const table = await renderTable(customerHeader, data);


    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats, table);

    container.append(mainContent)

    app.append(container);

    const btnAddCustomer = document.querySelector(".btn-add");
    btnAddCustomer.addEventListener("click", () => {
        router.navigate("/customers/create");
        router.resolve();
    });

};

export default CustomersPage;
