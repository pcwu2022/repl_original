
<html>
  <head>
    <title>NEHS-MATCH</title>
    <meta name='viewport' 
     content='width=device-width'>
    <link rel = "stylesheet" href = "style.css">
  </head>
  <body>
    <div id = "main">
      <h2 id = "loginTitle">NEHS-MATCH：最懂你的心理測驗</h2>
      <div id = "instructions">
        歡迎來到NEHS-MATCH：最懂你的心理測驗！本測驗取材自各大心理測驗網站，並透過配對演算法為您找出所有玩家中和您最契合的那位。不知道每天相處的這群人中最了解你的是誰嗎？不曉得想衝一波的話該找誰下手嗎？想知道哪些從來沒互動過的同學中誰和自己價值觀最相近？還是想單純找個理由認識新朋友？NEHS-MATCH是您最好的選擇。趕快登入試試看吧！<br><br>註1：本測驗結果僅供娛樂用途，勿過度迷信。
      <br>註2：本站有使用Cookie進行資料儲存，若表單無法正常送出，請先將"封鎖第三方Cookie"功能關閉。
      </div>
      <br>
      <form method = "post" action = "https://nehs-match.h811021.repl.co/index.php" id = "form">
      請輸入暱稱以開始進行遊戲： <br>
        （建議使用容易辨識的暱稱，ex:IG帳號、綽號、英文姓名。勿使用表情符號）
        <br><input type = "text" name = "username">
      <br>
      性別：<input type = "radio" id = "gender" name = "gender" value = "boy">男<input type = "radio" id = "gender" name = "gender" value = "girl">女
      <br>
      班級：<select name = "classes">
        <option value="301">301</option>
        <option value="302">302</option>
        <option value="303">303</option>
      </select>
      <br>
      請輸入10字以上的簡介、聯絡方式，或狀態描述：<br>
        <textarea id = "text" type = "text" name = "text"></textarea><br>
      <input type = "submit">
      </form>
    </div>
  </body>
</html>