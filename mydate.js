/**
*------------------------------------------------
*   万年历的控制器
*   
*   @author: 
*   @version:
*
*------------------------------------------------
*/

// 入口
window.onload = function(){
    addSelect();
    getContentByChoice();  
}

/*
* 初始化年份选择器和月份选择器
*   年份选择器事件为 1900 - 2041
*/
function addSelect(){
    var selects = document.getElementsByTagName("select");
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();

    for(var i = 1900; i < 2041; i++){
        var node = document.createElement("option");
        node.innerHTML = i +　"年";
        if(i == year){
           node.setAttribute("selected", "selected");
        }
        selects[0].appendChild(node);
    }

    for(var j = 1; j < 13; j++){
        var node  = document.createElement("option");
        node.innerHTML = j + "月";
        if((j - 1) == month){
            node.setAttribute("selected", "selected");
        }
        selects[1].appendChild(node);
    }
}

/*
*
* 获取一个月份第一天是星期几
*   @param year 年份
*   @param month 月份
*   @return 输入年月的第一天是星期几
*/
function getFirstDay(year, month){
    var date = new Date();
    date.setFullYear(year,month - 1,1);
    var day = date.getDay();
    return day;
}


//判断每个月的天数
function getDaysOfMonth(year, month){
    var res;
    var days;

    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        days = 31;
    }else if(month == 4 || month == 6 || month == 9 || month == 11){
        days = 30;
    }else if ((year%4 == 0) && (year%100 != 0) || (year%400 == 0)) {
        days = 29;
    }else{
        days = 28;
    }
    return days;
}

function getRow(year, month){
    var firstday = getFirstDay(year, month);
    var days = getDaysOfMonth(year, month);
    var row = Math.ceil((firstday + days) / 7); 
    return row;
}

// 根据本月行数行数动态的绘制单元格
function setDateRows(year, month){
    //将要显示月的行数
    var row = getRow(year, month);
    var tbody = document.getElementsByTagName("tbody")[0];

    var datelist = document.getElementsByClassName("everyday");
    //现有的行数
    var tempRow = datelist.length / 7;

    //如果将要显示的月的行数多于已经存在的行数 绘制新的行
    if (row > tempRow) {
        for(var i = tempRow; i < row; i++){
            var trnode = document.createElement("tr");
            tbody.appendChild(trnode);
            trnode.setAttribute("class", "containerdate");
            for(var j = 0; j < 7; j++){
                var tdnode = document.createElement("td");
                tdnode.setAttribute("class", "everyday")
                trnode.appendChild(tdnode);
            }
        }
    } else {
        //如果将要显示月的行数少于已经存在的行数 删除多余行
        for(var i = row; i < tempRow; i++){
            tbody.removeChild(tbody.lastChild); 
        }
    }
}

function getContentByChoice(){
    var year;
    var month;
    var objyear = document.getElementById("choiceyear");
    var objmonth = document.getElementById("choicemonth");

    // 获取年份选择器选中内容 如：2016年
    var tempString = objyear.value;
    // 截取掉最后'年' 然后转成数字
    year = parseInt(tempString.substring(0, tempString.indexOf('年')));
    tempString = objmonth.value;
    month = parseInt(tempString.substring(0, tempString.indexOf('月')));

    setDateRows(year, month);
    showDateContent(year, month);
}

function back(){
    var date = new Date();

    var objyear = document.getElementById("choiceyear");
    var objmonth = document.getElementById("choicemonth");

    // 将年月标签置于当前年月
    var tempYear = objyear.getElementsByTagName('option')[date.getFullYear() - 1900];
    var tempMonth = objmonth.getElementsByTagName('option')[date.getMonth()];
    tempYear.selected = true;
    tempMonth.selected = true;
    
    getContentByChoice();
}


//在表格中显示日期内容
function showDateContent(year, month){
    var date = new Date();
    var datenow = date.getDate();
    var datelist = document.getElementsByClassName("everyday");
    var row = getRow(year, month);
    var nowmonthdays = getDaysOfMonth(year, month);
    var lastmonthdays = getDaysOfMonth(year, month-1);
    var firstday = getFirstDay(year, month);
    var a = lastmonthdays - firstday + 1;
    var d = 1;
    var n =1;

    for(var i = 0; i < row*7; i++){
        if (i >= firstday && i < firstday + nowmonthdays) {
            datelist[i].innerHTML =  d++;
            if(i % 7 == 0 || i % 7 == 6){
                datelist[i].style.color = "red";
            }else{
                datelist[i].style.color = "black";
            }
        }else{    
            if(i < firstday){
                 datelist[i].innerHTML = a++;
                 datelist[i].style.color = "#CCC";
            }else{
                datelist[i].innerHTML = n++;
                datelist[i].style.color = "#CCC";
            }
        }
    }

    for(var i = 0; i < row*7; i++){
        datelist[i].style.backgroundColor = "#FFFFFF";
    }
    datelist[firstday+datenow-1].style.backgroundColor = "#FC0";

}

function change () {

    getContentByChoice();
}
