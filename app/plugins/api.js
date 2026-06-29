async function getProduct() {
    try {
        const response = await fetch('https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/products', {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyNzM3MTcwLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyNzM2NTcwLCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.P2IeRjEG1fGKerRy62-P2V5qOC3XUWPPwANSOzh00Sw",
            }
        });
        return await response.json();
    } catch {
        alert('get data failed');
    }
}

export { getProduct }