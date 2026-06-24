export async function renderTable(headers, rows) {
    const div = document.createElement('div');

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
    actionC.innerText = 'Action'
    headerRow.append(actionC)
    thead.append(headerRow)

    for(const row of rows) {
        const tr = document.createElement('tr');
        tr.dataset.id = row.id;

        for (const header of headers) {
            const td = document.createElement('td')
            td.innerText = row[header.key]
            tr.append(td)
        }

        const action = document.createElement('td')
        action.innerHTML = `
        <label for="popup-toggle" class="action-icon edit-action" title="Edit">✎</label>
        <span class="action-icon delete-action" title="Delete">🗑</span>
        `
        action.classList = 'actions'

        tr.append(action)

        tbody.append(tr)
    }

    table.append(thead)
    table.append(tbody)
    div.append(table)

    return div;


}