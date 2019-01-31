




$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    let num = [];
    let total = 0;
    foods.forEach((food,index)=> {
      $("<tr>").html(
        `
        <td class="index">${index+1}</td>
        <td class="food">${food.name}</td>
        <td class="price">$${food.price.toString()}</td>
        <td class="minus_button"><button >-</button><td>
        <td class="counter">0</td>
        <td class="add_button"><button>+</button><td>
        `)
        .appendTo($("table"));
      num.push(0);
    })
    
    $(".add_button").click(function(e){
      const i = Number($(e.target).parent().parent().find('.index').text())-1;
      console.log(i);
      num[i] = num[i] + 1;
      $(e.target).parent().parent().find('.counter').text(num[i]);
    });
    $(".minus_button").click(function(e){
      const j = Number($(e.target).parent().parent().find('.index').text())-1;
      num[j] = num[j] - 1;
      $(e.target).parent().parent().find('.counter').text(num[j]);
    });
    
  });
});

