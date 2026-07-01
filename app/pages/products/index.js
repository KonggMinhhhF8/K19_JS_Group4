import { renderHeader, renderStats, renderTable, productHeader} from '../../utils/index.js';
import { get } from '../../api/api.js'

const app = document.getElementById("app");

const ProductsPage = async () => {
    console.log("Products Page");

    const header = await renderHeader({
        type: "product",
        input: true,
        placeholderText: "Tìm tên sản phẩm, mã SKU ...",
        buttons: [
            {
                buttonText: "Thêm sản phẩm",
                buttonIcon: "fas fa-plus",
                buttonClass: "btn-add",
            },
        ]
        
        // extraOptions: {
        //     filterClass: "filter-group",   
        //     dateStart: "2026-01-01",       
        //     dateEnd: "2026-01-24",         
        //     filterText: "Lọc"
        // }
    });

    const stats = await renderStats({
        cardContainer: "stats",
        cards: [
            {
                cardClass: "card",
                cardTitle: "Tổng sản phẩm",
                cardContent: "1240",
                cardContentClass: "value",
                // trend: true,
                // trendText: "12% so với tháng trước",
                // trendStats: "up",
                // trendIcon: "fas fa-arrow-up"
            },  
            {
                cardClass: "card",
                cardTitle: "Sắp hết hàng",
                cardContent: "12"
            },
            {
                cardClass: "card",
                cardTitle: "Danh mục",
                cardContent: "15"
            },
        ]
        
    });
    const getProducts = async (accessToken) => {
        console.log("get products");

        const response = await get("products", accessToken);
        console.log(response);

        return response;
    };
    const data = await getProducts();

    const table = await renderTable(productHeader, data);

    const container = document.createElement("div");
    container.className = "container";

    const mainContent = document.createElement("main");
    mainContent.className = "main-content";

    mainContent.append(header, stats, table);

    container.append(mainContent);

    app.append(container);
};

export default ProductsPage;
