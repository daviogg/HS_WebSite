//valori form  
function cards(classe) {
    $.ajax({
        url: "https://omgvamp-hearthstone-v1.p.mashape.com/cards/qualities/Legendary?collectible=1",
        headers: { "X-Mashape-Key": "p6Ys0K8EDdmshAstxk60HDBJXIMBp1oRuqSjsnA8NqS2NCEFUv", "Accept": "text/plain" },
        // dataType: "html",
        success: function (data) {
            console.log(data);
            outputDocument(data, classe);
        },
        error: function (data) {
            console.log(data);
        }
    });
}
function outputDocument(data, classe) {
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
            r[++j] = '" class="legendaryCards"><td onmouseover=imageAppear("';
            r[++j] = d.cardId;
            r[++j] = '") onmouseout=imageDisappear("';
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
}
function imageAppear(card) {
    //document.getElementById("img_"+card).style.visibility="visible";  
    $("#img_" + card).css('visibility', 'visible');
}
function imageDisappear(card) {
    //document.getElementById("img_"+card).style.visibility="hidden";
    $("#img_" + card).css('visibility', 'hidden');
}
function searchFunction() {
    $("table#cardsMainTable tr").each(function (i) {
        var find = false;
        $("td", this).each(function (j) {
            if (($(this).text().toUpperCase().indexOf($("#search").val().toUpperCase())) > -1) {
                find = true;
            }
            /*console.log("".concat("row: ", i, ", col: ", j, ", value: ", $(this).text()));*/
            if (find) {
                $(this).parent().show();
            } else {
                $(this).parent().hide();
            }
        })
    });
    /*var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("cardsMainTable");
    tr = table.getElementsByTagName("tr");
    /*for (i = 0; i < tr.length; i++) {
        console.log("numero di tr" + tr);
        td = tr[i].getElementsByTagName("td");
        console.log(td.length);
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }*/
}

function setFilter() {
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
        if ( bName && bExp && bClass && bType && bCost) {
            $("#trMain").show();
            $(this).show();

        }else{
            $(this).hide();
        }
    });


}