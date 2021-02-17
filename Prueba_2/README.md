# Directorio para la prueba 2 #

Nombre:  **Mario Alberto Leonel Corona**

------

* Construye una base de datos y crea las siguientes tablas dentro de ella:

------

* CREATE DATABASE testDevJr;

USE testDevJr;

 CREATE TABLE costos (
	tipoDeLlamada VARCHAR (15) PRIMARY KEY,
	costo DECIMAL (10, 4)
);

CREATE TABLE logDial (
	idLLamada VARCHAR (10) PRIMARY KEY,
	fechaDeLlamada DATE,
	tiempoDialogo SMALLINT,
	telefono VARCHAR (10),
	tipoDeLlamada VARCHAR (15),
	FOREIGN KEY (tipoDeLlamada) REFERENCES costos (tipoDeLlamada) 
  ON DELETE RESTRICT ON UPDATE CASCADE
);


------

* Genera las sentencias SQL que respondan lo siguiente:
	* Que muestre los registros con tipo de llamada **Cel LD** durante el **mes febrero** **_(5 puntos)_**
USE testdevjr;

SELECT
	*
FROM
	logdial
WHERE
	tipoDeLlamada = 'cel LD'
AND MONTH (fechaDeLlamada) = 02;


-----


* Que indique el promedio de tiempo de dialogo de las llamadas con tipo **Cel LD** durante el **mes de febrero** **_(5 puntos)_**
SELECT
	MONTH (fechaDeLlamada) = 02 AS Febrero,
	AVG(tiempoDialogo) AS PromedioTiempoDeDialogo
FROM
	logdial
WHERE
	MONTH (fechaDeLlamada) = 02;


-----


* Que muestre el **número en minutos de dialogo** (tomando tiempoDialogo que está en segundos) y el **costo** de todas las llamadas del **mes de enero** **_(10 puntos)_**

SELECT
	fechaDeLlamada,
	TRUNCATE ((tiempoDialogo / 60), 3) AS minutos,
	costo,
	SUM(
		costo * TRUNCATE ((tiempoDialogo / 60), 3)
	) AS costoXminuto
FROM
	logdial
INNER JOIN costos ON costos.tipoDeLlamada = logdial.tipoDeLlamada
WHERE
	MONTH (fechaDeLlamada) = 01
GROUP BY
	fechaDeLlamada;

* Esta sentencia Muestra el Costo Total de todo el mes de Enero por cada llamada en MInutos
 USE testdevjr;

SELECT
	MONTH (fechaDeLlamada) = 01 AS Enero,
	SUM(
		TRUNCATE ((tiempoDialogo / 60), 3)
	) AS minutosTotales,
	SUM(
		costo * TRUNCATE ((tiempoDialogo / 60), 3)
	) AS TotalDeCostoXminuto
FROM
	logdial
INNER JOIN costos ON costos.tipoDeLlamada = logdial.tipoDeLlamada
WHERE
	MONTH (fechaDeLlamada) = 01;

------
