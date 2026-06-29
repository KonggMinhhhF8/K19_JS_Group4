async function getProduct() {
    try {
        const response = await fetch('https://wo365ovs53.execute-api.ap-southeast-1.amazonaws.com/products', {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrMTgtc3RvcmUiLCJzdWIiOiIxIiwiZXhwIjoxNzgyNTgyMjczLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgyNTgxNjczLCJlbWFpbCI6ImJhbmd0eEB0ZXN0LmNvbSJ9.XeDrEoK8bNWXuvwWls3Qfpyu7g4CdVTrOcZRwJySvlY",
            }
        });
        return await response.json();
    } catch {
        alert('get data failed');
    }
}

export { getProduct }