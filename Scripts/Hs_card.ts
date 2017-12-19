
/*function cardsTs(classe) {
    $.ajax({
        url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary?collectible=1",
        headers: { "X-Mashape-Key": "p6Ys0K8EDdmshAstxk60HDBJXIMBp1oRuqSjsnA8NqS2NCEFUv", "Accept": "text/plain" },
        // dataType: "html",
        success: function (data) {
            console.log(data);
            outputDocumentTs(data, classe);
        },
        error: function (data) {
            console.log(data);
        }
    });
}*/
/*function applyBinding(){
    ko.applyBindings(new viewModel());
}*/

function callModel(){
    ko.applyBindings(new viewModel());
}
function viewModel() {
    var self = this;
    self.UsersList = ko.observableArray([]);

    //self.CardListKo = ko.observableArray([]);
    self.GetUsers = function () {
        $.ajax({
            type: "GET",
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary?collectible=1",
            headers: { "X-Mashape-Key": "p6Ys0K8EDdmshAstxk60HDBJXIMBp1oRuqSjsnA8NqS2NCEFUv", "Accept": "text/plain" },
            dataType: "json",
            success: function (data) {  
                self.UsersList($.map(data, function (item) {
                    console.log(data);
                    return new ViewModelDetail(item);
                  }));
                }
              });
    }

    self.GetUsers();
}
function ViewModelDetail(data){
   var self = this;
   self.Name = ko.observable(data.name);
   self.Type = ko.observable(data.type);
   self.CardSet = ko.observable(data.cardSet);
   self.PlayerClass = ko.observable(data.playerClass);
   self.Cost = ko.observable(data.cost);
   self.Img = ko.observable(data.imgGold);
}
/*function outputDocumentTs(data, classe) {
    
}
/*function outputDocumentTs(data, classe) {
  var r = new Array();
  var j = -1, recordId;
  var s = new Array();
  var z = -1;
  r[++j] = '<table id="cardsMainTable"><thead><tr id="trMain"><th>Name</th><th>Set</th><th>Type</th><th>Class</th><th>Cost</th></tr></thead><tbody>';

  for (var i in data) {
      var d = data[i];
      if (d.playerClass === classe || classe === undefined) {
          r[++j] = '<tr id="';
          r[++j] = d.cardId;
          r[++j] = '" class="legendaryCards"><td onmouseover=imageAppearTs("';
          r[++j] = d.cardId;
          r[++j] = '") onmouseout=imageDisappearTs("';
          r[++j] = d.cardId;
          r[++j] = '")>';
          r[++j] = d.name;
          r[++j] = '</td><td>';
          r[++j] = d.cardSet;
          r[++j] = '</td><td>';
          r[++j] = d.type;
          r[++j] = '</td><td>';
          r[++j] = d.playerClass;
          r[++j] = '</td><td>';
          r[++j] = d.cost;
          r[++j] = '</td></tr>';
          r[++j] = '<div class="helloCards"><img class ="imgCardClass" src="';
          r[++j] = d.imgGold;
          r[++j] = '" id="img_';
          r[++j] = d.cardId;
          r[++j] = '" style ="visibility:hidden;"/></div>';
      }
  }
  r[++j] = '</tbody></table>';
  //$('#tableBody').append(s.join(''));
  $('#documentRows').html(r.join(''));
}*/

function imageAppearTs(card) {
    //document.getElementById("img_"+card).style.visibility="visible";  
    $("#img_" + card).css('visibility', 'visible');
}
function imageDisappearTs(card) {
    //document.getElementById("img_"+card).style.visibility="hidden";
    $("#img_" + card).css('visibility', 'hidden');
}
function searchFunctionTs() {
    $("table#cardsMainTable tr").each(function (i) {
        var find = false;
        $("td", this).each(function (j) {

            var s = "" + $("#search").val();
            console.log(s.toUpperCase());
            if (($(this).text().toUpperCase().indexOf(s.toUpperCase())) > -1) {
                find = true;
            }

            if (find) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        })
    });
}

function setFilterTs() {
    var name = $("#cardName").val();
    var expansion = $("#expansions option:selected").text();
    var classes = $("#class option:selected").text();
    var type = $("#cardTypes option:selected").text();
    var cost = $("#cost").val();

    var arr = [];

    arr.push(name);
    arr.push(expansion);
    arr.push(type);
    arr.push(classes);
    arr.push(cost);

    $("table#cardsMainTable tr").each(function (i) {
        var find = false;
        var bName = false, bExp = false, bClass = false, bType = false, bCost = false;
        $("td", this).each(function (j) {
            switch (j) {
                case 0:
                    //name
                    if (arr[0] === undefined || ($(this).text().toUpperCase().indexOf(arr[j].toUpperCase())) > -1) {
                        console.log("0")
                        bName = true;
                    }
                    break;
                case 1:
                    //expansion
                    if (arr[1] === $(this).text() || arr[1] === "All Updates") {
                        console.log("1")
                        bExp = true;

                    }
                    break;
                case 2:
                    //type
                    if (arr[2] === $(this).text() || arr[2] === "All types") {
                        console.log("2")
                        bClass = true;
                    }
                    break;
                case 3:
                    //classes
                    if (arr[3] === $(this).text() || arr[3] === "Classes") {
                        console.log("3")
                        bType = true;
                    }
                    break;
                case 4:
                    //cost
                    if (arr[4].toString() === $(this).text() || arr[4].toString() === "") {
                        console.log("4")
                        bCost = true;
                    }
                    break;
            }


        })
        if (bName && bExp && bClass && bType && bCost) {
            $("#trMain").show();
            $(this).show();

        } else {
            $(this).hide();
        }
    });


}
