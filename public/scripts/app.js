$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    for(food of foods) {
      $("<tr>").html(
        `
        <td class="food">${food.name}</td><td class="price">$${food.price.toString()}</td>
        `)
        .appendTo($("table"));
    }
  });
});
