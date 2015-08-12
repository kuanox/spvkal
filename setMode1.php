<?php
//	session_start();
	include("functions.php");
	
	if (isset($_POST["trig"]))
	{
		$trig 	= 	$_POST["trig"];
		$limit 	= 	$_POST["limit"];
		//echo ($limit);
		if(($link = mysql_conexion()) != NULL)
		{
			// EST KALMAN
			//$sql = "SELECT * FROM `kal_est`";
			//$sql = "SELECT * FROM `kal_est` ORDER BY EST_TIME ASC LIMIT 1";
			$sql = "SELECT EST_NOMBRE, EST_VALOR, EST_TIME FROM `kal_est` WHERE EST_TIME > $limit  ORDER BY EST_TIME ASC LIMIT 1";
			$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
			
			$resultado = '';
			while ($fila = mysql_fetch_array($query)) {
				$resultado = $resultado . ($fila[0] . ';' . $fila[1] . ';' . $fila[2] . '|');
     		}

     		// NIVEL VIRTUAL
     		$sql = "SELECT FLUJO_NOMBRE, FLUJO_VALOR, FLUJO_TIME FROM `kal_flujo` WHERE FLUJO_TIME > $limit ORDER BY FLUJO_TIME ASC LIMIT 1";
			//$sql = "SELECT * FROM `kal_est` ORDER BY EST_TIME ASC LIMIT 1";

			$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
			
			while ($fila = mysql_fetch_array($query)) {
				$resultado = $resultado . ($fila[0] . ';' . $fila[1] . ';' . $fila[2] . '|');
     		}

     		// NIVEL KALMAN
     		$sql = "SELECT NIVEL_NOMBRE, NIVEL_VALOR, NIVEL_TIME FROM `kal_nivel` WHERE NIVEL_TIME > $limit ORDER BY NIVEL_TIME ASC LIMIT 1";
			//$sql = "SELECT * FROM `kal_est` ORDER BY EST_TIME ASC LIMIT 1";

			$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
			
			while ($fila = mysql_fetch_array($query)) {
				$resultado = $resultado . ($fila[0] . ';' . $fila[1] . ';' . $fila[2] . '|');
     		}


     		$res = substr($resultado, 0, -1);
    		echo ($res);
			// exit;     		
			
		}
		else echo("Couldn't Connect");
	}
	else echo("Post not seen");
	
?>