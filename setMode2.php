<?php
//	session_start();
	include("functions.php");
	
	if (isset($_POST["trig"]))
	{
		$trig  = $_POST["trig"];
		$limit = $_POST["limit"];
		$canti = $_POST["cantidad"];
		//echo($limit . " -- ");
		if(($link = mysql_conexion()) != NULL)
		{
			if ($trig == 1){
				// EST KALMAN
				$sql = "SELECT * FROM (SELECT EST_NOMBRE, EST_VALOR, EST_TIME FROM `kal_est` WHERE EST_TIME <= $limit ORDER BY EST_TIME DESC LIMIT $canti)
							AS EST_TIME ORDER BY EST_TIME ASC LIMIT $canti";
				//$sql = "SELECT EST_NOMBRE, EST_VALOR, EST_TIME FROM `kal_est` WHERE EST_TIME <= $limit ORDER BY EST_TIME DESC LIMIT 100";
				$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
				
				$resultado	= '';
				$i 			= 0;
				while ($fila = mysql_fetch_array($query)) {
					if ($i == 0){
						
						$resultado = ($fila["EST_NOMBRE"] . ";");
						$i++;
					}
					$resultado = $resultado . ("[". $fila["EST_TIME"] . ",". $fila["EST_VALOR"] ."]" . ",");
	     		}
	     		$resultado = substr($resultado, 0, -1);

	     		// NIVEL VIRTUAL 
	     		$sql = "SELECT * FROM (SELECT FLUJO_NOMBRE, FLUJO_VALOR, FLUJO_TIME FROM `kal_flujo` WHERE FLUJO_TIME <= $limit ORDER BY FLUJO_TIME DESC LIMIT $canti)
							AS FLUJO_TIME ORDER BY FLUJO_TIME ASC LIMIT $canti";
				$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
				
				//$resultado	= '';
				$i 			= 0;
				while ($fila = mysql_fetch_array($query)) {
					if ($i == 0){
						
						$resultado = $resultado . "|" . ($fila["FLUJO_NOMBRE"] . ";");
						$i++;
					}
					$resultado = $resultado . ("[". $fila["FLUJO_TIME"] . ",". $fila["FLUJO_VALOR"] ."]" . ",");
	     		}
	     		$resultado = substr($resultado, 0, -1);

	     		// NIVEL KALMAN  
	     		$sql = "SELECT * FROM (SELECT NIVEL_NOMBRE, NIVEL_VALOR, NIVEL_TIME FROM `kal_nivel` WHERE NIVEL_TIME <= $limit ORDER BY NIVEL_TIME DESC LIMIT $canti)
							AS NIVEL_TIME ORDER BY NIVEL_TIME ASC LIMIT $canti";
				$query 	= mysql_query($sql) or die( "problem getting tareas ".mysql_error());
				
				//$resultado	= '';
				$i 			= 0;
				while ($fila = mysql_fetch_array($query)) {
					if ($i == 0){
						
						$resultado = $resultado .  "|" . ($fila["NIVEL_NOMBRE"] . ";");
						$i++;
					}
					$resultado = $resultado . ("[". $fila["NIVEL_TIME"] . ",". $fila["NIVEL_VALOR"] ."]" . ",");
	     		}

	     		$res = substr($resultado, 0, -1);

	     		//$res = $res . ']}';

	    		echo ($res);
	    	}else{
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
		}
		else echo("Couldn't Connect");

	}
	else echo("Post not seen");
	
?>