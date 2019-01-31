$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    for(food of foods) {
      $("<tr>").text(food.name).appendTo($("table"));
      $("<tr>").text(food.price.toString()).appendTo($("table"));
    }
  });;
});
