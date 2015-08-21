
var datasetsAll 			= 	[];
var datasetsOne 			= 	[];
var alldata					=	[];
var datosTotales			=	[];
var subnames				=	[];
var nombre					=   [];
var valores 				= 	[];
var data 					=	[];	
var fechaHoraBuscar 		= 	0;
var fechaHoraBuscarInicio 	= 	0;
var fechaHoraBuscarFinal	=	0;
var aux 					= 	0;
var cantidadMostrar			=	0;
var vieneTablaOaGrafico 	= 	0;
var datosGraficPrimeraVez 	= 	0;
var valorMaximoGrafico 		= parseFloat("0");
var valorMinimoGrafico 		= parseFloat("0");
var valorAnteriorGrafico	= parseFloat("0");


function objetoAjax(){
	var xmlhttp=false;
	try
	{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e)
		{
			try
			{ 
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E)
				{ 
					xmlhttp = false;
				}
		}

	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}

	return xmlhttp;
}

//Formats d to MM/dd/yyyy HH:mm:ss format // MENOS UNA HORA - ESTO AL COMIENZO, PARA QUE GRAFIQUE UNA HORA
function formatDateMenosUnaHora(d){
  function addZero(n){
     return n < 10 ? '0' + n : '' + n;
  }

    return d.getFullYear() + "-" + addZero(d.getMonth()+1)+"-"+ addZero(d.getDate())   + " " + 
           addZero(d.getHours()-1) + ":" + addZero(d.getMinutes()-1) + ":" + addZero(d.getSeconds());
}

//Formats d to MM/dd/yyyy HH:mm:ss format
function formatDate(d){
  function addZero(n){
     return n < 10 ? '0' + n : '' + n;
  }

    return d.getFullYear() + "-" + addZero(d.getMonth()+1)+"-"+ addZero(d.getDate())   + " " + 
           addZero(d.getHours()) + ":" + addZero(d.getMinutes()-1) + ":" + addZero(d.getSeconds());
}

function LoadResetValor1()
{
	var re;
	var result;
	//console.log(limit);
	if (fechaHoraBuscarInicio == 0) {

		vieneTablaOaGrafico 		= 1;
		//fechaHoraBuscar = limit;
		today 						= new Date();
		//var fechaactual 			= today.format("dd-mm-yyyy");
		var fecha 					= new Date(Date.parse(today));
		fechaHoraBuscarInicio 		= formatDateMenosUnaHora(fecha);
		fechaHoraBuscarFinal  		= formatDate(fecha);

		ano1  = fechaHoraBuscarInicio.substring(0, 4);
		mes1  = fechaHoraBuscarInicio.substring(5, 7);
		dia1  = fechaHoraBuscarInicio.substring(8, 10);
		fecha1 = dia1 + "-" + mes1 + "-"+ ano1;
		hora1 = fechaHoraBuscarInicio.substring(11, fechaHoraBuscarInicio.length);
		document.formu.fecha1.value = fecha1 + " " + hora1;

		ano2  = fechaHoraBuscarFinal.substring(0, 4);
		mes2  = fechaHoraBuscarFinal.substring(5, 7);
		dia2  = fechaHoraBuscarFinal.substring(8, 10);
		fecha2 = dia2 + "-" + mes2 + "-"+ ano2;
		hora2 = fechaHoraBuscarFinal.substring(11, fechaHoraBuscarFinal.length);
		document.formu.fecha2.value = fecha2 + " " + hora2;
		//fechaHoraBuscarInicio 	= '2015-07-24 17:00:06';
		//fechaHoraBuscarFinal 	= '2015-07-24 17:00:06'
	}else{
		vieneTablaOaGrafico = 2
		//console.log('ENTRA A fechaHoraBuscarInicio distinto de  0');
		/*
		re 						= '/';
		result 					= valores[0][2].replace(re, "-");
		fechaHoraBuscar 		= result;
		fechaHoraBuscar 		= fechaHoraBuscar.replace(re, "-");
		dia 					= fechaHoraBuscar.substring(0, 2);
		mes  					= fechaHoraBuscar.substring(3, 5);
		ano  					= fechaHoraBuscar.substring(6, 10);
		horaMinSeg  			= fechaHoraBuscar.substring(11, 20);

		fechaHoraBuscarInicio 	= ano + "-" + mes + "-"+ dia + " " + horaMinSeg;
		fechaHoraBuscarFinal  	= ano + "-" + mes + "-"+ dia + " " + horaMinSeg;
		*/
		aux 					= aux +1;
	}

	divResultado11 = document.getElementById('val1_txt0');
	divResultado12 = document.getElementById('val1_txt1');
	divResultado13 = document.getElementById('val1_txt2');

	divResultado21 = document.getElementById('val2_txt0');
	divResultado22 = document.getElementById('val2_txt1');
	divResultado23 = document.getElementById('val2_txt2');

	divResultado31 = document.getElementById('val3 txt0');
	divResultado32 = document.getElementById('val3_txt1');
	divResultado33 = document.getElementById('val3_txt2');
	
	//instanciamos el objetoAjax
	setTimeout(function(){LoadResetValor1()},10000);
	ajaxMenu=objetoAjax(); 
	ajaxMenu.open("POST", "setMode1.php", true);
	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//mostrar resultados en esta capa
			respuesta = ajaxMenu.responseText;
			if(respuesta.length > 1){

				res = respuesta.split("|");			
				
				valores = [];			
				//console.log('res.length : ' + res.length);
				for (i=0; i<res.length; i++){
					valores[i] = res[i].split(";");
				}

				temp = [];
				for (i=0; i<(valores).length; i++){
						ano  = valores[i][2].substring(0, 4);
						mes  = valores[i][2].substring(5, 7);
						dia  = valores[i][2].substring(8, 10);
						fecha = dia + "/" + mes + "/"+ ano;
						hora = valores[i][2].substring(11, valores[i][2].length);
						valores[i][2] = fecha + " " + hora;
				}			
				divResultado31.innerHTML = valores[2][0];
				divResultado32.innerHTML = valores[2][1];
				divResultado33.innerHTML = valores[2][2];

				divResultado11.innerHTML = valores[0][0];
				divResultado12.innerHTML = valores[0][1];
				divResultado13.innerHTML = valores[0][2];

				divResultado21.innerHTML = valores[1][0];
				divResultado22.innerHTML = valores[1][1];
				divResultado23.innerHTML = valores[1][2];
				//alert(respuesta);
				
				if (vieneTablaOaGrafico == 1) {
					LoadSetValoresGrafico(fechaHoraBuscarInicio, fechaHoraBuscarFinal, 1);	
				}else{
					vieneTablaOaGrafico = 2;
					//LoadSetUltimoValorGrafico(fechaHoraBuscar);
					LoadSetValoresGrafico(fechaHoraBuscarInicio, fechaHoraBuscarFinal, 1);
				}
			}
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores

	//console.log('ENTRA CON fechaHoraBuscarFinal :' + fechaHoraBuscarFinal);
	//console.log(fechaHoraBuscarFinal);
	ajaxMenu.send("trig="+1+"&limit="+"'"+fechaHoraBuscarFinal+"'");	
	
}


function LoadSetValoresGrafico(fechaHoraBuscarInicioVista, fechaHoraBuscarFinalVista, flag){

	var index 					= 1;
	var cantidad  				= 3000;	
	var primeraFechaIngresada 	= 0;
	var ultimaFechaIngresada 	= 0;
	ajaxMenu2=objetoAjax(); 
	ajaxMenu2.open("POST", "setMode2.php", true);
	ajaxMenu2.onreadystatechange=function() {
		if (ajaxMenu2.readyState==4) {
			//mostrar resultados en esta capa
			respuesta = ajaxMenu2.responseText;
			if(respuesta){
				res = respuesta.split("|");	
				for (i=0; i<res.length; i++){
					alldata[i]	=	(res[i]).split(";[");
					alldata[i][1]	=	alldata[i][1].substring(0, alldata[i][1].length-1);
				}
				for (i=0; i<alldata.length; i++){
					alldata[i][1]	=	(alldata[i][1]).split("],[");
				}
				temp = new Array();
				datos = new Array();
				datosTotales = new Array(datos);				

				valorMinimoGrafico = 0;
				valorMaximoGrafico = 0;

				for (z=0; z<alldata.length; z++){
					
					for (i=0; i<(alldata[z][1]).length; i++){
						//2015-07-24 17:01:46
						temp = alldata[z][1][i].split(",");
						dia  = temp[0].substring(8, 10);
						hora = temp[0].substring(11, 13);
						min  = temp[0].substring(14, 16);
						seg  = temp[0].substring(17, 19);
						horamin = dia + hora + min;// + seg;
						if (primeraFechaIngresada == 0)
							primeraFechaIngresada = temp[0];
						ultimaFechaIngresada = temp[0];
						alldata[z][1][i] = new Array((horamin),parseFloat(temp[1]));
						//console.log('horamin : ' + temp[0] + ' temp[1] : ' + temp[1]);
						if (valorMaximoGrafico == 0){valorMaximoGrafico = temp[1]}
						if (valorMinimoGrafico == 0){valorMinimoGrafico = temp[1]}
						if (valorMaximoGrafico < temp[1]){
							valorMaximoGrafico =  temp[1];
						}
						if (valorMinimoGrafico > temp[1]){
							valorMinimoGrafico =  temp[1];
						}
					}

				}

				/*
				console.log('valorMinimoGrafico');
				valorMinimoGrafico = parseInt(valorMinimoGrafico) + 100;
				console.log(valorMinimoGrafico);
				console.log('valorMaximoGrafico');
				valorMaximoGrafico = parseInt(valorMaximoGrafico) + 100;
				console.log(valorMaximoGrafico);
				*/
				

				datasetsAll = [];
				datasetsAll = {	[ alldata[0][0] ]:{ label: alldata[0][0] , data: alldata[0][1]},
								[ alldata[1][0] ]:{ label: alldata[1][0] , data: alldata[1][1]},
								[ alldata[2][0] ]:{ label: alldata[2][0] , data: alldata[2][1]}
					  		  };

				if (flag == 1){ // viene de LoadResetValor1
					//console.log('------1------ ENTRA A CAMBIAR LOS DATOS ------1-----');
					fechaHoraBuscarInicio = primeraFechaIngresada;
					fechaHoraBuscarFinal  = ultimaFechaIngresada;

					ano1  = primeraFechaIngresada.substring(0, 4);
					mes1  = primeraFechaIngresada.substring(5, 7);
					dia1  = primeraFechaIngresada.substring(8, 10);
					fecha1 = dia1 + "-" + mes1 + "-"+ ano1;
					hora1 = primeraFechaIngresada.substring(11, primeraFechaIngresada.length);
					document.formu.fecha1.value = fecha1 + " " + hora1;

					ano2  = ultimaFechaIngresada.substring(0, 4);
					mes2  = ultimaFechaIngresada.substring(5, 7);
					dia2  = ultimaFechaIngresada.substring(8, 10);
					fecha2 = dia2 + "-" + mes2 + "-"+ ano2;
					hora2 = ultimaFechaIngresada.substring(11, ultimaFechaIngresada.length);
					document.formu.fecha2.value = fecha2 + " " + hora2;
				}

				//console.log('datasetsAll 0 :' + datasetsAll);
				//console.log(datasetsAll);ultimaFechaIngresada
				//alert('datasetsAll')
				//graficarDatos();
				updateGraphic();
			}
		}
	}
	ajaxMenu2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
	fechaHoraBuscarInicio 	= fechaHoraBuscarInicioVista;
	fechaHoraBuscarFinal 	= fechaHoraBuscarFinalVista;

	ajaxMenu2.send("trig="+index+"&limitIni="+"'"+fechaHoraBuscarInicio+"'"+"&limitFin="+"'"+fechaHoraBuscarFinal+"'");
	// LLAMADA A LA BUSQUEDA DE ULTIMO DATO EN LAS TABLAS CORRECPOSNDIENTES
	//LoadSetUltimoValorGrafico();

}

// NO SE ESTA USANDO ACTUALMENTE
/*
function LoadSetUltimoValorGrafico(fechaHoraBuscar){

	var index 	= 2;
	//instanciamos el objetoAjax
	//setTimeout(function(){LoadSetUltimoValorGrafico()},2000);
	ajaxMenu3=objetoAjax(); 
	ajaxMenu3.open("POST", "setMode2.php", true);
	ajaxMenu3.onreadystatechange=function() {
		if (ajaxMenu3.readyState==4) {

			//mostrar resultados en esta capa
			respuesta = ajaxMenu3.responseText;
			if(respuesta){
				res = respuesta.split("|");	

				temp = [];
				for (i=0; i<res.length; i++){
					temp[i]		=	(res[i]).split(";");
					temp[i][1]	=	temp[i][1].substring(0, temp[i][1].length-1);
				}

				fechaHora = [];
				datoIngresar = [];

				for (i=0; i<temp.length; i++){
						fechaHora = temp[i][2].split(",");
						dia  = fechaHora[0].substring(8, 10);
						hora = fechaHora[0].substring(11, 13);
						min  = fechaHora[0].substring(14, 16);
						seg  = fechaHora[0].substring(17, 19);
						horamin = dia + hora + min //+ ":" + seg;
						datoIngresar[i] = new Array(temp[i][0], (horamin), parseFloat(temp[i][1]));

				}
				for (z=0; z<alldata.length; z++){				
						alldata[z][1][alldata[z][1].length] = new Array(datoIngresar[z][1],datoIngresar[z][2]);
				}
				datasetsAll = {	[ alldata[0][0] ]:{ label: alldata[0][0] , data: alldata[0][1]},
								[ alldata[1][0] ]:{ label: alldata[1][0] , data: alldata[1][1]},
								[ alldata[2][0] ]:{ label: alldata[2][0] , data: alldata[2][1]}
					  		  };
				
				//console.log('datasetsAll 3:' + datasetsAll);
				//console.log(datasetsAll);
				//alert('datasetsAll')
				//updateGraphic();
				//alert("respuesta 3");
			}
		}
	}
	ajaxMenu3.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores		
	if (fechaHoraBuscar){
		if (fechaHoraBuscar.substring(2, 3) == '/' ){
			//24/07/2015 17:01:46
			dia  = fechaHoraBuscar.substring(0, 2);
			mes  = fechaHoraBuscar.substring(3, 5);
			ano  = fechaHoraBuscar.substring(6, 10);
			horaMinSeg  = fechaHoraBuscar.substring(11, 20);
			fechaHoraBuscar = ano + "-" + mes + "-"+ dia + " " + horaMinSeg;			
		}
	}
	ajaxMenu3.send("trig="+index+"&limit='"+fechaHoraBuscar+"'"+"&cantidad="+1);

}
*/

function LoadResetV()
{
	divResultado = document.getElementById('reset_tst');
	//instanciamos el objetoAjax
	ajaxMenu=objetoAjax(); 

	ajaxMenu.open("POST", "setvMode.php",true);

	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//mostrar resultados en esta capa
			divResultado.innerHTML = ajaxMenu.responseText;
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("cc="+tmp1+" " +tmp2);		
	ajaxMenu.send("reset="+1);

}

function LoadResetC()
{
	divResultado = document.getElementById('reset_tst');

	//instanciamos el objetoAjax
	ajaxMenu=objetoAjax(); 

	ajaxMenu.open("POST", "setcMode.php",true);

	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//mostrar resultados en esta capa
			divResultado.innerHTML = ajaxMenu.responseText;
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("cc="+tmp1+" " +tmp2);		
	ajaxMenu.send("reset="+1);

}

function LoadResetU()
{
	divResultado = document.getElementById('reset_tst');

	//instanciamos el objetoAjax
	ajaxMenu=objetoAjax(); 

	ajaxMenu.open("POST", "setuMode.php",true);

	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//mostrar resultados en esta capa
			divResultado.innerHTML = ajaxMenu.responseText;
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("cc="+tmp1+" " +tmp2);		
	ajaxMenu.send("reset="+1);

}
var running = 0;
var movil = 1;

function startScanPiso(cmd,panel)
{
	running = cmd;
	if (cmd == 0)
	{
		movil = 1;
		return;
	}

	if ((running > 0) && (panel !=0)) setTimeout(function(){startScanPiso(running, panel)},100);

	drawTD(movil, panel);
	movil = movil + 1;
	if (movil > 50)
	{
		movil = 1;
	}
}


function drawTD(m,p)
{
	var r = "text";
//	var ph=48+p;
//	divResultado = document.getElementById("panel");
	ajaxMenu=objetoAjax(); 
//alert("m="+m+" p="+p);
	ajaxMenu.open("POST", "getTD.php",true);

	ajaxMenu.onreadystatechange=function()
	{
		if (ajaxMenu.readyState==4)
		{
			//mostrar resultados en esta capa
			r = ajaxMenu.responseText;
//			alert(r);
			if (r !== "") // So we don't write nulls to the div
			{ // Create a new div and write to it
				var table=document.getElementById("paneltable");
				var column=table.getElementsByClassName("panelview"+p);
//				alert("panelview"+p+"r"+r);
				var newdiv=document.createElement("div");
				var chkdiv = document.getElementById("panel"+m);
//*				alert("panel"+m+" "+chkdiv);
				if( chkdiv === null)
				{
//*				alert("didn't previously exist");
					column[0].appendChild(newdiv);
					newdiv.id = "panel"+m;
					newdiv.innerHTML = r;
				}
				else chkdiv.innerHTML = r;
			}
//			divResultado.innerHTML = ajaxMenu.responseText;
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("m="+m);		
	ajaxMenu.send("m="+m+"&p="+p);

}

function settable1(p)
{
	var table=document.getElementById("paneltable");
	table.style.width = screen.width;
	var column=table.getElementsByClassName("panelview"+p);
	column[0].style.width = screen.width*0.8;
}

function settable2()
{
	var table=document.getElementById("stattable");
	table.style.width = screen.width;
	var column=table.getElementsByClassName("statview");
	column[0].style.width = screen.width*0.8;
}

function setsize()
{
	var table=document.getElementById("idxtbl");
	table.style.width = screen.width;
//	var column=table.getElementsByClassName("panelview"+p);
//	column[0].style.width = screen.width*0.8;
}

function getTareas(u,n)
{
	timevar=setTimeout(function(){getTareas(u,n)},70);
	divResultado = document.getElementById("TareaDiv");
	newrow = document.createElement("tr");
	divResultado.appendChild(newrow);
	ajaxMenu=objetoAjax();
	ajaxMenu.open("POST", "getTareas.php",true);

	row= 0;
	ajaxMenu.onreadystatechange=function()
	{
		if (ajaxMenu.readyState==4)
		{
			//mostrar resultados en esta capa
			tit = ajaxMenu.responseText;
//			divResultado.innerHTML = ajaxMenu.responseText;

			cut = tit.search("STOP");
			if (cut>0)
			{
				clearTimeout(timevar);
				newrow.innerHTML = tit.slice(0,cut);
			}
			else newrow.innerHTML = tit;
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 
	ajaxMenu.send("u="+u+"&n="+n);

}

function upPriority(usr,pri)
{
	divResultado = document.getElementById("stattable");
	if (pri === 1) return;
	//instanciamos el objetoAjax
	ajaxMenu=objetoAjax(); 

	ajaxMenu.open("POST", "upPriority.php",true);

	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//Check result and call Home_Ops.php if OK
			tit=ajaxMenu.responseText;
			if( tit === "OK")
				window.location.href="pawnstat.php?m="+usr+"&i=APG";
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("cc="+tmp1+" " +tmp2);		
	ajaxMenu.send("u="+usr+"&p="+pri);
}

function dnPriority(usr,pri)
{
	divResultado = document.getElementById("stattable");
//	if (pri === 1) return;
	//instanciamos el objetoAjax
	ajaxMenu=objetoAjax(); 

	ajaxMenu.open("POST", "dnPriority.php",true);

	ajaxMenu.onreadystatechange=function() {
		if (ajaxMenu.readyState==4) {
			//Check result and call Home_Ops.php if OK
			tit=ajaxMenu.responseText;
			if( tit === "OK")
				window.location.href="pawnstat.php?m="+usr+"&i=APG";
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
	
//	alert("u="+usr+"&p="+pri);		
	ajaxMenu.send("u="+usr+"&p="+pri);
}

function procRMen(men)
{
	divResultado = document.getElementById(men);
	divResultado.innerHTML = "2000<br>-2100<br>-2200";
}

/***********************************************************/


function graficarDatos(){

		// hard-code color indices to prevent them from shifting as
		// countries are turned on/off

		var i = 0;
		$.each(datasetsAll, function(key, val) {
			val.color = i+2;
			++i;
		});

		// insert checkboxes		
		var choiceContainer = $("#choices");
		$.each(datasetsAll, function(key, val) {

			choiceContainer.append("<br/><input class='checkboxs' type='checkbox' name='" + key  +
				"' checked='checked' id='id" + key + "'>");

		});

		function plotAccordingToChoices() {

			//var data = [];

			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && datasetsAll[key]) {
					data.push(datasetsAll[key]);
				}
			});
					
			if (data.length > 0) {
				//console.log("data > " + data);
				//console.log(data);
				//alert("data > ");
				$.plot("#placeholder", data, {
					series: {
						shadowSize: 0	// Drawing is faster without shadows
					},
					yaxis: {
						min: 700,
						max: 800
					},
					xaxis: {
						show: true
					}
				});
			}
			
		}

		plotAccordingToChoices();
}

var choiceContainer = $("#choices");

function updateGraphic() {

			data = [];
			var i = 0;
				$.each(datasetsAll, function(key, val) {
					val.color = i+2;
					++i;
			});

			//console.log('vieneTablaOaGrafico : ' + vieneTablaOaGrafico);
			if (datosGraficPrimeraVez == 0){
				$.each(datasetsAll, function(key, val) {
				choiceContainer.append("<br/><input class='checkboxs' type='checkbox' name='" + key  +
					"' checked='checked' id='id" + key + "'>");
				});
				datosGraficPrimeraVez = 1;
			}

			choiceContainer.find("input:checked").each(function () {
				var key = $(this).attr("name");
				//console.log('key  22222 : ' + key);
				if (key && datasetsAll[key]) {
					//console.log('data 22222');
					//console.log(data);
					//alert('data 2222');
					data.push(datasetsAll[key]);
				}
			});

			console.log('valorMinimoGrafico');
			console.log(valorMinimoGrafico);
			console.log('valorMaximoGrafico');
			console.log(valorMaximoGrafico);

			var plot = $.plot("#placeholder", data, {
					series: {
						shadowSize: 2	// Drawing is faster without shadows
					},
					yaxis: {
						min: 700,
						max: 800
					},					
					grid: {
						hoverable: true,
						clickable: true
					},
					xaxis: {
						show: true,
						tickDecimals: 0
					}

				});

			plot.setData(data);
			
		}
//LoadSetValoresGrafico();

