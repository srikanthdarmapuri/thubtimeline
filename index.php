<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>THUB Timeline</title>
    <!--<link rel="stylesheet" type="text/css" href="/css/jquery.datetimepicker.css" >-->
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <!--<script src="/js/jquery.datetimepicker.js"></script>-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <!--<link rel="stylesheet" href="/css/thubtimeline.css">-->
    <link rel="stylesheet" href="/css/timeline.css">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/bootstrap/css/saddahaq.css">
    <link rel="stylesheet" href="/bootstrap/css/saddahaq-ie7.css">
    <script src="/bootstrap/js/bootstrap.min.js"></script>
    <script src="/bootstrap/js/jquery-ui.min.js"></script>
    
  </head>
  <body>
  <h3>Add a new timeline event/activity</h3>
  <div class="thomln-form span7">
      <form id="myForm">
      <p>Title:</p>
      <input type="text" placeholder="Title of Event/Activity" id="newtm-ttl" name="newtm-ttl" class="tmln-input tmln-title"/>
      <p>Description:</p>
      <textarea rows= "3" id ="newtm-desc" name="newtm-desc" class="block tmln-input tmln-desc" placeholder="Brief description.."></textarea>
      <p>Date:</p>
      <input class="datetimepicker tmln-input tml-date" type="text" id="newtm-time">
      <!-- <div class="form-img"><input type="file" id="add-img" class="select-img"><i class="icon-add-image"></i><div class="img-prvw"><p>Change Image</p><img src=""></div></div> -->
        
     <div class="form-img" >
           
           <form name="image-upload" id="imageUpload" class="image-upload" method="post" enctype="multipart/form-data" action="https:localhost:8181/uimg">
           <input type="file" id="add-img" class="select-img"><i class="icon-add-image"></i><div class="img-prvw"><p>Change Image</p><img src=""></div>
           </form>
            
     </div>

      <p class="err-msg"></p>
  </form>
  <button class="btn btn-info" id="newtm-add">Add</button>
  </div>
  <div class="clearfix"></div>
        <!--<div class="flag-item"  data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</div>-->

  <div id="tmln-bx"><div style="position:absolute;"></div></div>
  </body>
  <!--<script src="/js/d3.js"></script>-->
  <!--<script src="/js/thubtimeline.js"></script>-->
  <script src="/js/timeline.js"></script>
  <script src="js/modernizr.custom.js"></script>
</html>
