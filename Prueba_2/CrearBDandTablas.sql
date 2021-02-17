CREATE DATABASE testDevJr;

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

