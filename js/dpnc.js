var template;
var myfile;
//alert(template);

  //$('#instA').focus();

  function loadTemplate(tempFile){
    //load template content
    var url = "templates/"+tempFile+".html";
    url += '?_=' + (new Date()).getTime();  //add timestamp to prevent cached template
    var jqxhr = $.get(url, function(data) {
                template = data;          
              }); 
  };

  function changeExtension(ext){
    var fname = $('#dpnFilename').val().split('.')[0];
    $('#dpnFilename').val(fname+'.'+ext);
  };

  function validateForm(){
    //alert($('#instA').val());
    //template = "";
    if (($('#instA').val() == "") || ($('#instA').val() == "Insert the covered entity's name")){
      $('#label-InstaA').addClass('error');
      $('#msg-InstaA').css('display','visible');
      $('#instA').focus();
    } else {
        //alert(template);
        var instA, instB, instC, instD, instE, instF, instG,  instH, entityName, temp ;
        instA = $('#instA').val();
        instB = preserveNewLine($('#instB').val());
        instC = preserveNewLine($('#instC').val());
        instD = preserveNewLine($('#instD').val());
        instE = preserveNewLine($('#instE').val());
        instF = $('#instF').val();
        instG = preserveNewLine($('#instG').val());
        instH = preserveNewLine($('#instH').val());
        entityName = "Digital Privacy Notice for "+instA;

        temp = template;

        temp = temp.replace('InstructionA-Data', instA);
        temp = temp.replace('InstructionB-Data', instB);

        if (instC != ""){
          temp = temp.replace('id="InstructionC-Div" style="display:none;"','id="InstructionC-Div" style="display:visible;"');
          temp = temp.replace('InstructionC-Data', instC);
        }
        
        if (instD != ""){
          temp = temp.replace('id="InstructionD-Div" style="display:none;"','id="InstructionD-Div" style="display:visible;"');
          temp = temp.replace('InstructionD-Data', instD);
        }
        
        if (instE != ""){
          temp = temp.replace('id="InstructionE-Div" style="display:none;"','id="InstructionE-Div" style="display:visible;"');
          temp = temp.replace('InstructionE-Data', instE);
        }

        if (instF!= ""){
          temp = temp.replace('id="InstructionF-Div" style="display:none;"','id="InstructionF-Div" style="display:visible;"');
          temp = temp.replace('InstructionF-Data', instF);
        }


        if (instG != ""){
          temp = temp.replace('id="InstructionG-Div" style="display:none;"','id="InstructionG-Div" style="display:visible;"');
          temp = temp.replace('InstructionG-Data', instG);
        }


        if (instH != ""){
          temp = temp.replace('id="InstructionH-Div" style="display:none;"','id="InstructionH-Div" style="display:visible;"');
          temp = temp.replace('InstructionH-Data', instH);
        }
        
        /*
        temp = temp.replace('Instruction-C', instC);
        temp = temp.replace('InstructionD-Data', instD);
        temp = temp.replace('InstructionE-Data', instE);
        temp = temp.replace('InstructionF-Data', instF);
        temp = temp.replace('InstructionG-Data', instG);
        temp = temp.replace('InstructionH-Data', instH);
        */
        temp = temp.replace('docTitle', entityName);

        return temp;     
      }                
    };

    //preserve line breaks
    function preserveNewLine(val){
      var newVal;
      newVal = val.replace(/\n/g, '<br>');
      return newVal;
    };

    // keyup activities on Instruction-A field
    $('#instA').keyup(function(){

      $('#label-InstaA').removeClass('error');
      $('#msg-InstaA').css('display','none');

      myfile = $('#instA').val();

     $('#dpnFilename').val(myfile);  

     //clean up any alert msgs at the top of the page
      $('#mainMsgRow').css('display','none');
      });

      $('#resetButton').click(function(){
        //$(this).closest('form').find("input[type=text], textarea").val("");
        //$('#mydpnForm')[0].reset();
        $('#mainMsgRow').css('display','none');
        //$('#instA').focus();
        location.reload(true);
      });

      /*
      //
      function search(){
        alert("search")
      };
      //
      function runKeyPressCreateNotice1(e){
        alert("Downloadify");
        if(e.keyCode == 13) {
         // alert('You pressed createnotice!');
          $("#downloadify").trigger('click');
          return false;  
        }else{
          return true;
        }
      };

      //
      function runKeyPressCreateNotice2(e){
        alert("reset");
        if(e.keyCode == 13) {
          alert('You pressed createnotice!');
          $("#resetButton").trigger('click');
          return false;  
        }else{
          return true;
        }
      };
      */


  //special char validation on all textareas
  $('textarea').keyup(function() {
    validateFormInput(this);
  });

  //special char validation on all textareas
  $('input').keyup(function() {
    validateFormInput(this);
  });

  //start joyride
  $('#guidemeDiv').click(function(){
    $(document).foundation('joyride', 'start');
  });
  
  //Foundation Datepicker
  $('#instF').fdatepicker({
    format: 'mm-dd-yyyy'
  });


  function validateFormInput(ele){
    var charecterReg;
    if ($(ele).is("input")){
      //charecterReg = /[<>\\"'+;~!@{}[\]|$%^&*\s/.,()#:+=]/g;
      charecterReg = /[<>\\"'+;~!@{}[\]|$%^&*/.,()#:+=]/g;
    } else {
      charecterReg = /[<>\\"+;~!{}[\]|$%^&*]/g;
    }
    var $th = $(ele);
    $th.val( $th.val().replace(charecterReg, function(str) {  
      return ''; 
    }));
  }

  function init(){
    // Downloadify Plugin instantiation
    Downloadify.create('downloadify',{
      filename: function(){
        return ($('#dpnFilename').val()+".html");
      },
      data: function(){ 
        return validateForm();
      },
      onComplete: function(){
       $('#mainMsgDiv').removeClass('alert');
        $('#mainMsgDiv').html('<b>Your customized notice of privacy practice "'+myfile+'".html has been saved on your local machine! <br> Please upload the html file to your website</b>');
        $('#mainMsgDiv').addClass('success');
        $('#mainMsgRow').css('display','visible');
        $(window).scrollTop($('#pageTop').offset().top);
        //template = ""; // clear template data
        //setTimeout(location.reload(true), 15000); 
      },
      onCancel: function(){ 
        $('#mainMsgDiv').html('<b>You have cancelled the saving of customized notice of privacy practice file.</b>'); 
        $('#mainMsgDiv').removeClass('success');
        $('#mainMsgDiv').addClass('alert');
        $('#mainMsgRow').css('display','visible'); 
        $(window).scrollTop($('#pageTop').offset().top);
      },
      onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); },
      swf: 'downloadify/media/downloadify.swf',
      downloadImage: 'downloadify/images/createnotice.jpg',
      width: 163,
      height: 53,
      transparent: true,
      append: false
    });
  };

  