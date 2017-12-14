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
    console.log(classe);
    r[++j] = '<table id="cardsMainTable"><thead><tr><th>Name</th><th>Set</th><th>Type</th><th>Class</th><th>Cost</th></tr></thead><tbody>';
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
    console.log(r.join(''));
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