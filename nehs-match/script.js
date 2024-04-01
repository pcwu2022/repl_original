'use strict';

//state variables
let status = 0; //0: haven't filled in, 1: filled in form
let formLock = false;
let countDownDate = new Date("Apr 4, 2022 06:00:00");

//elements
let mainDiv = document.getElementById("main");
let submitDiv;

//data
let dataBoy = [];
let dataGirl = [];
let userData = [];

//question list
let questionEls = [];
let questions = [
  ["a","你走進了一座森林，前方有個空地，你看見了一棟房子，請問你認為這棟房子是什麼樣子的？",["豪宅","小木屋","糖果屋","玻璃屋"]],
  ["b","如果要去參加一場以恐怖、驚悚為主題的化妝舞會，你最想要做的舞會造型是？",["殭屍","喪屍","吸血鬼","木乃伊","電到嚇死人的葉嘉安"]],
  ["c","當你到髮廊要剪髮時，你會如何與美髮設計師溝通剪髮需求？",["不管那麼多，理光頭最快","任由髮型設計師幫你剪","丟一堆髮型雜誌要他幫你決定","口頭跟設計師說明要剪髮想法","給圖片請設計師照著剪"]],
  ["d","一輛失控的列車在鐵軌上行駛。在列車正行進的軌道上，有五個人被綁起來，無法動彈。列車將要碾壓過他們。你站在改變列車軌道的操縱杆旁。如果拉動此杆，則列車將切換到另一條軌道上。但是，另一條軌道上也有一個人被綁著。你會怎麼做？",["什麼也不做，讓列車按照正常路線碾壓過這五個人","拉下操縱杆，改變為另一條軌道，使列車壓過另一條軌道上的那個人","丟一塊石塊到軌道上讓列車出軌，救了那六個人但使列車上的人陷入生命危險"]],
  ["e","你最喜歡喝哪種飲料？",["果汁","咖啡","氣泡飲料","茶類"]],
  ["f","你房間亂嗎？",["像被核彈炸過，地上堆一堆東西，常常找不到東西","亂中有序，隨手放但還是知道東西在哪","整齊乾淨，所有東西都安排得好好的","我有潔癖和強迫症，書都要對齊","美得像樣品屋，乾淨得可比無塵室"]],
  ["g","你對於別人放閃的接受程度？",["兒童不宜觀看的行為","大路旁邊激吻","牽牽小手＆抱抱","在社交軟體上分享","在眾人面前保持距離"]],
  ["h","你對披薩上放鳳梨的看法？",["吃爆啊開玩笑！","不錯啊算好吃","無感","隨便","覺得不妥","這根本邪教！"]],
  ["i","香菜？",["我寧願喝王水","有點噁心","怪怪的但還算可以接受","不錯啊","愛死","我三餐主食都吃香菜"]],
  ["j","~~用靈性與這個宇宙感應出宇宙要給我們的訊息~~<br>按照直覺選一張",[image("http://pic.pimg.tw/sunny1229/1419491114-1786430932_wn.jpg"),
image("https://www.webpagescreenshot.info/image-url/kiwDYIHL7"),
image("http://pic.pimg.tw/sunny1229/1419491020-2035546360.jpg"),
image("https://www.webpagescreenshot.info/image-url/MkC9HVhc9")]],
  ["k","哪個圖案最吸引你？",[
    image("https://www.webpagescreenshot.info/image-url/5Rm3GUrIr",100),
    image("https://www.webpagescreenshot.info/image-url/2OVEsZkKm",100),
    image("https://www.webpagescreenshot.info/image-url/r5N57smBT",100),
    image("https://www.webpagescreenshot.info/image-url/uzXt1Rp3Z",100),
    image("https://www.webpagescreenshot.info/image-url/rNf24K0jD",100)]],
  ["l","想像你的眼前有幾樣東西，最想抓住的是什麼？",["新鮮的水果","熱騰騰的年糕（或食物）","誘人的現鈔","閃閃發光的戒指","令人好奇的水晶球","對話式數學講義"]],
  ["m","發現家門口有大箱子，打開一看發現裡面有蛇，你的直覺會有幾條蛇？<br>"+image("https://s.yimg.com/ny/api/res/1.2/MeC43UwrwR5ASmhZ6O4f.w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2022-02/ccf316b1-8d61-11ec-bfeb-e63934eea412"),["一條蛇","兩條蛇","三條蛇","裡面都是蛇"]],
  ["n","心愛的小狗走失後被找到了，找到小狗的地點會是哪裡呢？",["在家裡","在鄰居家","大馬路邊","遊樂場","被加菲貓郵寄到阿布達比"]],
  ["o","決定要為房間換上新的窗簾裝飾，你會選擇什麼樣的窗簾款式？",["能有遮陽效果的窗簾","沒有任何花紋圖案的純白色系","水滴圓點圖案的款式","花朵繪圖為主題的款式"]],
  ["p","假設你是加菲貓，當你遇到下圖的場景時你會做甚麼選擇？<br>"+image("https://play-lh.googleusercontent.com/6Ldrth6V2F1GtxI6Z1kgDEXGuLzZbcIb5UkkLhodw5DFoY6fkyaMN-DUMne-kkUgZw"),["左轉上坡檢錢","不理他繼續往前跑","右轉領錢袋"]],
  ["q","皇宮剛貼出「舞會告示」，邀請全國未婚的俊男美女前往參加。為了吸引王子或公主的注意，你決定上街添購一些行頭，這個時候，你會去哪裡採買？",["想都不用想，當然是名牌服飾店，只有昂貴的名家設計，才能襯托自己的高貴氣質。","會去品牌眾多的百貨公司選購，這樣才能從頭到腳，把自己打扮得耀眼出眾。","會先打開衣櫥，看看有沒有適合的服飾，再決定要買哪些東西。","會先上網收集情報，同時四處打聽哪些商家正在打折促銷，想盡辦法買到物超所值的華美服飾。"]],
  ["r","如果有一天，你像魯濱遜一樣漂流到荒島，你會如何求生存？",["肚子餓了，再去找東西吃。","每次捕魚或採水果時，都會多採收一些存糧。","會努力採收水果與漁獲，然後作成水果乾或鹹魚乾。","會就地取材製作各種工具，以便捕更多的魚，採收更多的水果，再想辦法跟當地土著交換更多的生活必需品。"]],
  ["s","你無意間發現一張藏寶圖，依照指示，你順利找到一座藏滿金銀財寶的山洞。可是山洞旁的石碑寫著：「只能進來一次，否則會遭遇不測。」這個時候，你會怎麼做？",["倘若一次帶不走，會再偷偷跑回來拿走其他寶物。","即使快要走不動了，你還是捨不得留下任何一件寶物。","你會視自己的體能負荷狀況，帶走「拿得動」的寶物。","你會從寶藏中挑選出「價值高、重量輕」的寶物帶走。"]],
  ["t","哪個名字最眼熟？",["陳冠宇","陳建宏","張家豪","陳俊宏","陳怡君","林怡君","陳淑芬","王夢昕"]],
  ["u","請憑直覺，下列方程式的根為何？<br>"+image("https://www.webpagescreenshot.info/image-url/oOzs4Ezdo"),["-4","-2","1","3","47log(19)i"]],
  ["v","心理測驗做完了！感受如何？",[
    "很討厭，不要再來", //-1
    "無聊，下次可以找有趣一點的嗎", //-0.67 
    "我覺得我被整了", //-0.33
    "我只想知道我被配對到誰", //0
    "有趣", //0.33
    "再來再來，我還要玩", //0.67
    "我覺得你可以賣給魯蛇團" //1
  ]]
];

//image
function image(url, width=Math.min(window.innerWidth-100,500)){
  return "<img src='"+url+"' width='"+width+"'>";
}

//create a question
function createQuestion(name, description = "", labels = [], index = 0, appendDiv = mainDiv){
  let qDiv = document.createElement("div");
  qDiv.name = name;
  qDiv.className = "qDiv";
  qDiv.innerHTML += index + ". " + description + "<br>";
  for (let i = 0; i < labels.length; i++){
    let inputX = document.createElement("input");
    inputX.type = "radio";
    inputX.name = name;
    inputX.id = labels[i];
    inputX.value = labels[i];
    let labelX = document.createElement("label");
    labelX.for = labels[i];
    labelX.innerHTML = labels[i]+"<br>";
    qDiv.appendChild(inputX);
    qDiv.appendChild(labelX);
  }
  appendDiv.appendChild(qDiv);
  return qDiv;
};

function createForm(){
  //loop over all the questions
  for (let i = 0; i < questions.length; i++){
    questionEls.push(createQuestion(questions[i][0],questions[i][1],questions[i][2],i+1));
  }

  //submit
  let outputArr = [];   
  submitDiv = document.createElement("button");
  submitDiv.innerHTML = "確認送出";
  submitDiv.id = "submitDiv";
  mainDiv.appendChild(submitDiv);
  submitDiv.onclick = function(){
    let outputSum = 0;
    for (let i = 0; i < questionEls.length; i++){
      let checked = -2;
      let dataEl = document.getElementsByName(questionEls[i].name);
      for (let j = 0; j < dataEl.length; j++){
        if (dataEl[j].checked){
          checked = 2*j/(dataEl.length-1)-1;
        }
      }
      if (checked < -1){
        mainDiv.innerHTML += "<div style='color:red;'>請完全作答再送出，謝謝</div>"
        outputArr = [];
        return;
      }
      outputSum += checked;
      outputArr[i] = Math.round(checked*100)/100;
    }

    //output
    console.log(outputArr);
    sendData(JSON.stringify(outputArr));
  }
};

//create match interface
function matchBoy(){
  let userLength = Math.sqrt(userSquare());
  let productArr = []; //index is the same as dataBoy[]
  for (let i = 0; i < dataBoy.length; i++){
    if (dataBoy[i][0] === user){
      productArr[i] = -1;
      continue;
    }
    let matchData = JSON.parse(dataBoy[i][1]);
    let dotProduct = 0;
    let boySquare = 0;
    for (let j = 0; j < userData.length; j++){
      if (matchData[j] === undefined){
        matchData[j] = 0;
      }
      dotProduct += matchData[j]*userData[j];
      boySquare += matchData[j]*matchData[j];
    }
    let boyLength = Math.sqrt(boySquare);
    productArr[i] = dotProduct/userLength/boyLength; //cos formula
  }
  return productArr;
};

function matchGirl(){
  let userLength = Math.sqrt(userSquare());
  let productArr = []; //index is the same as dataGirl[]
  for (let i = 0; i < dataGirl.length; i++){
    if (dataGirl[i][0] === user){
      productArr[i] = -1;
      continue;
    }
    let matchData = JSON.parse(dataGirl[i][1]);
    let dotProduct = 0;
    let girlSquare = 0;
    for (let j = 0; j < userData.length; j++){
      if (matchData[j] === undefined){
        matchData[j] = 0;
      }
      dotProduct += matchData[j]*userData[j];
      girlSquare += matchData[j]*matchData[j];
    }
    let girlLength = Math.sqrt(girlSquare);
    productArr[i] = dotProduct/userLength/girlLength;  //cos formula
  }
  return productArr;
};

function userSquare(){
  let square = 0;
  for (let i = 0; i < userData.length; i++){
    square += userData[i]*userData[i];
  }
  return square;
};

function match(){
  console.log("資料總數：",dataBoy.length+dataGirl.length);
  let userDP = userSquare();

  //interface
  
  mainDiv.innerHTML += "<div><b>"+user+"</b> 歡迎回來！</div>";
  mainDiv.innerHTML += "<div>資料比對總數："+(dataBoy.length+dataGirl.length)+"</div>";
  if (dataBoy.length < 3 || dataGirl.length < 3){
    mainDiv.innerHTML += "資料總數不足，暫時無法匹配，歡迎邀請親朋好友一起加入！";
    return;    
  }  

  //boy
  mainDiv.innerHTML += "";
  if (gender === "boy"){
    mainDiv.innerHTML += "<h3>同性匹配結果</h3>";
  } else {
    mainDiv.innerHTML += "<h3>異性匹配結果</h3>";
  }
  let boyDiv = document.createElement("div");
  boyDiv.id = "boyDiv";
  mainDiv.appendChild(boyDiv);

  let boyString = "<h4>綜合比對</h4>";
  boyString += "<table>";
  boyString += "<tr><th>名次 &nbsp</th><th>暱稱</th><th>契合度</th><th>狀態列</th></tr>";
  let boyDP = matchBoy(); //dot product array
  let boyDPCopy = boyDP.slice();
  for (let i = 1; i <= boyDP.length; i++){ //top three boys
    let maxIndex = 0;
    for (let j = 0; j < boyDP.length; j++){
      if (boyDP[j] >= boyDP[maxIndex]){
        maxIndex = j;
      }
    }
    if (boyDP[maxIndex] === -1){
      break;
    }
    // let percentage = Math.round((boyDP[maxIndex]/userDP+1)*50);
    let percentage = Math.round(boyDP[maxIndex]*50+50);
    console.log(dataBoy[maxIndex][0], percentage +"%");
    boyDP[maxIndex] = -1;

    boyString += "<tr>";
    boyString += "<td>"+i+"&nbsp&nbsp</td>";
    boyString += "<td>"+dataBoy[maxIndex][0]+" ("+dataBoy[maxIndex][3]+")"+"&nbsp&nbsp</td>";
    boyString += "<td>"+percentage+"%"+"&nbsp&nbsp</td>";
    boyString += "<td>"+dataBoy[maxIndex][2]+"&nbsp&nbsp</td>";
    boyString += "</tr>";
  }
  boyString += "</table>";

  //same class
  boyString += "<h4>同班比對</h4>";
  boyDP = boyDPCopy.slice();  //resume
  boyString += "<table>";
  boyString += "<tr><th>名次 &nbsp</th><th>暱稱</th><th>契合度</th><th>狀態列</th></tr>";
  for (let i = 1; i <= 5; i++){ //top three boys
    let maxIndex = 0;
    for (let j = 0; j < boyDP.length; j++){
      if (dataBoy[j][3] !== classes){
        continue;
      }
      if (boyDP[j] >= boyDP[maxIndex]){
        maxIndex = j;
      }
    }
    if (boyDP[maxIndex] === -1){
      break;
    }
    // let percentage = Math.round((boyDP[maxIndex]/userDP+1)*50);
    let percentage = Math.round(boyDP[maxIndex]*50+50);
    console.log(dataBoy[maxIndex][0], percentage +"%");
    boyDP[maxIndex] = -1;

    boyString += "<tr>";
    boyString += "<td>"+i+"&nbsp&nbsp</td>";
    boyString += "<td>"+dataBoy[maxIndex][0]+"&nbsp&nbsp</td>";
    boyString += "<td>"+percentage+"%"+"&nbsp&nbsp</td>";
    boyString += "<td>"+dataBoy[maxIndex][2]+"&nbsp&nbsp</td>";
    boyString += "</tr>";
  }
  boyString += "</table>";
  boyDiv.innerHTML = boyString;

  //girl
  mainDiv.innerHTML += "";
  if (gender === "girl"){
    mainDiv.innerHTML += "<h3>同性匹配結果</h3>";
  } else {
    mainDiv.innerHTML += "<h3>異性匹配結果</h3>";
  }
  let girlDiv = document.createElement("div");
  girlDiv.id = "girlDiv";
  mainDiv.appendChild(girlDiv);

  let girlString = "<h4>綜合比對</h4>";
  girlString += "<table>";
  girlString += "<tr><th>名次 &nbsp</th><th>暱稱</th><th>契合度</th><th>狀態列</th></tr>";
  let girlDP = matchGirl(); //dot product array
  let girlDPCopy = girlDP.slice();  //copy
  for (let i = 1; i <= girlDP.length; i++){ //top three girls
    let maxIndex = 0;
    for (let j = 0; j < girlDP.length; j++){
      if (girlDP[j] >= girlDP[maxIndex]){
        maxIndex = j;
      }
    }
    if (girlDP[maxIndex] === -1){
      break;
    }
    //let percentage = Math.round((girlDP[maxInde]/userDP+1)*50);
    let percentage = Math.round(girlDP[maxIndex]*50+50);
    console.log(dataGirl[maxIndex][0], percentage +"%");
    girlDP[maxIndex] = -1;

    girlString += "<tr>";
    girlString += "<td>"+i+"&nbsp&nbsp</td>";
    girlString += "<td>"+dataGirl[maxIndex][0]+" ("+dataGirl[maxIndex][3]+")"+"&nbsp&nbsp</td>";
    girlString += "<td>"+percentage+"%"+"&nbsp&nbsp</td>";
    girlString += "<td>"+dataGirl[maxIndex][2]+"&nbsp&nbsp</td>";
    girlString += "</tr>";
  }
  girlString += "</table>";

  //same class

  girlString += "<h4>同班比對</h4>";
  girlString += "<table>";
  girlString += "<tr><th>名次 &nbsp</th><th>暱稱</th><th>契合度</th><th>狀態列</th></tr>";
  girlDP = girlDPCopy.slice(); //resume
  for (let i = 1; i <= 5; i++){ //top three girls
    let maxIndex = 0;
    for (let j = 0; j < girlDP.length; j++){
      if (dataGirl[j][3] !== classes){
        continue;
      }
      if (girlDP[j] >= girlDP[maxIndex]){
        maxIndex = j;
      }
    }
    //let percentage = Math.round((girlDP[maxIndex]/userDP+1)*50);
    if (girlDP[maxIndex] === -1){
      break;
    }
    let percentage = Math.round(girlDP[maxIndex]*50+50);
    console.log(dataGirl[maxIndex][0], percentage +"%");
    girlDP[maxIndex] = -1;

    girlString += "<tr>";
    girlString += "<td>"+i+"&nbsp&nbsp</td>";
    girlString += "<td>"+dataGirl[maxIndex][0]+"&nbsp&nbsp</td>";
    girlString += "<td>"+percentage+"%"+"&nbsp&nbsp</td>";
    girlString += "<td>"+dataGirl[maxIndex][2]+"&nbsp&nbsp</td>";
    girlString += "</tr>";
  }
  girlString += "</table>";
  girlDiv.innerHTML = girlString;
};

//final match
function finalMatch(){
  let userCopy = user;
  mainDiv.innerHTML += "<h3>一一配對結果</h3>";
  let matchGrid = [];//i:boy,j:girl
  for (let i = 0; i < dataBoy.length; i++){
    user = dataBoy[i][0];
    userData = JSON.parse(dataBoy[i][1]);
    let matchRaw = matchGirl();
    for (let j = 0; j < matchRaw.length; j++){
      matchRaw[j] = Math.round(matchRaw[j]*50)+50;
    }
    matchGrid.push(matchRaw);
  }
  let otherHalf = "";
  let percentage = 0;  
  let returnArr = [];
  let prevMaxI = [];
  let prevMaxJ = [];
  for (let n = 0; n < Math.min(dataBoy.length,dataGirl.length); n++){
    let maxIndex = [0,0];
    for (let i = 0; i < dataBoy.length; i++){
      if (prevMaxI.indexOf(i) !== -1){
        continue;
      }
      for (let j = 0; j < dataGirl.length; j++){
        if (prevMaxJ.indexOf(j) !== -1){
          continue;
        }
        if (matchGrid[i][j] >= matchGrid[maxIndex[0]][maxIndex[1]]){
          maxIndex = [i,j];
        }
      }
    }
    returnArr.push([dataBoy[maxIndex[0]][0],dataGirl[maxIndex[1]][0],Math.round(matchGrid[maxIndex[0]][maxIndex[1]])+"%"]);
    if (dataBoy[maxIndex[0]][0] === userCopy){
      otherHalf = dataGirl[maxIndex[1]][0];
      percentage = Math.round(matchGrid[maxIndex[0]][maxIndex[1]])+"%";
    }
    if (dataGirl[maxIndex[1]][0] === userCopy){
      otherHalf = dataBoy[maxIndex[0]][0];
      percentage = Math.round(matchGrid[maxIndex[0]][maxIndex[1]])+"%";
    }
    prevMaxI.push(maxIndex[0]);
    prevMaxJ.push(maxIndex[1]);
  }
  if (otherHalf === ""){
    mainDiv.innerHTML += "非常遺憾，無法將您配對。本次數據男性"+dataBoy.length+"人，女性"+dataGirl.length+"人。<br>"+image("https://www.webpagescreenshot.info/image-url/BcTHZ4Nrt");
  } else {
    mainDiv.innerHTML += "恭喜您！您的配對結果為 <b>"+otherHalf+"</b> ，契合度為 <b>"+percentage+"</b> ！ 趕快去衝一波吧！機會難得，浪費可惜喔~<br>本次數據男性"+dataBoy.length+"人，女性"+dataGirl.length+"人。";
    //mainDiv.innerHTML += "恭喜您！您的配對結果為 <b>"+otherHalf+"</b> ！ 趕快去衝一波吧！機會難得，浪費可惜喔~<br>本次數據男性"+dataBoy.length+"人，女性"+dataGirl.length+"人。";
  }
  return returnArr;
};
                                    
//get data
function getData(){
  let xhr = new XMLHttpRequest;
  xhr.open("GET","https://ap3.ragic.com/ddm4534/ragicsales/5?api");
  xhr.send();
  xhr.onload = function(){
    let rawData = JSON.parse(xhr.responseText);
    console.log(rawData);
    for (let k in rawData){
      if (rawData[k].username=== user){
        status = 1;
        userData = JSON.parse(rawData[k].data);
      } 
      if (rawData[k].gender=== "boy"){
        dataBoy.push([rawData[k].username,rawData[k].data,rawData[k].text.slice(3),rawData[k].text.slice(0,3)]);
      } else {
        dataGirl.push([rawData[k].username,rawData[k].data,rawData[k].text.slice(3),rawData[k].text.slice(0,3)]);
      }
      
    }
    if (status === 1){
      match();
      if (countDownDate.getTime() < (new Date).getTime()){
        finalMatch();
      } else {
        mainDiv.innerHTML += "<h3>一一配對結果</h3>";
        mainDiv.innerHTML += "本功能利用配對演算法，將契合度最高的男女生們一一配對，每位使用者只會配對到一位對象，而對方的配對結果也會顯示你😀<br>比遊戲還刺激，敬請期待！<br><br>";
        mainDiv.innerHTML += "<span style='color:red'>一一配對結果將於 <i>"+countDownDate+"</i> 統一公布</span>";
      }
      
    } else {
      if (formLock === true){
        mainDiv.innerHTML += "問卷功能目前尚未開放，敬請見諒";
        //createForm();
      } else {
        //mainDiv.innerHTML += "問卷功能目前尚未開放，敬請見諒";
        createForm();
      }  
        
    }
  };
};
getData();

//send data
function sendData(dataString){
  if (gender === ''){
    gender = 'boy';
  }
  let params = "1000021="+user+ "&1000022="+gender+ "&1000023="+dataString+"&1000024="+classes+text;
  let xhr = new XMLHttpRequest;
  xhr.open("POST","https://ap3.ragic.com/ddm4534/ragicsales/5?api");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);
  xhr.onload = function(){
    window.location.href = 'https://nehs-match.h811021.repl.co/index.php';
  };
};