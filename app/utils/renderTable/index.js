export async function renderTable(headers, rows) {
    const div = document.createElement('div');
    const tableContainer = document.createElement("section");
    tableContainer.className = "table-container";

    const tableHeader = document.createElement("div");
    tableHeader.className = "table-header";

    const tableTitle = document.createElement("h3");
    tableTitle.innerText = "Danh mục sản phẩm";

    tableHeader.append(tableTitle);

    const filterHeader = document.createElement("div");
    filterHeader.className = "filters";

    const selectTag = document.createElement("select");
    const optionTag = document.createElement("option");

    optionTag.innerText = "Tất cả danh mục";
    selectTag.append("optionTag");

    tableContainer.append(tableHeader);


    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');

    for(const header of headers) {
        const th = document.createElement("th");
        th.innerText = header.text;
        headerRow.append(th);
    }

    const actionC = document.createElement('th')
    actionC.innerText = 'Thao tác'
    headerRow.append(actionC)
    thead.append(headerRow)

    for(const row of rows) {
        const tr = document.createElement('tr');
        tr.dataset.id = row.id;
        console.log(row);
        
        for (const header of headers) {
            const td = document.createElement('td')
            if(header.formatter) {
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

        const action = document.createElement('td');
        const editBtn = document.createElement("button");
        editBtn.className = "btn-icon edit";

        const editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square";

        editBtn.append(editIcon);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-icon delete";

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "";

        deleteIcon.className = "fa-solid fa-trash";

        deleteBtn.append(deleteIcon);
        
        action.append(editBtn, deleteBtn);
        

        tr.append(action)

        tbody.append(tr)
    }

    table.append(thead)
    table.append(tbody)
    tableContainer.append(table)

    console.log(tableContainer);



    return tableContainer;
}
