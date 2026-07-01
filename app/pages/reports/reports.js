import { get } from "/app/api/api.js";

let revenueChart = null;
let categoryChart = null;

export const formatMoney = (number) => {
	return Number(number).toLocaleString("vi-VN") + "đ";
};

export const formatDay = (date) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	return `${day}/${month}`;
};

export const loadReport = async () => {
	const orders = await get("orders");
	const customers = await get("customers");
	const products = await get("products");

	console.log("orders =", orders);
	console.log("customers =", customers);

	if (!orders || !customers) return;

	renderStatistic(orders, customers);
	renderRevenueChart(orders);
	renderCategoryChart(products);
	renderTopProducts(orders);
};

export const renderStatistic = (orders, customers) => {
	let revenue = 0;

	orders.forEach((order) => {
		if (order.status === "done") {
			revenue += order.product.price * order.amount;
		}
	});

	const profit = revenue * 0.3;

	document.querySelector(
		".stats-grid .stat-card:nth-child(1) .value",
	).textContent = formatMoney(revenue);

	document.querySelector(
		".stats-grid .stat-card:nth-child(2) .value",
	).textContent = orders.length;

	document.querySelector(
		".stats-grid .stat-card:nth-child(3) .value",
	).textContent = formatMoney(profit);

	document.querySelector(
		".stats-grid .stat-card:nth-child(4) .value",
	).textContent = customers.length;
};

export const renderRevenueChart = (orders) => {
	console.log("renderRevenueChart");
	const revenueByDate = {};

	orders.forEach((order) => {
		if (order.status !== "done") return;

		const date = order.date;

		if (!revenueByDate[date]) {
			revenueByDate[date] = 0;
		}

		revenueByDate[date] += order.product.price * order.amount;
	});

	const dates = Object.keys(revenueByDate).sort().slice(-7);

	const labels = [];
	const data = [];

	dates.forEach((date) => {
		labels.push(formatDay(new Date(date)));
		data.push(revenueByDate[date]);
	});

	if (revenueChart) {
		revenueChart.destroy();
	}

	const ctx = document.getElementById("revenueChart");

	revenueChart = new Chart(ctx, {
		type: "line",
		data: {
			labels,
			datasets: [
				{
					label: "Doanh thu (VNĐ)",
					data,
					borderColor: "#3498db",
					backgroundColor: "rgba(52, 152, 219, 0.1)",
					fill: true,
					tension: 0.4,
				},
			],
		},
	});
};

export const renderCategoryChart = (products) => {
	const categoryData = {};

	products.forEach((product) => {
		const category = product.category.name;

		if (!categoryData[category]) {
			categoryData[category] = 0;
		}

		categoryData[category]++;
	});

	const labels = Object.keys(categoryData);
	const data = Object.values(categoryData);

	if (categoryChart) {
		categoryChart.destroy();
	}

	const ctx = document.getElementById("categoryChart");

	categoryChart = new Chart(ctx, {
		type: "doughnut",
		data: {
			labels,
			datasets: [
				{
					data,
					backgroundColor: [
						"#3498db",
						"#2ecc71",
						"#f1c40f",
						"#9b59b6",
						"#e74c3c",
						"#1abc9c",
						"#e67e22",
					],
				},
			],
		},
	});
};

export const renderTopProducts = (orders) => {
	const products = {};

	orders.forEach((order) => {
		if (order.status !== "done") return;
		const id = order.product.id;

		if (!products[id]) {
			products[id] = {
				name: order.product.name,
				sold: 0,
				revenue: 0,
				remaining: order.product.remaining,
			};
		}

		products[id].sold += order.amount;
		products[id].revenue += order.product.price * order.amount;
	});

	const list = Object.values(products);

	list.sort((a, b) => b.sold - a.sold);

	const tbody = document.querySelector(".top-products tbody");

	tbody.innerHTML = "";

	list.slice(0, 5).forEach((product) => {
		tbody.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.sold}</td>
            <td>${formatMoney(product.revenue)}</td>
            <td>
                <span style="color:${
					product.remaining <= 10 ? "var(--danger)" : "var(--success)"
				}">
                    ${product.remaining <= 10 ? "Sắp hết" : "Còn hàng"}
                </span>
            </td>
        </tr>
        `;
	});
};
