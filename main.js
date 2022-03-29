var height = 0;
var maxHeight = 0;

var listOfText = [];


async function getNewPicture(limit = 1) {
  let count = 0;
  while (count < limit) {
    count++;
    $.ajax({
      url: "https://thatcopy.pw/catapi/rest/",
      dataType: "json",
      type: "GET",
      success: function (json) {
        $(body).append($("<div>").addClass("image-body").css("background","url('" + json.url + "')"));
      },
      error: function (json) {
        console.error("Erro ao carregar a imagem");
      }
    });
  }
}

async function getNewText(limit = 1) {
  let count = 0;
  while (count < limit) {
    count++;
    $.ajax({
      url: "https://www.boredapi.com/api/activity",
      dataType: "json",
      type: "GET",
      success: function (json) {
        listOfText.push(json.activity);

        if (listOfText.length == 1) {
            $(".home-text p").html(listOfText[0]);
        }
      },
      error: function (json) {
        console.error("Erro ao carregar o texto");
      }
    });
  }
}


$(document).ready(function () {
  height = $("body").height();

  getNewPicture(4);
  getNewText(4);
});


$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  var constScroll = (scroll+(0.5*height))/height;
  var constScrollInt = parseInt(constScroll);
  var page = Math.floor(constScroll);
  $(".home-text p").html(listOfText[page]);

  var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );

  limit = (limit - (3 * height));

  if (scroll > limit) {
    if (limit > maxHeight) {
      maxHeight = limit;

      getNewPicture(3);
      getNewText(3);
    }
  }

  var diffConst = (constScroll - constScrollInt);
  var seno = (1 - Math.abs(diffConst - 0.5)) * 2 - 1;

   $(".home-text").css('opacity', seno);
});