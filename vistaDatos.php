<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Untitled Document</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<title>..:: PGV MRAMS ::..</title>
	
	<script language="javascript" type="text/javascript" src="js/jquery.js"></script>
	<script language="javascript" type="text/javascript" src="js/jquery.flot.js"></script>
	
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
  	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
  	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  	<link rel="stylesheet" href="/resources/demos/style.css">
	
</head>

<body onload="LoadResetValor1()" link="#000000", vlink="#000000" alink="#000000">

  <script>
  $(function() {
    $( "#datepicker" ).datepicker();
  });
  </script>

 	<style type="text/css">

		body {
		    background-color: #FFFFFF;
		} 

		.tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
		.tftable th {font-size:3vw;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
		.tftable tr {background-color:#d4e3e5;}
		.tftable td {font-size:3vw;border-width: 1px;padding: 2px;border-style: solid;border-color: #729ea5;}
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
			font-size:20px;
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

		th {
			font-size: 2vw;
		}
		td {
			font-size: 2vw;
		}


	</style>

	<table id="idxtbl" class="tftable" align="center">
		<tr>
	     	<td align="center" ><img src="images/ImagenSPV.jpg" width="50%" height="50%"></td>
		</tr>
	</table>
	<p>Date: <input type="text" id="datepicker"></p>
	<table id="idxtbl" class="tftable" align="center">
		<tr>
			<th id="val1_txt0">1</th>
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
	<div class="demo-container">
			<div id="placeholder" aling='left' style="width:100%;height:150px;"></div>
			<p id="choices" class="checkboxs" style="float:right; width:135px;"></p>
		</div>
	<table id="idxtbl" class="tftable" height="10%" align="center">
		<tr>
 	     	<td align="center" ><a href="#" class="myButton">Info</a></td>
	     	<td align="center" ><a href="#" class="myButton">Salir</a></td>
		</tr>
	</table>


<script src="js/ajax.js">
</script>


</body>
</html>
