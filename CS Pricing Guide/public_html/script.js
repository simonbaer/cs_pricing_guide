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
        "scrollY": true,
        "scrollCollapse": true,
        "paging": false,
        "bFilter": true,
        "bInfo": false,
        "ordering": true
    });
    table.columns.adjust().draw();
}

function buildDropdownMenu(array) {
    array.sort(compare);
    for (i = 0; i < array.length; i++)
        $("#country_dropdown").append("<option>" + array[i].name + "</option>");
}

//Helper methods
function percent(decimal) {
    decimal = decimal * 100;
    return decimal.toFixed(2);
}

//Array sorting
function compare(a, b) {
    if (a.name < b.name)
        return -1;
    else
        return 1;
}

//Button attachments
function campaign_status() {
    if ($("#campaign_check").is(":checked"))
        $("#campaign_status").attr("disabled", false);
    else
        $("#campaign_status").attr("disabled", true);
}

//evaluate input on-click
$("#pricing_button").click(function () {
    $("#pricing_button").blur();

    country = $("#country_dropdown option:selected").text();
    merch_type = $("#merchant_type option:selected").text();
    merch_TPV = $("#tpv").val();
    quantity = $("#quantity").val();

    for (var i = 0; i < countries.length; i++) {
        if (country === countries[i].name) {
            debit = countries[i].debit_fee;
            credit = countries[i].credit_fee;
        }
    }

    //fee discount table
    if (merch_TPV < 2499) {
        alert("Merchant is not eligable for a fee discount");
    } else if (merch_TPV > 2500 && merch_TPV < 4999) {
        debit = debit*0.90;
        credit = credit*0.80;
    } else if (merch_TPV > 5000 && merch_TPV < 9999) {
        debit = debit*0.80;
        credit = credit*0.70;
    } else if (merch_TPV > 10000 && merch_TPV < 19999) {
        debit = debit*0.70;
        credit = credit*0.60;
    } else if (merch_TPV > 20000 && merch_TPV < 4000) {
        debit = debit*0.70;
        credit = credit*0.50;
    } else {
        alert("Please contact Business Development");
    }
    console.log(percent(debit) + " " + percent(credit));
    
});