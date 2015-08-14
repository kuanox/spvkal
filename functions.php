<?php

define("ACCESO_MANT", 1, TRUE);
define("ACCESO_OPS", 2, TRUE);
define("ACCESO_ADMIN", 4, TRUE);

function mysql_conexion()

{
	//$link= mysql_connect ("localhost", "root", "pgv") or die ('I
	$link= mysql_connect ("localhost", "root", "pgv") or die ('I 
cannot connect to the database because: ' . mysql_error());

	 mysql_select_db ("kalman") or die('spv no existe' .mysql_error()); 

	return $link;
}		

function check_vmode()
{
	if($_SESSION["vMode"] == 1)
	{
		$_SESSION["vMode"] = 2;
		return(1);
	}
	else if($_SESSION["vMode"] == 2)
	{
		return(2);
	}
}

function check_cmode()
{
	if($_SESSION["cMode"] == 1)
	{
		$_SESSION["cMode"] = 2;
		return(1);
	}
	else if($_SESSION["cMode"] == 2)
	{
		return(2);
	}
}

function SelectVicon ()
{
	if (($tmp=check_vmode()) == 1) echo('<a href="video.php?vmode=1"><img src="images/cam_act.jpg"></a>');
	else if ($tmp == 2) echo('<a href="video.php?vmode=0"><img src="images/cam_disp.jpg"></a>');
}

function SelectCicon ()
{
	if (($tmp=check_cmode()) == 1) echo('<a href="comms.php?cmode=1"><img src="images/comm_act.jpg"></a>');
	else if ($tmp == 2) echo('<a href="comms.php?cmode=0"><img src="images/comm_disp.jpg"></a>');
}

function ResetVicon ()
{
	if ($_SESSION["vMode"] == 2)
	{
//		echo('<a href="video.php?cunt=0">Reset</a>');
		$_SESSION["vMode"] = 1;
	}
}

function ResetCicon ()
{
	if ($_SESSION["cMode"] == 2)
	{
//		echo('<a href="video.php?cunt=0">Reset</a>');
		$_SESSION["cMode"] = 1;
	}
}

function isMobile() {
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}
?>
