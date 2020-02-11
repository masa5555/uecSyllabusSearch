//reference of readJSON(): https://miyakoroom.blogspot.com/2018/09/javascript-web.html
function readJSON(){
  var f = "data1.json";
  var retJson;
  var obj = new XMLHttpRequest();
 
  obj.open('get', f, false); //ファイルオープン : 同期モード
  obj.onload = function(){
    retJson = JSON.parse(this.responseText); //JSON型でパース。
  }
  obj.send(null); 
  return retJson;
}

function view(){
  document.writeln("<table>");
  document.write(
    "<tr>\n" + "  <td>No.</td>\n" + " <td>学期</td>\n" + "  <td>学年</td>\n" + "  <td>学科</td>\n"
    + " <td>曜日・時間</td>\n" + "  <td>時間割コード</td>\n" + "  <td>分類</td>\n"
    + " <td>科目名</td>\n" + "  <td>担当教員</td>\n" + "</tr>\n"
  );
  for(let i = 0; i<1123; i++){
    //データ正規化で対応すべき
    let depertment = data[i].depertment;
    if(depertment == "情報理工学域") 
      depertment = "Ⅰ,Ⅱ,Ⅲ";
    else if(depertment == "Ⅰ類")
      depertment = "Ⅰ";
    else if(depertment == "Ⅱ類")
      depertment = "Ⅱ";
    else if(depertment == "Ⅲ類") 
      depertment = "Ⅲ";
    
    let grade = data[i].grade;
    if(grade == "1/2/3/4")
      grade = "1,2,3,4";
    else if(grade  == "2/3/4")
      grade = "2,3,4";
    else if(grade == "3/4")
      grade = "3,4";
    else if(grade == "1/2")
      grade = "1,2";

    document.writeln(
      "<tr>\n"
      + " <td>" + data[i].num + "</td>\n"
      + " <td>" + data[i].semester +  "</td>\n"
      + " <td>" + grade  + "</td>\n"
      + " <td>" + depertment + " </td>\n"
      + " <td>" + data[i].time + "</td>\n"
      + " <td>" + data[i].code + "</td>\n" 
      + " <td>" + data[i].category + "</td>\n"
      + " <td><a href=" + "http://kyoumu.office.uec.ac.jp/syllabus/2019/" + data[i].url + ">" + data[i].name + "</a></td>"
      + " <td>" + data[i].teacher + "</td>\n"
      + "</tr>"
    );
  }
  document.writeln("</table>");
}

function search(pattern, item){
  let d = document.getElementsByTagName("tr");
  if(pattern == ""){
    for(let i = 0; i < 1124; i++)
      d[i+1].removeAttribute('style');
  }else{
    let re = new RegExp(pattern);
    for(let i = 0; i < 1124; i++){
      if( re.exec(data[i][item]) )
        d[i+1].removeAttribute('style');
      else
        d[i+1].setAttribute('style', 'display: none;');
    }
  }
}

/*
function jinbun(){
  let d = document.getElementsByTagName("tr");
  for(let i = 0; i < 1124; i++){
    if(data[i]['category'] == "総合文化科目" && (data[i]['time'] == "水1" || data[i]['time'] == "水1" || data[i]['time'] == "水2" || data[i]['time'] == "水5"))
      d[i+1].removeAttribute('style');    
    else
      d[i+1].setAttribute('style', 'display: none;');
  }
}
*/

var data = readJSON();
view();