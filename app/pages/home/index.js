// import "../../assets/css/home.css";
import { get, post, deleteById, patch, put } from "../../api/api.js";
import {
    renderHeader,
    renderStats,
    renderTable,
    homeHeader, renderSidebar,
} from "../../utils/index.js";

const app = document.getElementById("app");

const HomePage = async () => {
    console.log("Home Page");
    app.innerHTML = "";
    const header = await renderHeader({
        input: false,
        showButtons: false,
        title: true,
        innerTitle: "Admin",
        iconTitle: "fa-solid fa-user",
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
                cardContent: "12",
            },
        ],
    });

    const getHome = async () => {
        console.log("get home");

        const response = await get("orders");
        // console.log(response);

        return response;
    };

    const data = await getHome();
    const table = await renderTable(
        homeHeader,
        data,
        {
            tableContainer: "table-section",
            tableHeader: "table-title",
            tableBox: "table-wrapper",
        },
        false,
        {
            title: true,
            titleText: "Đơn hàng gần đây",
        },
    );

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats, table);
    const container = document.createElement("div");
    container.className = "container";

    const sidebar = renderSidebar("dashboard");/////////////

    container.append(sidebar, mainContent);
    app.append(container);
};

export default HomePage;
