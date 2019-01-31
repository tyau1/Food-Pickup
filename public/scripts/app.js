$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    for(food of foods) {
      $("<th>").text(food.name).appendTo($("tr"));
      $("<th>").text(food.price).appendTo($("tr"));
    }
  });;
});
