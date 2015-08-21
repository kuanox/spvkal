<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>..:: PGV MRAMS ::..</title>
	
	<script language="javascript" type="text/javascript" src="js/jquery.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.flot.js"></script>


	<link rel="stylesheet" type="text/css" href="src/DateTimePicker.css" />
	<script type="text/javascript" src="src/DateTimePicker.js"></script>
	
</head>

<body onload="LoadResetValor1()" link="#000000", vlink="#000000" alink="#000000">

 	<style type="text/css">

		body {
		    background-color: #FFFFFF;
		} 

		.tftable {font-size:12vm;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
		.tftable th {font-size:2vw;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
		.tftable tr {background-color:#d4e3e5;}
		.tftable td {font-size:2vw;border-width: 1px;padding: 2px;border-style: solid;border-color: #729ea5;}
		.tftable tr:hover {background-color:#ffffff;}

		.myButton {
			-moz-box-shadow: 0px 5px 14px -7px #276873;
			-webkit-box-shadow: 0px 5px 14px -7px #276873;
			box-shadow: 0px 5px 14px -7px #276873;
			background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #599bb3), color-stop(1, #408c99));
			background:-moz-linear-gradient(top, #599bb3 5%, #408c99 100%);
			background:-webkit-linear-gradient(top, #599bb3 5%, #408c99 100%);
			background:-o-linear-gradient(top, #599bb3 5%, #408c99 100%);
			background:-ms-linear-gradient(top, #599bb3 5%, #408c99 100%);
			background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
			filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bb3', endColorstr='#408c99',GradientType=0);
			background-color:#599bb3;
			-moz-border-radius:8px;
			-webkit-border-radius:8px;
			border-radius:8px;
			display:inline-block;
			cursor:pointer;
			color:#ffffff;
			font-family:Arial;
			font-size:2vm;
			font-weight:bold;
			padding:13px 32px;
			text-decoration:none;
			text-shadow:0px 1px 0px #3d768a;
		}
		.myButton:hover {
			background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #408c99), color-stop(1, #599bb3));
			background:-moz-linear-gradient(top, #408c99 5%, #599bb3 100%);
			background:-webkit-linear-gradient(top, #408c99 5%, #599bb3 100%);
			background:-o-linear-gradient(top, #408c99 5%, #599bb3 100%);
			background:-ms-linear-gradient(top, #408c99 5%, #599bb3 100%);
			background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
			filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#408c99', endColorstr='#599bb3',GradientType=0);
			background-color:#408c99;
		}
		.myButton:active {
			position:relative;
			top:1px;
		}
		.checkboxs{
        	display:none;
        }

        img {
			font-size: 2vw;
		}
        p {
			font-size: 2vw;
		}
        tr {
			font-size: 2vw;
		}
		th {
			font-size: 2vw;
		}
		td {
			font-size: 2vw;
		}
		input {
			font-size: 2vw;
		}

	</style>

	<script>

		function changeTest ( form ) { 
				var fechaBuacar1 = document.formu.fecha1.value;
   				var fechaBuacar2 = document.formu.fecha2.value;
				// 24-07-2015 18:00
				
				var dia1					= fechaBuacar1.substring(0, 2);
				var mes1  					= fechaBuacar1.substring(3, 5);
				var ano1  					= fechaBuacar1.substring(6, 10);
				var horaMinSeg1  			= fechaBuacar1.substring(11, 20);
				var dia2					= fechaBuacar2.substring(0, 2);
				var mes2  					= fechaBuacar2.substring(3, 5);
				var ano2  					= fechaBuacar2.substring(6, 10);
				var horaMinSeg2  			= fechaBuacar2.substring(11, 20);
				var fechaHoraBuscarInicio 	= ano1 + "-" + mes1 + "-"+ dia1 + " " + horaMinSeg1;
				var fechaHoraBuscarFinal  	= ano2 + "-" + mes2 + "-"+ dia2 + " " + horaMinSeg2;

				if (fechaBuacar1 != '' && fechaBuacar2 != ''){
					var flag 				= 0;
					LoadSetValoresGrafico(fechaHoraBuscarInicio, fechaHoraBuscarFinal, flag);
				}
		} 

  	</script>

	<table id="idxtbl1" class="tftable" align="center">
		<tr>
	     	<td align="center" ><img src="images/ImagenSPV.jpg" width="50%" height="50%"></td>
		</tr>
	</table>
	<table id="idxtbl2" class="tftable" align="center">
		<tr>
			<th id="val1_txt0"></th>
			<td id="val1_txt1"></td>
			<td id="val1_txt2"></td>

		</tr>
		<tr>
			<th id="val2_txt0"></th>
			<td id="val2_txt1"></td>
			<td id="val2_txt2"></td>
		</tr>
		<tr>
			<th id="val3 txt0"></th>
			<td id="val3_txt1"></td>
			<td id="val3_txt2"></td>
		</tr>
	</table>	

	<div id="dtBox"></div>	
	
	<script type="text/javascript">
	
		$(document).ready(function()
		{
			$("#dtBox").DateTimePicker(
			{
				dateFormat: "dd/MMM/yyyy"
			});
		});
	
	</script>

	<table id="idxtbl3" class="tftable" height="10%" align="center">
		<form method="GET" name="formu" id="formu" >
			<tr>
	 	     	<td align="left" ><p>Inicio: <input name="fecha1" id="fecha1" onchange="changeTest(this.form)" type="text" data-field="datetime" readonly></p></td>
		     	<td align="right"><p>Final: <input name="fecha2" id="fecha2" onchange="changeTest(this.form)" type="text" data-field="datetime" readonly></p></td>
			</tr>
		</form>
	</table>
	<div class="demo-container">
		<div id="placeholder" aling='left' style="font-size:2vw;width:100%;height:150px;"></div>
		<p id="choices" class="checkboxs" style="float:right; width:135px;"></p>
	</div>
	<table id="idxtbl4" class="tftable" height="10%" align="center">
		<tr>
 	     	<td align="center" ><a href="#" class="myButton">Info</a></td>
	     	<td align="center" ><a href="#" class="myButton">Salir</a></td>
		</tr>
	</table>


<script src="js/ajax.js">
</script>


</body>
</html>
