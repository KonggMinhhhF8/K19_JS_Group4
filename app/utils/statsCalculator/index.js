export const getStatsConfig = (pageType, apiData = []) => {
    const data = Array.isArray(apiData) ? apiData : [];

    switch (pageType) {
        // TÍNH TOÁN CHO TRANG KHÁCH HÀNG
        case "customers": {
            const totalCustomers = data.length;
            return [
                { cardClass: "card", cardTitle: "Tổng khách hàng", cardContent: totalCustomers.toString() },
                { cardClass: "card", cardTitle: "Khách hàng mới (Tháng)", cardContent: "6" },
                { cardClass: "card", cardTitle: "Tỉ lệ quay lại", cardContent: "66%" }
            ];
        }

        // TÍNH TOÁN CHO TRANG SẢN PHẨM
        case "products": {
            const totalProducts = data.length;
            const lowStockCount = data.filter(p => p.remaining !== undefined && p.remaining <= 10).length;
            const totalCategories = new Set(
                data.filter(p => p.category && p.category.id).map(p => p.category.id)
            ).size;

            return [
                { cardClass: "card", cardTitle: "Tổng sản phẩm", cardContent: totalProducts.toString() },
                { cardClass: "card", cardTitle: "Sắp hết hàng", cardContent: lowStockCount.toString(), cardContentClass: "text-danger" },
                { cardClass: "card", cardTitle: "Danh mục", cardContent: totalCategories.toString() }
            ];
        }

        // TÍNH TOÁN CHO TRANG ĐƠN HÀNG
        case "orders": {
            const totalOrders = data.length;

            // Đang xử lý sẽ gộp các đơn chờ xử lý (pending) và đang giao (shipping/delivering)
            const pendingCount = data.filter(o => o.status === "pending" || o.status === "shipping" || o.status === "delivering").length;
            //  Đơn hàng hoàn thành
            const successCount = data.filter(o => o.status === "done").length;
            //  Đơn hàng bị hủy (cancel)
            const cancelCount = data.filter(o => o.status === "cancel").length;

            return [
                { cardClass: "card blue", cardTitle: "Tổng đơn hàng", cardContent: totalOrders.toLocaleString(), cardContentClass: "value" },
                { cardClass: "card orange", cardTitle: "Đang xử lý", cardContent: pendingCount.toString() },
                { cardClass: "card green", cardTitle: "Thành công", cardContent: successCount.toString() },
                { cardClass: "card red", cardTitle: "Đã hủy", cardContent: cancelCount.toString() }
            ];
        }

        default:
            return [];
    }
};