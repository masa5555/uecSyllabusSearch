const year = 2021;

//reference of readJSON(): https://miyakoroom.blogspot.com/2018/09/javascript-web.html
function readJSON(){
  const f = "data/data20210401.json";
  let retJson;
  let obj = new XMLHttpRequest();
 
  obj.open('get', f, false); //ファイルオープン : 同期モード
  obj.onload = function(){
    retJson = JSON.parse(this.responseText); //JSON型でパース。
  }
  obj.send(null);
  return retJson;
}

const data = readJSON();
var fragItem = [];
for(let i = 0; i < Object.keys(data).length; i++){
  let tmp = {name: true, teacher: true, semester: true, grade: true, depertment: 1, time: true};
  fragItem.push(tmp);
}

//production
//localStorage.setItem('localFavoriteList', JSON.stringify(favoriteList));
//stringとobjectの違いに気を付ける

//init　favorite list
var favoriteFrag = false;
var favoriteList = JSON.parse(localStorage.getItem("localFavoriteList"));

if(favoriteList == null || favoriteList.length != Object.keys(data).length){
  favoriteList = Array(Object.keys(data).length).fill(false);
}

function init_view(){
  let rowStatus = document.getElementsByTagName("tr");

  for(let i = 0; i < Object.keys(data).length; i++){
    if(i < 20){
      rowStatus[i+1].removeAttribute('style', 'display: none;');
    }else{
      rowStatus[i+1].setAttribute('style', 'display: none;');
    }
  }
}

view();

function view(){

  document.write("<table>\n");
  document.write("<thead>\n");
  document.write(
    "<tr>\n" + " <td>お気に入り</td>\n" + "  <td>No.</td>\n" + " <td>学期</td>\n" + "  <td>学年</td>\n" + "  <td>類</td>\n"
    + " <td>曜日・時間</td>\n" + "  <td>時間割コード</td>\n" + "  <td>分類</td>\n"
    + " <td>科目名</td>\n" + "  <td>担当教員</td>\n" + "</tr>\n"
  );
  document.write("</thead>\n");
  document.write("<tbody>\n");
  
  for(let i = 0; i<Object.keys(data).length; i++){
    let favoriteHTML = "<i class=\"far fa-star\" onClick=\"addFavorite("+i+")\" ></i>";
    if(favoriteList[i]){
      favoriteHTML = "<i class=\"fas fa-star\" onClick=\"removeFavorite("+i+")\" ></i>";
    }
      const prevURL = "http://kyoumu.office.uec.ac.jp/syllabus/" + year +"/";

    document.writeln(
      "<tr>\n"
      + " <td>" + favoriteHTML + "</td>\n"
      + " <td>" + data[i].num + "</td>\n"
      + " <td>" + data[i].semester +  "</td>\n"
      + " <td>" + data[i].grade  + "</td>\n"
      + " <td>" + data[i].depertment + " </td>\n"
      + " <td>" + data[i].time + "</td>\n"
      + " <td>" + data[i].code + "</td>\n" 
      + " <td>" + data[i].category + "</td>\n"
      + " <td><a href=" + prevURL + data[i].url + ">" + data[i].name + "</a></td>"
      + " <td>" + data[i].teacher + "</td>\n"
      + "</tr>"
    );
  }
  document.write("</tbody>\n");
  document.writeln("</table>");

  init_view();
}


function search(pattern, item){

  //Update frag
  if(pattern == ""){
    for(let i = 0; i < Object.keys(data).length; i++)
      fragItem[i][item] = true;
  }else{
    let re = new RegExp(pattern);
    for(let i = 0; i < Object.keys(data).length; i++){
      if( re.exec(data[i][item]) )
        fragItem[i][item] = true;
      else
        fragItem[i][item] = false;
    }
  }

  //表示件数
  let numShowColumn = 20;
  let showColumnCount = 0;
  let matched_count = 0;

  // Change view
  let rowStatus = document.getElementsByTagName("tr");
  for(let i = 0; i < Object.keys(data).length; i++){
    let fragResult = true;
    let tmpArray = ["name", "teacher", "semester", "grade", "depertment", "time"];
    for(let j = 0; j < tmpArray.length; j++)
      fragResult = fragResult && fragItem[i][tmpArray[j]];
    if (fragResult)
      matched_count += 1;

    if(fragResult && showColumnCount < numShowColumn){
      rowStatus[i+1].removeAttribute('style', 'display: none;');
      showColumnCount++;
    }else{
      rowStatus[i+1].setAttribute('style', 'display: none;');
    }
  }
  console.log(document.getElementsByClassName("match-count"));
  document.getElementsByClassName("match-count")[0].innerHTML = "<strong>" + matched_count + "</strong> 件にマッチしました";
}

function addFavorite(index){
  let rowStatus = document.getElementsByTagName("tr");
  let columnStatus = rowStatus[index+1].getElementsByTagName("td");
  columnStatus[0].innerHTML = "<i class=\"fas fa-star\" onClick=\"removeFavorite("+index+")\" ></i>";
  
  favoriteList[index] = true;
  localStorage.setItem('localFavoriteList', JSON.stringify(favoriteList));
}

function removeFavorite(index){
  let rowStatus = document.getElementsByTagName("tr");
  let columnStatus = rowStatus[index+1].getElementsByTagName("td");
  columnStatus[0].innerHTML = "<i class=\"far fa-star\" onClick=\"addFavorite("+index+")\" ></i>";

  favoriteList[index] = false;
  localStorage.setItem('localFavoriteList', JSON.stringify(favoriteList));
}

function showFavorite(){
  let rowStatus = document.getElementsByTagName("tr");
  if(favoriteFrag){
    favoriteFrag = false;
    init_view();

    let favoriteButtonElement = document.getElementsByClassName("favoriteButton");
    favoriteButtonElement[0].innerHTML = "お気に入りのみ表示";
  }else{
    favoriteFrag = true;
    for(let i = 0; i < Object.keys(data).length; i++){
      if(favoriteList[i] == false){
        rowStatus[i+1].setAttribute('style', 'display: none;');
      }else{
        rowStatus[i+1].removeAttribute('style', 'display: none;');
      }
    }

    let searchFormElement = document.getElementsByClassName("searchForm");
    searchFormElement[0].value = "";
    searchFormElement[1].value = "";
    searchFormElement[2].value = "";

    let favoriteButtonElement = document.getElementsByClassName("favoriteButton");
    favoriteButtonElement[0].innerHTML = "解除";
  }
}
