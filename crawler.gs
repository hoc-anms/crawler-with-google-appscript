Date.prototype.fTime = function() {
    // dd-mm-yyyy;
    return this.getDate() + "-" + (this.getMonth() + 1) + "-" + this.getFullYear();
}
Date.prototype.fmTime = function() {
    // dd-mm-yyyy;
  return `${ this.getFullYear()}-${this.getMonth() + 1 < 10 ? 0 :""}${ this.getMonth() + 1 }-${this.getDate() < 10 ? 0 : "" }${this.getDate()}`;
}

function formatDate ( date ) {
  return `${ date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 :""}${ date.getMonth() + 1 }-${date.getDate() < 10 ? 0 : "" }${date.getDate()}`;
}

var $;

function getGS(pos) {
    var root = $("#result_tab_mb");
    return "'"+root.find("[id*=rs_" + pos + "_]").map(function(i, v) {
        return $(this).text();
    }).get().join(",");
}

function crawl(date, isBack) {

    var resDate = formatDate(date);
    var content = UrlFetchApp.fetch('http://ketqua.net/xo-so-truyen-thong.php?ngay=' + date.fTime());
    var html = content.getContentText();
    if (html) {

        $ = Cheerio.load(html);

        const root = $("#result_tab_mb");

        if (root) {

            var gs = {
                "g0": getGS(0),
                "g1": getGS(1),
                "g2": getGS(2),
                "g3": getGS(3),
                "g4": getGS(4),
                "g5": getGS(5),
                "g6": getGS(6),
                "g7": getGS(7)
            }

            // save
            var excel = SpreadsheetApp.getActive();
            var sheet = excel.getSheets()[0];

            var time = root.find("#result_date").text();
            var dayName = time.split("ngày")[0];
        

            var rowContent = [(dayName || "--").toString().trim(), resDate.toString().trim(), gs.g0.toString(), gs.g1, gs.g2, gs.g3, gs.g4, gs.g5, gs.g6, gs.g7];

            if (isBack) {
                sheet.appendRow(rowContent);
            } else {
                sheet.insertRowBefore(1).getRange("a1:j1").setValues([rowContent]); // chen len tren
            }

        }
    }
}