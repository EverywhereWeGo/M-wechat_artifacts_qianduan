function getMyDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen);//最后拼接时间
    return oTime;
};

//补0操作
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}


$.ajax({
    url: "http://39.105.22.26:8093/getList",
    // url: "http://localhost:8093/getList",
    dataType: "json",
    success: function (data) {
        // console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            var title = data[i].title;
            var trueurl = data[i].trueurl;
            console.log(title);
            console.log(trueurl);

            $(".main").append("<article>\n" +
                "        <div class=\"post\">\n" +
                "            <h1 class=\"title\">\n" +
                "                <a href=" + trueurl + ">" + title + "</a>\n" +
                "            </h1>\n" +
                "            <p></p>\n" +
                "        </div>\n" +
                "        <div class=\"article_image\">\n" +
                "            <img src=\"img/pic" + i + ".jpg\" alt=\"\" title=\"\">\n" +
                "            <a class=\"read_more\" href=\"#\">Continue Reading <i class=\"read_more_arrow\"></i> </a>" +
                "        </div>\n" +
                "    </article>");
        }
    }
});