/* 
 * Customer Service tool for generating consistent price offerings to client requests
 */

//global array variables
var countries = [];
var pricing = [];

//Parse JSON to array of countries
$.getJSON("data.json", function (data) {
    countries = data;
    buildDropdownMenu(countries);
    buildHeadlineTable(countries);
});

function buildHeadlineTable(array) {
    for (var i = 0; i < array.length; i++) {
        $("#standard").append(
                "<tr><th scope='row'>" +
                array[i].name +
                "</th>" +
                "<td>" +
                percent(array[i].debit_fee) +
                "%</td>" +
                "<td>" +
                percent(array[i].credit_fee) +
                "%</td>" +
                "<td>" +
                array[i].device_price +
                " " +
                array[i].currency +
                "</td>"
                );
        $("td").append("</tr>");
    }

    table = $("#headline").DataTable({
        scrollY: true,
        scrollCollapse: true,
        paging: false,
        bFilter: true,
        bInfo: false,
        ordering: true
    });
    table.columns.adjust().draw();
}

function buildDropdownMenu(array) {
    array.sort(compare);
    for (i = 0; i < array.length; i++)
        $("#country_dropdown").append("<option>" + array[i].name + "</option>");
}

//Button attachments
function campaign_status() {
    if ($("#campaign_check").is(":checked"))
        $("#campaign_status").attr("disabled", false);
    else
        $("#campaign_status").attr("disabled", true);
}

//clear form
$("#clear").click(function () {
    $(".alert").alert("close");
    $("#tpv").val("");
    $("#quantity").val("");
    $("#campaign_status").attr("disabled", true);
    $("#campaign_check").attr("checked", false);
    $("#result tr").remove();
});

//evaluate input on-click
$("#pricing_button").click(function () {
    $("#pricing_button").blur();
    $(".alert").alert("close");

    var country = $("#country_dropdown option:selected").text();
    var merch_type = $("#merchant_type option:selected").text();
    var merch_TPV = parseInt($("#tpv").val());
    var debit_fee = 0;
    var credit_fee = 0;
    var lowest_credit_fee = 0;
    var nth_device_price = 0;
    var quantity = 0;

    if ($("#quantity").val() === "") {
        quantity = 0;
    } else {
        quantity = parseInt($("#quantity").val());
    }


    for (var i = 0; i < countries.length; i++) {
        if (country === countries[i].name) {
            debit_fee = countries[i].debit_fee;
            credit_fee = countries[i].credit_fee;
            lowest_credit_fee = countries[i].lowest_credit_fee;
        }
    }

    //load fee discount to array
    $.getJSON("pricing.json", function (data) {
        pricing = data;
        var suggested_credit_fee = 0;
        var suggested_debit_fee = 0;


        for (var i = 0; i < pricing.length; i++) {
            benchmark = parseInt(pricing[i]["tpv"]);

            if (merch_TPV < 2000) {
                alert("TPV too low!");
                break;
            } else if (benchmark >= merch_TPV) {
                suggested_credit_fee =
                        credit_fee * (pricing[i - 1]["fee"] / pricing[0]["fee"]);

                if (suggested_credit_fee < lowest_credit_fee) {
                    suggested_credit_fee = lowest_credit_fee;
                }

                $("#result").append(
                        "<tr><th scope='row'>" +
                        country +
                        "</th>" +
                        "<td>" +
                        merch_type +
                        "</td><td>" +
                        merch_TPV +
                        "</td><td>" +
                        percent(debit_fee) +
                        " %</td><td>" +
                        percent(suggested_credit_fee) +
                        " %</td><td>" +
                        quantity +
                        "</td><td>" +
                        nth_device_price +
                        "</td></tr>"
                        );
                break;
            } else if (merch_TPV > 50000) {
                alert("Please contact BizDev!");
                break;
            }
        }
    });
});

//Helper methods
//convert decimal to percentage
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