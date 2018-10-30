$(document).ready(function(){
        
  var kmg;
  var kmf;
  $("#kmfinal").keyup(function(){    
    kmf = parseFloat($("#kmfinal").val());
    var kmi = parseFloat($("#kminicial").val());
    var km; 
    var qtd = kmf.length;
    $('#kmrodados').val('0 Km');
    $('#btnat').hide();
    if(kmf>kmi){  
     $('#texto').show();
     $('#btnat').show();
     km  = kmf - kmi;
     kmg  = kmf - kmi;
      $("#kmrodados").val(km+" Km");
    }
    else
    {
     $("#kmrodados").val(); 
    }
  });
  $("#btnat").click(function(){    
    var id = getUrlVars()["id"];
    
         $.ajax({
              url: 'http://aplicativo.samuteles.com/webservice.php',
              method: "POST",
               data: {"tipo" : "atualizarkm", "id" : id, "km" : kmg},
              success: function(data) {
                var id = getUrlVars()["id"];
                $.ajax({
              url: 'http://aplicativo.samuteles.com/webservice.php',
              method: "POST",
              data: {"tipo" : "listakm", "id" : id},
              success: function(data) {                                   
                 var json = $.parseJSON(data);
                 $("#kminicial").val(json.KmAtual +' Km');                               
              },              
              timeout: 3000,    
              error:  error: function(jqXHR, exception){
          alert("Erro ao fazer a requisição: "+jqXHR.status);
                }              
              });          
              },              
              timeout: 3000,    
               error: function(jqXHR, exception){
          alert("Erro ao fazer a requisição: "+jqXHR.status);
          }              
    });
         $('#texto').hide();
         $('#btnat').hide();
         $("#kmfinal").val("");
         
         $("#alert").css("display","block");

         $('#alert').addClass('animated bounceIn');
         setTimeout(function() {$('#alert').removeClass('animated bounceIn');}, 1000);
         setTimeout(function() {$("#alert").css("display","none");}, 2500);
         });
        $("#btntela").click(function(){
         var valor = getUrlVars()["id"];
         window.location.href = "listagem.html?id="+valor;
       });

       $("#listagem").click(function() {
            $('#atualizar').fadeOut('fast',function(){
            $('#listar').fadeIn('fast');
            });  
          //setTimeout(function() {$("#atualizar").css("display","none");},200);
          
           // setTimeout(function() {$("#listar").css("display","block");},500);
          // $('#listar').show();          
             
        });
  $("#pagatualizar").click(function() {
    $('#listar').fadeOut('fast',function(){
            $('#atualizar').fadeIn('fast');
           });
            // $('#listar').hide();  
          // setTimeout(function() {$("#listar").css("display","none");},200);
          
          // setTimeout(function() {$("#atualizar").css("display","block");},500);
          // $('#atualizar').show();
          

        });
      $("#sair").click(function() {
         window.location.href = "index.html";
        });
        var id = getUrlVars()["id"];
        $.ajax({

              url: 'http://aplicativo.samuteles.com/swebservice.php',
              method: "POST",
              data: {"tipo" : "consultapeca", "id" : id},
              dataType: "json",
              success: function(data) {                                   
                  $('#ConsultaPeca').html("");
                  var acumul = "";

                  for (var i = 0; i < data.length; i++)
                  {
                    var kmf,resultado;
                    kmf = data[i].KmAtual - data[i].KmTroca;
                    resultado = 100 - ((kmf/data[i].KmLimiite)*100);


                    if (resultado<=5) {
                    acumul += '<tr  style="text-align: center;">';
                    acumul += '<td>'+data[i].NomePeca+'</td>';             
                    acumul += '</tr>';

                  }
                  
                  $("#ConsultaPeca").append(acumul);
                  acumul="";
              }
            //Adicionando conteúdo acumulado no DIV Resultado
                                    
              },              
              timeout: 3000,    
               error: function(jqXHR, exception){
          alert("Erro ao fazer a requisição: "+jqXHR.status);
          }
          });
      });