
var datasetsAll 	= 	[];
var datasetsOne 	= 	[];
var alldata			=	[];
var datosTotales	=	[];
var subnames		=	[];
var nombre			=   [];
var valores 		= 	[];	

var fechaHoraBuscar = 	0;
var aux 			= 	0;
var cantidadMostrar	=	0;
var vienePrimeraVez = 	0;


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
	//console.log(limit);
	
	if (fechaHoraBuscar == 0) {
		vienePrimeraVez = 1;
		//fechaHoraBuscar = limit;
		today = new Date();
		//var fechaactual = today.format("dd-mm-yyyy");
		var fecha = new Date(Date.parse(today));
		fechaHoraBuscar = formatDate(fecha);
	}else{
		vienePrimeraVez = 2
		var re = '/';
		var result = valores[0][2].replace(re, "-");
		fechaHoraBuscar = result;
		fechaHoraBuscar = fechaHoraBuscar.replace(re, "-");
		dia  = fechaHoraBuscar.substring(0, 2);
		mes  = fechaHoraBuscar.substring(3, 5);
		ano  = fechaHoraBuscar.substring(6, 10);
		horaMinSeg  = fechaHoraBuscar.substring(11, 20);
		fechaHoraBuscar = ano + "-" + mes + "-"+ dia + " " + horaMinSeg;
		aux = aux +1;
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
				if (vienePrimeraVez == 1) {
					LoadSetValoresGrafico(fechaHoraBuscar);	
				}else{
					vienePrimeraVez = 2;
					LoadSetUltimoValorGrafico(fechaHoraBuscar);
				}
			}else{
				//fechaHoraBuscar = 0;
			}
		}
	}
	ajaxMenu.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores
			
	//ajaxMenu.send("trig="+1);	
	ajaxMenu.send("trig="+1+"&limit="+"'"+fechaHoraBuscar+"'");

	
	
}


function LoadSetValoresGrafico(fechaHoraBuscar){

	var index = 1;
	var cantidad  = 3000;
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

				for (z=0; z<alldata.length; z++){
					
					for (i=0; i<(alldata[z][1]).length; i++){
						//2015-07-24 17:01:46
						temp = alldata[z][1][i].split(",");
						dia  = temp[0].substring(8, 10);
						hora = temp[0].substring(11, 13);
						min  = temp[0].substring(14, 16);
						seg  = temp[0].substring(17, 19);
						horamin = dia + hora + min //+ ":" + seg;
						alldata[z][1][i] = new Array((horamin),parseFloat(temp[1]));
					}

				}
				datasetsAll = {	[ alldata[0][0] ]:{ label: alldata[0][0] , data: alldata[0][1]},
								[ alldata[1][0] ]:{ label: alldata[1][0] , data: alldata[1][1]},
								[ alldata[2][0] ]:{ label: alldata[2][0] , data: alldata[2][1]}
					  		  };

				//console.log('datasetsAll 0 :' + datasetsAll);
				//console.log(datasetsAll);
				//alert('datasetsAll')
				graficarDatos();
			}
		}
	}
	ajaxMenu2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//enviando los valores

	ajaxMenu2.send("trig="+index+"&limit="+"'"+fechaHoraBuscar+"'"+"&cantidad="+cantidad);
	// LLAMADA A LA BUSQUEDA DE ULTIMO DATO EN LAS TABLAS CORRECPOSNDIENTES
	//LoadSetUltimoValorGrafico();

}

var datoBuscar = '';
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
				updateGraphic();
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

	
var data = [];

function graficarDatos(){
	
		/*
		var datasets = {
			"usa": {
				label: "USA",
				data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
			},        
			"russia": {
				label: "Russia",
				data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
			},
			"uk": {
				label: "UK",
				data: [[1988, 62982], [1989, 62027], [1990, 60696], [1991, 62348], [1992, 58560], [1993, 56393], [1994, 54579], [1995, 50818], [1996, 50554], [1997, 48276], [1998, 47691], [1999, 47529], [2000, 47778], [2001, 48760], [2002, 50949], [2003, 57452], [2004, 60234], [2005, 60076], [2006, 59213]]
			}
		};
		*/
		/*
		var datasetsAll = {
			"usa": {
				label: "Nivel",
				data: [['10', 65], ['11', 64], ['12', 65], ['13', 64], ['14', 66], ['15', 67], ['16', 63], ['17', 68], ['18', 65], ['19', 67], ['20', 63], ['21', 65], ['22', 68], ['23', 62], ['24', 65], ['25', 68], ['26', 63], ['27', 64], ['28', 61]]
			},        
			"russia": {
				label: "Flijo",
				data: [['10', 35], ['11', 36], ['12', 33], ['13', 37], ['14', 37], ['15', 32], ['16', 33], ['17', 34], ['18', 34], ['19', 35], ['20', 34], ['21', 31], ['22', 30], ['23', 37], ['24', 39], ['25', 32], ['26', 34], ['27', 35], ['28', 35]]
			},
			"uk": {
				label: "Kalman",
				data: [['10', 50], ['11', 51], ['12', 51], ['13', 50], ['14', 52], ['15', 51], ['16', 53], ['17', 52], ['18', 51], ['19', 50], ['20', 52], ['21', 52], ['22', 53], ['23', 50], ['24', 51], ['25', 50], ['26', 51], ['27', 52], ['28', 50]]
			}
		};
		*/

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

		//choiceContainer.find("input").click(plotAccordingToChoices);
		
		//var data = [];

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
						min: 600,
						max: 1100
					},
					xaxis: {
						show: true
					}
				});
			}
			
		}
		/*
		var plot = $.plot("#placeholder", [ getRandomData() ], {
			series: {
				shadowSize: 0	// Drawing is faster without shadows
			},
			yaxis: {
				min: 0,
				max: 100
			},
			xaxis: {
				show: false
			}
		});
		*/

		plotAccordingToChoices();
}

function updateGraphic() {

			//var data = [];

			//if (cantidadMostrar < 3){

				//console.log('cantidadMostrar :' + cantidadMostrar);

				//console.log('data : ' + data);
				//console.log(data);

				var plot = $.plot("#placeholder", data, {
					series: {
						shadowSize: 2	// Drawing is faster without shadows
					},
					yaxis: {
						min: 600,
						max: 1100
					},					
					grid: {
						hoverable: true,
						clickable: true
					},
					xaxis: {
						show: true,
						tickDecimals: 2
					}

				});

				plot.setData(data);

				// Since the axes don't change, we don't need to call plot.setupGrid()

				//plot.draw();

				cantidadMostrar++;
			//}
			
		}
//LoadSetValoresGrafico();

