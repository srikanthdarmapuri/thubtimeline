$(function(){
   $("#flag").find('.flag-item').popover({
   trigger: 'hover',
   placement: 'bottom',
  content: function(){return '<img src='+$(this).data('img') +'/>';}
});
//   $("#flag").find('.flag-item').webuiPopover({trigger:'hover', content:"<div style='float: left; width:30%;'  ><img src='/public/images/image4.jpg' alt='Seattle' width='100px';/></div><div class='speaker-dec' style='float: left; width:65%; padding:0 10px 10px 16px;'>Social commentator aspiring social entrepreneur and disruptive-thinker Adnane has committed his life to work in the MENA.</div>"});
   $('.select-img').on('change', function(){
         var formData = new FormData();
         var files = document.getElementById('add-img');
         files = files.files;
         formData.append('add-img', files[0],files[0].name);
         $.ajax({
            url: '/home/profile_pic',
            method: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $('.img-prvw').show();
                $('.img-prvw').html("<a class='chng-img'><p>Change Image</p></a><img src='/rado.jpg'>");
            }
        });
  });
  $('.form-img').on('click', '.chng-img', function(){
    
  });
    $( ".datetimepicker" ).datepicker({
      showOn: "button",
      buttonImage: "cal.png",
      buttonImageOnly: true,
      buttonText: "Select date"
    });
    
    
    $('#newtm-add').click(function(){
    var title = $('.tmln-title').val();
    var desc = $('.tmln-desc').val();
    var date = $('.tml-date').val();
    $.ajax({
            url: '/pasteurlhere',
            method: 'POST',
            data: {"tmln-title": title, "desc": desc, "date": date},
            success: function () {
            document.getElementById("myForm").reset();
            $('#tmln-bx').append("<div class='flag-item' data-toggle='popover'  data-content=''><img src='/flag.png'></div>");
            $("#tmln-bx").find('.flag-item').each(function(){
              var src = $('.img-prvw').find('img').attr('src');
              var cnt = '<p class = "popover-date">'+date+'</p><p>'+desc+'</p><img src='+src+'>';
              $(this).popover({ 
                  title : title,  
                  content: cnt,
                  html: true, 
                  trigger: 'click'
                });  
            }); 
            }
        });
    });
});