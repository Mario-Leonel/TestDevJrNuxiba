USE testdevjr;

SELECT
	*
FROM
	logdial
WHERE
	tipoDeLlamada = 'cel LD'
AND MONTH (fechaDeLlamada) = 02;

SELECT
	MONTH (fechaDeLlamada) = 02 AS Febrero,
	AVG(tiempoDialogo) AS PromedioTiempoDeDialogo
FROM
	logdial
WHERE
	MONTH (fechaDeLlamada) = 02;

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
