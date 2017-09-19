/* 
 * Customer Service tool for generating consistent price offerings to client requests
 */

var countries = [];

//Parse JSON to array of countries
$.getJSON("country_data.json", function (data) {
    countries = data;
    buildDropdownMenu(countries);
    buildHeadlineTable(countries);
});

function buildHeadlineTable(array) {
    for (i = 0; i < array.length; i++) {
        $("tbody").append("<tr><th scope='row'>" + array[i].name + "</th>" +
                "<td>" + percent(array[i].debit_fee) + "%" + "</td>" +
                "<td>" + percent(array[i].credit_fee) + "%" + "</td>" +
                "<td>" + array[i].device_price + " " + array[i].currency + "</td>");
        $("td").append("</tr>");
    }

    table = $('#headline').DataTable({
        //"scrollY": "180px",
        "scrollCollapse": false,
        "paging": false,
        "bFilter": true,
        "bInfo": false,
        "ordering": true
    });
    table.columns.adjust().draw();
}

function buildDropdownMenu(array) {
    for (i = 0; i < array.length; i++)
        $("#country_dropdown").append("<option>" + array[i].name + "</option>");
}

//Helper methods
function percent(decimal) {
    decimal = decimal * 100;
    return decimal.toFixed(2);
}

//Button attachments
function campaign_status() {
    if ($("#campaign_check").is(":checked"))
        $("#campaign_status").attr("disabled", false);
    else
        $("#campaign_status").attr("disabled", true);
}

//not working
$("#pricing_button").click(function (array) {
    $("#pricing_button").blur();
    evaluatePricing(array);
});