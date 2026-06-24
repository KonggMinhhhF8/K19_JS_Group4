import { renderHeader, renderStats, renderTable, productHeader } from './utils/index.js'

const mainContent = document.querySelector(".main-content")

function init() {
    const productHeader =  renderHeader({
        type: "product",
        placeholderText: "Tìm tên sản phẩm, mã SKU ...",
        buttonText: "Thêm sản phẩm",
        buttonIcon: "fas fa-plus",
        buttonClass: "btn-add",
        // extraOptions: {
        //     filterClass: "filter-group",   
        //     dateStart: "2026-01-01",       
        //     dateEnd: "2026-01-24",         
        //     filterText: "Lọc"
        // }
    });

    const productStats = renderStats({
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

    // const table = renderTable(headers, rows)

    mainContent.append(productHeader, productStats);

}

init();