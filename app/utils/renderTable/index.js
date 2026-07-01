export function renderTable(
    headers,
    rows,
    onEdit,
    onDelete,
    tableClass = {
        tableContainer: "table-container",
        tableHeader: "table-header",
        tableBox: "",
    },
    action = true,
    extraConfig = {
        title: false,
        titleText: "Danh mục sản phẩm",
        tabs: false,
        tabsConfig: [
            { key: "all", label: "Tất cả" },
            { key: "pending", label: "Chờ xử lý" },
            { key: "shipping", label: "Đang giao" },
            { key: "done", label: "Đã xong" },
        ],
        date: false,
    },
) {
    if (!headers || !rows) {
        console.log("RenderTable: headers or rows does not exist");
        return;
    }

    const tableContainer = document.createElement("section");
    tableContainer.className = tableClass.tableContainer;

    const tableHeader = document.createElement("div");
    tableContainer.append(tableHeader);

    if (extraConfig.title) {
        tableHeader.className = tableClass.tableHeader;

        const tableTitle = document.createElement("h3");
        tableTitle.innerText = extraConfig.titleText;
        tableHeader.append(tableTitle);
    }

    if (extraConfig.tabs) {
        const divTabs = document.createElement("div");
    }

    if (extraConfig.date) {
        tableHeader.className = tableClass.tableHeader;
        const divDate = document.createElement("div");
        divDate.className = "date-filter";

        const inputDate = document.createElement("input");
        inputDate.type = "date";
        Object.assign(inputDate.style, {
            padding: "5px",
            border: "1px solid #ddd",
            borderRadius: "5px",
        });

        divDate.append(inputDate);
        tableHeader.append(divDate);
    }

    const filterHeader = document.createElement("div");
    filterHeader.className = "filters";

    const selectTag = document.createElement("select");
    const optionTag = document.createElement("option");

    optionTag.innerText = "Tất cả danh mục";
    selectTag.append("optionTag");

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    for (const header of headers) {
        const th = document.createElement("th");
        th.innerText = header.text;
        headerRow.append(th);
    }

    if (action) {
        const actionC = document.createElement("th");
        actionC.innerText = "Thao tác";
        headerRow.append(actionC);
    }
    thead.append(headerRow);

    for (const row of rows) {
        const tr = document.createElement("tr");
        tr.dataset.id = row.id;
        console.log(row);

        for (const header of headers) {
            const td = document.createElement("td");
            if (header.formatter) {
                const content = header.formatter(row);
                if (content instanceof Node) {
                    td.append(content);
                } else {
                    td.innerText = content;
                }
            } else {
                td.innerText = row[header.key] ?? "";
            }
            tr.append(td);
        }

        if (action) {
            const action = document.createElement("td");
            const editBtn = document.createElement("button");
            editBtn.className = "btn-icon edit";

            editBtn.addEventListener("click", () => {
                if (onEdit) {
                    onEdit(row);
                }
            });

            const editIcon = document.createElement("i");
            editIcon.className = "fa-solid fa-pen-to-square";

            editBtn.append(editIcon);

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-icon delete";

            deleteBtn.addEventListener("click", () => {
                if (onDelete) {
                    onDelete(row);
                }
            });

            const deleteIcon = document.createElement("i");
            deleteIcon.className = "";

            deleteIcon.className = "fa-solid fa-trash";

            deleteBtn.append(deleteIcon);

            action.append(editBtn, deleteBtn);

            tr.append(action);
        }

        tbody.append(tr);
    }

    table.append(thead);
    table.append(tbody);

    if (tableClass.tableBox) {
        const divTable = document.createElement("div");
        divTable.className = tableClass.tableBox;
        divTable.append(table);
        tableContainer.append(divTable);
    } else {
        tableContainer.append(table);
    }

    console.log(tableContainer);

    return tableContainer;
}
