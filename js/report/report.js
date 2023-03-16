async function fetchReportData() {
    return fetch('http://127.0.0.1:5000/report/')
        .then(response => response.json());
}

function renderMonthlySalesChart(data) {
    new Chart(document.getElementById('monthly-sales'), {
        type: 'bar',
        data: {
            labels: data.map(element => element.month),
            datasets: [{
                label: 'Monthly Sales',
                data: data.map(element => element.total),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });

}

function renderBestCustomers(data) {
    let template = $("#best_customers_template")[0].innerHTML
    $("#best-customers").append(Mustache.render(template, data));
}

function renderMostRequestedIngredients(data) {
    let template = $("#most-requested-ingredients-template")[0].innerHTML
    $("#most-requested-ingredients").append(Mustache.render(template, data));
}

async function renderReport() {
    let data = await fetchReportData();
    renderMonthlySalesChart(data.orders_by_month);
    renderBestCustomers(data.best_customers);
    renderMostRequestedIngredients(data.most_requested_ingredient);

}


window.onload = renderReport;