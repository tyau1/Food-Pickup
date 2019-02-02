

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/foods"
  }).done((foods) => {
    let num = [];
    let total = 0;
    let txt = "";
    foods.forEach((food,index)=> {
      $("<tr>").html(
        `
        <td class="index">${index+1}</td>
        <td class="food">${food.name}</td>
        <td><button class="minus_button">-</button><td>
        <td class="counter">0</td>
        <td><button class="add_button">+</button><td>
        <td class="price">$<a type="number">${food.price}</a></td>
        `)
        .appendTo($("#menu_table"));
      num.push(0);
    })
    $("<div>").html(
      `
        <h3>Total price:$
          <a>0</a>
          <button class="clear_all">clear all</button>

        </h3>

      `)
      .appendTo($("#total_price"));
    

    $(".add_button").click(function(e){
      const i = Number($(e.target).parent().parent().find('.index').text())-1;
      num[i] = num[i] + 1;
      total = Math.round((total + Number($(e.target).parent().parent().find('a').text()))*100)/100

      $('div').find('a').text(total.toString());
      $(e.target).parent().parent().find('.counter').text(num[i]);
    });
    $(".minus_button").click(function(e){
      const j = Number($(e.target).parent().parent().find('.index').text())-1;
      if (num[j]>0){
        num[j] = num[j] - 1;
        total = Math.round((total - Number($(e.target).parent().parent().find('a').text()))*100)/100;

      }else{
        num[j]=0;
      }
      $(e.target).parent().parent().find('.counter').text(num[j]);
      $('div').find('a').text(total.toString());

    });
    $(".clear_all").click(function(e){
      for (let k = 0; k < num.length; k++){
        num[k]=0;
      }
      $('.counter').text(0);
      total = 0;
      $('div').find('a').text(0);
    });
    $(".open").on("click", function () {
      $(".add_button").attr('disabled',true);
      $(".minus_button").attr('disabled',true);
      $(".popup-content").addClass("active");
      foods.forEach((food,index)=>{
        if (num[index]===0){

        }else{
          $("<tr class = 'temp'>").html(
            `
            <td>${food.name}</td>
            <td>amt: ${num[index]}</td>
            `)
            .appendTo($(".order_table"));
            
        }});
        $("<a class = 'temp'>").html(
          `
          Total: $${total}
          `)
          .appendTo($("#order_total"));
      })
    $(".close, .popup").on("click", function () {
      $(".add_button").attr('disabled',false);
      $(".minus_button").attr('disabled',false);
      $(".temp").remove();
      $(".popup, .popup-content").removeClass("active");

    });
    

  });
});

  
  




