import router from "../../plugins/router";
export const renderSidebar = (activeId) => {

    const menuItems = [
        { id: "dashboard", text: "Tổng quan", icon: "fas fa-home", path: "" },
        { id: "products", text: "Sản phẩm", icon: "fas fa-box", path: "/products" },
        { id: "orders", text: "Đơn hàng", icon: "fas fa-shopping-cart", path: "/orders" },
        { id: "customers", text: "Khách hàng", icon: "fas fa-users", path: "/customers" },
        { id: "reports", text: "Báo cáo", icon: "fas fa-chart-line", path: "/reports" },
    ];

    const aside = document.createElement("aside");
    aside.className = "sidebar";

    const logo = document.createElement("h2");
    logo.textContent = "ShopAdmin";
    aside.append(logo);

    const ul = document.createElement("ul");

    menuItems.forEach((item) => {
        const li = document.createElement("li");

        if (item.id === activeId) {
            li.classList.add("active");
        }

        const icon = document.createElement("i");
        icon.className = item.icon;

        li.append(icon, ` ${item.text}`);

        // Chuyển trang bằng router
        li.addEventListener("click", () => {
            // Chỉ chuyển trang nếu bấm vào một tab khác tab hiện tại
            if (item.id !== activeId) {
                router.navigate(item.path);
            }
        });

        ul.append(li);
    });

    aside.append(ul);

    return aside;
};

