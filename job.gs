function daily() {
    crawl(new Date(), false);
}

Date.prototype.fTime = function() {
    // dd-mm-yyyy;
    return this.getDate() + "-" + (this.getMonth() + 1) + "-" + this.getFullYear();
}
Date.prototype.fmTime = function() {
    // yyyy-mm-dd;
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
}


function jobCrawBack() {
    var excel = SpreadsheetApp.getActive();
    var sheet = excel.getSheets()[0];
    var sheetCf = excel.getSheets()[1];

    var rowEnd = sheet.getLastRow();

    // Lấy dữ liệu ngày của hàng cuối cùng
    var lastDate = sheet.getRange(rowEnd, 2).getValue();
    var now = new Date();

    // Tính ngày tiếp theo
    var _lastDate = new Date(lastDate);
    _lastDate.setDate(_lastDate.getDate() - 1);
    crawl(_lastDate, true);
  


    // Thống kê số ngày lấy được
    spaceDay = Math.floor((now.getTime() - _lastDate.getTime()) / 86400000);
    sheetCf.getRange("b1").setValue(spaceDay);
  
  jobCrawBack()
}