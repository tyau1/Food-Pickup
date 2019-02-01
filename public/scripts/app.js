

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
        <td class="price">$<a type="number">${food.price}</a></td>
        <td class="minus_button"><button >-</button><td>
        <td class="counter">0</td>
        <td class="add_button"><button>+</button><td>
        `)
        .appendTo($("table"));
      num.push(0);
    })
    $("<div>").html(
      `
        <h3>Total price:$
          <a>0</a>
          <button class="clear_all">clear all</button>

        </h3>

      `)
<<<<<<< HEAD
      .appendTo($("section"));
=======
      .appendTo($("#total_price"));
>>>>>>> b06256e7834a0512c022d2ffd0e3f4c960b5558c

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

<<<<<<< HEAD

=======
>>>>>>> b06256e7834a0512c022d2ffd0e3f4c960b5558c
  });
});

$(".open").on("click", function () {
$(".popup-content").addClass("active");
});

$(".close, .popup").on("click", function () {
  $(".popup, .popup-content").removeClass("active");
});

$(document).on("load", () => {

  alert("hello")
})
