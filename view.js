
//json => object 
//reference: https://miyakoroom.blogspot.com/2018/09/javascript-web.html
function readJSON(){
  var f = "data.json";
  var retJson;
  var obj = new XMLHttpRequest();
 
  obj.open( 'get', f, false ); //ファイルオープン : 同期モード
  obj.onload = function() {
    retJson = JSON.parse(this.responseText); //JSON型でパース。
  }
  obj.send(null); 
  return retJson;
}

// frag ついてるのだけ表示
function view(){
  document.writeln("<table>");
  document.write(
    "<tr>\n" + "  <td>No.</td>\n" + " <td>学期</td>\n" + "  <td>開講</td>\n"
    + " <td>曜日・時間</td>\n" + "  <td>時間割コード</td>\n" 
    + " <td>科目名</td>\n" + "  <td>担当教員</td>\n" + "</tr>\n"
  );
  for(let i = 0; i<1123; i++){
    document.writeln(
      "<tr>\n"
      + " <td>" + data[i].num + "</td>\n"
      + " <td>" + data[i].semester +  "</td>\n"
      + " <td>" + data[i].op + "</td>\n"
      + " <td>" + data[i].time + "</td>\n"
      + " <td>" + data[i].code + "</td>\n" 
      + " <td><a href=" + "http://kyoumu.office.uec.ac.jp/syllabus/2019/" + data[i].url + ">" + data[i].name + "</a></td>"
      + " <td>" + data[i].teacher + "</td>\n"
      + "</tr>"
    );
  }
  document.writeln("</table>");
}

function searchName(pattern){
  let d = document.getElementsByTagName("tr");
  if(pattern == ""){
    for(let i = 0; i < 1124; i++){
      d[i+1].removeAttribute('style');
    }
  }else{
    let re = new RegExp(pattern);
    for(let i = 0; i < 1124; i++){
      if(re.exec(data[i].name)){
        d[i+1].removeAttribute('style');
      }else{
        d[i+1].setAttribute('style', 'display: none;');
      }
    }
  }
}
var data = readJSON();
view();



