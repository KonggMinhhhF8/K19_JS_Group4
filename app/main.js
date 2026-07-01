import {
	HomePage,
	LoginPage,
	ProductsPage,
	CustomersPage,
	OrdersPage,
	ReportsPage,
} from "./pages";
import { requireAuth } from "./api/auth.js";
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
