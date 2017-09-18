/* 
 * Customer Service tool for generating consistent price offerings to client requests
 */

//Constructor to create multiple 'Country' objects
function Country(name, debit, credit, price, curr) {
  this.name = name;
  this.debit_fee = debit;
  this.credit_fee = credit;
  this.device_price = price;
  this.currency = curr;
}

//Country object declarations
var AT = new Country("Austria", 0.0095, 0.0250, 79, "€");
var BE = new Country("Belgium", 0.0195, 0.0195, 79, "€");
var CH = new Country("Switzerland", 0.0150, 0.0250, 99, "CHF");
var DE = new Country("Germany", 0.0095, 0.0275, 79, "€");
var ES = new Country("Spain", 0.0150, 0.0150, 79, "€");
var FR = new Country("France", 0.0095, 0.0275, 79, "€");
var IT = new Country("Italy", 0.0195, 0.0195, 79, "€");
var NL = new Country("Netherlands", 0.0275, 0.0275, 79, "€");
var PL = new Country("Poland", 0.0149, 0.0149, 299, "zł");
var PT = new Country("Portugal", 0.0195, 0.0195, 79, "€");
var SE = new Country("Sweden", 0.0190, 0.0190, 799, "kr");
var UK = new Country("United Kingdom", 0.0195, 0.0195, 59, "£");
var US = new Country("United States", 0.0275, 0.0275, 69, "$");

//Array of countries
var countries = [AT, BE, CH, DE, ES, FR, IT, NL, PL, PT, SE, UK, US];
countries.sort(compare);

//function calls in order
buildDropdownMenu(countries);
buildHeadlineTable(countries);

function buildHeadlineTable(array) {
  for (i = 0; i < array.length; i++) {
      $("tbody").append("<tr><th scope='row'>" + array[i].name + "</th>" +
              "<td>" + percent(array[i].debit_fee) + "%" + "</td>" +
              "<td>" + percent(array[i].credit_fee) + "%" + "</td>" +
              "<td>" + array[i].device_price + " " + array[i].currency + "</td>");
      $("td").append("</tr>");
  }

  table = $('#headline').DataTable({
      "scrollY": "180px",
      "scrollCollapse": false,
      "paging": false,
      "bFilter": true,
      "bInfo": true,
      "ordering": true
  });
  table.columns.adjust().draw();
}

function buildDropdownMenu(array) {
  for (i = 0; i < array.length; i++)
      $("#country_dropdown").append("<option>" + array[i].name + "</option>");
}

//calculate special fee and reader prices
function evaluatePricing(array) {
  country = $("#country_dropdown option:selected").text();
  merchant_type = $("#merchant_type option:selected").text();
  tpv = $("#tpv").val();
  quantity = $("#quantity").val();
  if ($("#campaign_status select option:selected").text() === "Yes") {
      campaign_price = $("#campaign_price input").val();
  } else {
      campaign_price = -1;
  }

  for (i = 0; i < array.length; i++) {
      if (array[i].name === country.toString()) {
          this.debit_fee = array[i].debit_fee;
          this.credit_fee = array[i].credit_fee;
          this.device_price = array[i].device_price;
          this.currency = array[i].currency;
          console.log(this.debit_fee + " " + this.credit_fee + " " + this.device_price + " " + this.currency);
      }
      alert('here');
  }
  
  //discounted device price
  if (campaign_price !== -1) {
      lowest_price = campaign_price;
  } else {
      lowest_price = this.device_price;
  }
  //discounted fees
}

//Helper methods
function percent(decimal) {
  decimal = decimal * 100;
  return decimal.toFixed(2);
}

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

//not working
$("#pricing_button").click(function (array) {
  $("#pricing_button").blur();
  evaluatePricing(array);
});