/*
jQuery(function() {
    var headertext = [],
        headers = document.querySelectorAll("#resTable th, #resTable1 th"),
        tablerows = document.querySelectorAll("#resTable th, #resTable1 th"),
        tablebody = document.querySelector("#resTable tbody, #resTable1 tbody");

    for(var i = 0; i < headers.length; i++) {
        var current = headers[i];
        headertext.push(current.textContent.replace(/\r?\n|\r/,""));
    }
    for (var i = 0, row; row = tablebody.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            col.setAttribute("data-th", headertext[j]);
        }
    }
    if ($(window).width() <= 768) {
        $.each($(".webtable td"), function () {
            var btn = $(this).data('th');
            if (btn == 'undefined') {
                $(this).removeAttr('data-th');
            }
        });
    }
});*/
