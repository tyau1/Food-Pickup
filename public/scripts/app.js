$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    foods.forEach((food,index)=> {
      $("<tr>").html(
        `
        <td>${index+1}</td>
        <td class="food">${food.name}</td>
        <td class="price">$${food.price.toString()}</td>
        <td><button class="minus_button">-</button><td>
        <td><span class="counter">0</span></td>
        <td><button class="add_button">+</button><td>
        `)
        .appendTo($("table"));
    })
  });
});
