<?php
  if (isset($_COOKIE["cc_username"])){
    echo "<script>";
    echo "let user ='". $_COOKIE["cc_username"] ."';";
    echo "let gender ='". $_COOKIE["cc_gender"] ."';";
    echo "let text ='". $_COOKIE["cc_text"] ."';";
    echo "let classes ='". $_COOKIE["cc_classes"] ."';";
    echo "</script>";
  } else {
    if ($_POST["username"] == ""){
      echo "<script>window.location.href='https://nehs-match.h811021.repl.co/login.php'</script>";
    } else {
      setcookie("cc_username", $_POST["username"], time() + 10*86400);
      setcookie("cc_gender", $_POST["gender"], time() + 10*86400);
      setcookie("cc_text", $_POST["text"], time() + 10*86400);
      setcookie("cc_classes", $_POST["classes"], time() + 10*86400);
      echo "<script>";
      echo "let user ='". $_POST["username"] ."';";
      echo "let gender ='". $_POST["gender"] ."';";
      echo "let text ='". $_POST["text"] ."';";
      echo "let classes ='". $_POST["classes"] ."';";
      echo "</script>";
    }
  } 
?>
<html>
  <head>
    <title>NEHS-MATCH</title>
    <meta name='viewport' 
     content='width=device-width'>
    <link rel = "stylesheet" href = "style.css">
  </head>
  <body>
    
    <div id = "main">
      <h2>NEHS-MATCH：最懂你的心理測驗</h2>
      <img src = "https://images.unsplash.com/photo-1573511860302-28c524319d2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" width = "0" height = "0">
    </div>
  </body>
  
  <script src = "script.js"></script>
</html>