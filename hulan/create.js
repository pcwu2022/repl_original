var ipt = document.getElementById("ipt");
var mdv = document.getElementById("mainText");
var sub = document.getElementById("submit");
var iv = ipt.value;
var n = [];//save things
var a;//save numbers
var b;//save numbers
var c;//save numbers
var d;//save numbers
var e;//save numbers
var par = [];
var ps = -1;
var keyL = true;
var usedIndexArr = [];
var usedIndexArrB = [];

var randomNum = function(max){
  return Math.floor(Math.random()*max);
}; 
var lowerCase = function(obj){
  return obj.charAt(0).toLowerCase() + obj.slice(1);
};
var upperCase = function(obj){
  return obj.charAt(0).toUpperCase() + obj.slice(1);
};
var contains = function(word, arr){
  word = lowerCase(word);
  var ret = -1;
  while (ret == -1){
    for (var i = 0; i < arr.length; i++){
      if (arr[i].indexOf(word) != -1){
        if (usedIndexArr.indexOf(i) !== -1){
            continue;
          } else {
            usedIndexArr.push(i);
          }
          return i;
      }
    }
    //cut the word to fit the search
    if (word[word.length-1] == " "){
      word = word.substr(1);
    } else if (word[0] == " "){
      word = word.substr(0, word.length-1);
    } else if (randomNum(5) > 3){
      word = word.substr(1);
    } else {
      word = word.substr(0, word.length-1);
    }
  }
  return ret;
}
var contains2D = function(word, arr){
  word = lowerCase(word);
  var ret = -1;
  while (ret == -1){
    for (var i = 0; i < arr.length; i++){
      for (var j = 0; j < arr[i].length; j++){
        if (arr[i][j].indexOf(word) != -1){
          if (randomNum(8) > 3){
            if (usedIndexArr.indexOf(i) !== -1){
              continue;
            } else {
              usedIndexArr.push(i);
            }
            return i;
          }
        }
      }
        
    }
    console.log(word);
    //cut the word to fit the search
    if (word[word.length-1] == " "){
      word = word.substr(1);
    } else if (word[0] == " "){
      word = word.substr(0, word.length-1);
    } else if (randomNum(5) > 3){
      word = word.substr(1);
    } else {
      word = word.substr(0, word.length-1);
    }
  }
  return ret;
}

var createQuote = function(){
  //a = randomNum(quote1[0].length);
  a = contains(iv, quote1[0]);
  n[0] = quote1[0][a];
  n[1] = quote1[1][a];
  b = randomNum(6);
  if ( b === 0){
    return (' ' + n[1] + ' once said, "' + n[0] + '."');
  } else if ( b === 1){
    return (' As the saying goes, "' + n[0] + '."');
  } else if ( b === 2){
    return (' "' + n[0] + '" says ' + n[1] + '.');
  } else if ( b === 3){
    return (' ' + n[1] + ' claimed, ' + lowerCase(n[0])  + '.');
  } else if ( b === 4){
    return (' As ' + n[1] + ' points out, ' + lowerCase(n[0]) + '.');
  } else {
    return (' People always say, "' + n[0] + '."');
  }
};
var afterQuote = function(){
  //a = randomNum(sen2.length);
  a = contains(iv, sen2);
  b = randomNum(conj1.length);
  n[0] = sen2[a];
  n[1] = conj1[b] + ", ";
  
  return (" " + n[0] + ".");
};
var addKeyword = function(){
  //a = randomNum(sen1.length);
  a = contains2D(iv, sen1);
  n[0] = sen1[a][0];
  n[1] = sen1[a][1];
  if (n[1][0] === "," || n[1][0] === "."){
    if (n[0] === ""){
      return (" " + upperCase(iv) + n[1]  + ".");
    }
    return (" " + n[0] + " " + iv + n[1]  + ".");
  } else {
    if (n[0] === ""){
      return (" " + upperCase(iv) + " " + n[1]  + ".");
    }
    if (n[1] === ""){
      return (" " + n[0] + " " + iv + ".");
    }
    return (" " + n[0] + " " + iv + " " + n[1]  + ".");
  }
};
//未完成
var addStart = function(){
  a = randomNum(sen1.length);
  n[0] = sen1[a][0];
  n[1] = sen1[a][1];
  n[2] = conj6[randomNum(conj6.length)];
  if (n[1][0] === "," || n[1][0] === "."){
    if (n[2] === ""){
      return (" " + upperCase(n[0]) + " " + iv + n[1]  + ".");
    }
    return (" " + upperCase(n[2])+ ", " + lowerCase(n[0]) + " " + iv + n[1]  + ".");
  } else {
    if (n[2] === ""){
      return (" " + upperCase(n[0]) + " " + iv + " " + n[1]  + ".");
    }
    if (n[1] === ""){
      return (" " + upperCase(n[2])+ ", " + n[0] + " " + iv + ".");
    }
    return (" " + upperCase(n[2])+ ", " + lowerCase(n[0]) + " " + iv + " " + n[1]  + ".");
  }
  
};
var pureBullshit = function(){
  //a = randomNum(sen3.length);
  a = contains(iv, sen3);
  b = randomNum(conj1.length);
  n[0] = sen3[a];
  n[1] = conj1[b];
  return (" " + n[1] + ", " + lowerCase(n[0]) + ".");
};
var conclusion = function(){
  a = randomNum(sen4.length);
  b = randomNum(conj4.length);
  n[0] = lowerCase(sen4[a][0]);
  n[1] = sen4[a][1];
  n[2] = conj4[b];
  if (n[1][0] === "," || n[1][0] === "."){
    return (" " + n[2] + ", " + n[0] + " " + iv + n[1]  + ".");
  } else {
    if (n[1] === ""){
      return (" " + n[2] + ", " + n[0] + " " + iv + ".");
    }
    return (" " + n[2] + ", " + n[0] + " " + iv + " " + n[1]  + ".");
  }
  
};
var title_ = function(){
  a = randomNum(title1.length);
  return( "<h4>" + title1[a] + " " + upperCase(iv) + "</h4>" );
};

var tab_ = function(){
  par[ps].innerHTML += "&nbsp&nbsp&nbsp&nbsp";
};
var createP = function(){
  ps++;
  par[ps] = document.createElement("p");
  mdv.appendChild(par[ps]);
};

var createHulan = function(){
  
  iv = ipt.value;
  usedIndexArr = [];
  if (keyL === false){
    mdv.innerHTML = "";
    keyL = true;
  }
  createP();
  
  par[ps].innerHTML += title_();
  tab_();
  if (randomNum(2) === 0){
    par[ps].innerHTML += addStart();
  } else {
    par[ps].innerHTML += createQuote();
    par[ps].innerHTML += afterQuote();
    par[ps].innerHTML += addKeyword();
  }
  if (randomNum(3) === 0){
    par[ps].innerHTML += pureBullshit();
    par[ps].innerHTML += addKeyword();
    par[ps].innerHTML += pureBullshit();
    par[ps].innerHTML += addKeyword();
  }
  par[ps].innerHTML += pureBullshit();
  par[ps].innerHTML += addKeyword();
  par[ps].innerHTML += pureBullshit();
  par[ps].innerHTML += addKeyword();
  par[ps].innerHTML += pureBullshit();
  par[ps].innerHTML += conclusion();
  if (iv === ""){
    mdv.innerHTML = "Type in a keyword first";
    keyL = false;
  }
  mdv.innerHTML += "<br>";
};
sub.addEventListener("click", createHulan);
document.body.addEventListener("keypress", function(e){
  if (e.key === "Enter"){
    createHulan();
  }
});