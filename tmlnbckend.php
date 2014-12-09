<?php 
error_reporting(E_ALL);


ini_set('display_errors', 1);

if($_POST["fun"] == "uimg"){

  $file = $_FILES['add-img'];
         $allowedExts = array("png", "jpg", "jpeg", "JPG", "JPEG");
         $temp = explode(".", $file["name"]);
         $extension = end($temp);
         $folder = "uploads/";
         if ((($file["type"] == "application/pdf") || ($file["type"] == "application/x-pdf") || ($file["type"] == "image/png") || ($file["type"] == "image/jpg") || ($file["type"] == "image/jpeg")|| ($file["type"] == "image/JPG") || ($file["type"] == "image/JPEG")) && ($file["size"] < 40000000) && in_array($extension, $allowedExts)) {
             if ($file["error"] > 0) {
                 $mpty = "Selece max one file" .$file['error'];
                 return $mpty;
             } else {
                  $name = $file["name"] . "<br>";
                  "Type: " . $file["type"] . "<br>";
                  "Size: " . ($file["size"] / 40000) . " kB<br>";
                  "Temp file: " . $file["tmp_name"] . "<br>";
                     $move = move_uploaded_file($file["tmp_name"], $folder . str_replace(" ", "-", $file['name']));
                      $folder . $file["name"];
                      if($move == true){
                     echo $retrnimg = "uploads/".$file['name'];
                     return $retrnimg;
                      }else{
                          echo "Somthing wrong while uploading image";
                      }
             }
         } else {
             echo $invalid =  'Invalid image format. Only pdf, jpg, jpeg, and png are allowed.';
                 return $invalid; 
         }

}
else if($_POST["fun"] == "ejson"){

    $file = "json/testing.json";
    if(isset($_POST))
    {
        $postedHTML = $_POST['cnt']; // You want to make this more secure!
        file_put_contents($file, $postedHTML);
    }

}