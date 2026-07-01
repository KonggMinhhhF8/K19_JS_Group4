export function renderFilter({
                                 type = "tabs",
                                 options = [],
                                 onFilterChange = () => {}
                             }) {
    if (type === "tabs") {
        const divTabs = document.createElement("div");
        divTabs.className = "tabs";

        options.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.className = `tab ${index === 0 ? "active" : ""}`;
            btn.innerText = opt.label;
            btn.dataset.key = opt.key;

            btn.addEventListener("click", () => {
                divTabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
                btn.classList.add("active");
                onFilterChange(opt.key); // Bắn key ra ngoài để xử lý lọc data
            });

            divTabs.append(btn);
        });
        return divTabs;
    }

    if (type === "select") {
        const selectTag = document.createElement("select");
        selectTag.className = "filter-select";

        options.forEach(opt => {
            const optionTag = document.createElement("option");
            optionTag.value = opt.key;
            optionTag.innerText = opt.label;
            selectTag.append(optionTag);
        });

        selectTag.addEventListener("change", (e) => {
            onFilterChange(e.target.value);
        });
        return selectTag;
    }
}