
function callModel() {
    ko.applyBindings(new viewModel());
}
function viewModel() {
    var self = this;
    self.UsersList = ko.observableArray([]);
    self.GetUsers = function () {
        $.ajax({
            type: "GET",
            url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary?collectible=1",
            headers: { "X-Mashape-Key": "p6Ys0K8EDdmshAstxk60HDBJXIMBp1oRuqSjsnA8NqS2NCEFUv", "Accept": "text/plain" },
            dataType: "json",
            success: function (data) {
                self.UsersList($.map(data, function (item) {
                    return new ViewModelDetail(item);
                }));
            }
        });
    }

    self.GetUsers();
}
function ViewModelDetail(data) {
    console.log(data);
    var self = this;
    self.Name = ko.observable(data.name);
    self.Type = ko.observable(data.type);
    self.CardSet = ko.observable(data.cardSet);
    self.PlayerClass = ko.observable(data.playerClass);
    self.Cost = ko.observable(data.cost);
    self.Image = ko.observable(data.imgGold);
    self.ID = ko.observable(data.cardId);
    self.imageAppearBind = function(){
        imageAppearTs(data.cardId);
    }
    self.imageDisappearBind = function(){
        imageDisappearTs(data.cardId);
    }
}
function imageAppearTs(card) {  
    $("#"+card).css('visibility', 'visible');
}
function imageDisappearTs(card) {
    $("#"+card).css('visibility', 'hidden');
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

function classFilterTs(classe){
    $("table#cardsMainTable tr").each(function (i) {
       var show = false;
        $("td", this).each(function (j) {

            if(j===3 && ( $(this).text()===classe || classe ===undefined)){
                show = true;
            }

        })
        if(show){
            $("#trMain").show();
            $(this).show();
        }
        else{
            $("#trMain").show();
            $(this).hide();
        }
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
                        bName = true;
                    }
                    break;
                case 1:
                    //expansion
                    if (arr[1] === $(this).text() || arr[1] === "All Updates") {
                        bExp = true;
                    }
                    break;
                case 2:
                    //type
                    if (arr[2] === $(this).text() || arr[2] === "All types") {
                        bType = true;
                    }
                    break;
                case 3:
                    //classes
                    
                    if (arr[3] === $(this).text() || arr[3] === "Classes") {
                        bClass = true;
                    }
                    break;
                case 4:
                    //cost
                    if (arr[4].toString() === $(this).text() || arr[4].toString() === "") {
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
