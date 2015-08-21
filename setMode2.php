<?php
//	session_start();
	include("functions.php");
	
	if (isset($_POST["trig"]))
	{
		$trig     = $_POST["trig"];
		$limitIni = $_POST["limitIni"];
		$limitFin = $_POST["limitFin"];
		//$canti = $_POST["cantidad"];
		//echo($limit . " -- ");
		if(($link = mysql_conexion()) != NULL)
		{
			if ($trig == 1){
				// EST KALMAN
				$sql = "SELECT EST_NOMBRE, EST_VALOR, EST_TIME 
						      FROM `kal_est` 
						      WHERE EST_TIME > $limitIni  
						      AND EST_TIME <= (SELECT EST_TIME FROM `kal_est` WHERE EST_TIME > $limitFin ORDER BY EST_TIME ASC LIMIT 1)
						      ORDER BY EST_TIME ASC";
				/*
				$sql = "SELECT EST_NOMBRE, EST_VALOR, EST_TIME 
						FROM `kal_est` 
					    WHERE EST_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY EST_TIME ASC";
				*/
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
	     		$sql = "SELECT FLUJO_NOMBRE, FLUJO_VALOR, FLUJO_TIME 
						      FROM `kal_flujo` 
						      WHERE FLUJO_TIME > $limitIni 
						      AND FLUJO_TIME <= (SELECT FLUJO_TIME FROM `kal_flujo` WHERE FLUJO_TIME > $limitFin ORDER BY FLUJO_TIME ASC LIMIT 1)
						      ORDER BY FLUJO_TIME ASC";
	     		/*
				$sql = "SELECT FLUJO_NOMBRE, FLUJO_VALOR, FLUJO_TIME 
						FROM `kal_flujo` 
					    WHERE FLUJO_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY FLUJO_TIME ASC";
				*/
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
	     		$sql = "SELECT NIVEL_NOMBRE, NIVEL_VALOR, NIVEL_TIME 
						      FROM `kal_nivel` 
						      WHERE NIVEL_TIME > $limitIni  
						      AND NIVEL_TIME <= (SELECT NIVEL_TIME FROM `kal_nivel` WHERE NIVEL_TIME > $limitFin ORDER BY NIVEL_TIME ASC LIMIT 1)
						      ORDER BY NIVEL_TIME ASC";
	     		/* 
				$sql = "SELECT NIVEL_NOMBRE, NIVEL_VALOR, NIVEL_TIME 
						FROM `kal_nivel` 
					    WHERE NIVEL_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY NIVEL_TIME ASC";
				*/
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
	    		// exit; 
	    	}else if ($trig == 2){
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
	    	}else if ($trig == 3){
	    		// EST KALMAN
				$sql = "SELECT EST_NOMBRE, EST_VALOR, EST_TIME 
						FROM `kal_est` 
					    WHERE EST_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY EST_TIME ASC";
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
				$sql = "SELECT FLUJO_NOMBRE, FLUJO_VALOR, FLUJO_TIME 
						FROM `kal_flujo` 
					    WHERE FLUJO_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY FLUJO_TIME ASC";

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
				$sql = "SELECT NIVEL_NOMBRE, NIVEL_VALOR, NIVEL_TIME 
						FROM `kal_nivel` 
					    WHERE NIVEL_TIME 
					    BETWEEN $limitIni 
					    AND $limitFin
					    ORDER BY NIVEL_TIME ASC";

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
	    		// exit; 
	    	}
		}
		else echo("Couldn't Connect");

	}
	else echo("Post not seen");
	
?>
