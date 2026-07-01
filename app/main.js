import {
    HomePage,
    LoginPage,
    ProductsPage,
    CustomersPage,
    CreateCustomerPage,
    OrdersPage,
    ReportsPage,
} from "./pages";
import { isAuthenticated, requireAuth } from "./api/auth.js";
import router from "./plugins/router.js";
import "./assets/css/style.css";
import "./assets/css/reports.css";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

router.on("", function () {
	requireAuth(() => {
		HomePage();
	});
});

router.on("/login", function () {
    if (isAuthenticated()) {
        router.navigate("/");
        return;
    }
    LoginPage();
});

router.on("/products", function () {
	requireAuth(() => {
		ProductsPage();
	});
});

router.on("/customers", function () {
	requireAuth(() => {
		CustomersPage();
	});
});

router.on("/customers/create", function () {
    requireAuth(() => {
        CreateCustomerPage();
    });
});

router.on("/orders", function () {
	requireAuth(() => {
		OrdersPage();
	});
});

router.on("/reports", function () {
	requireAuth(() => {
		ReportsPage();
	});
});

router.resolve();
