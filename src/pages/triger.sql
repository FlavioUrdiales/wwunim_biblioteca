


DELIMITER | 
CREATE TRIGGER ejecutar_procedure AFTER update ON tbl_pagos

FOR EACH ROW


BEGIN

 if(new.chrStatus = 'activo') then

    
    EXECUTE guardarAlumno @id = new.id  






 END IF

END

GO

DELIMITER ;








create table horariosJ(

id int primary key auto_increment,
idEmpleado int,
LunesEntrada varchar(10),
LunesSalida varchar(10),
MartesEntrada varchar(10),
MartesSalida varchar(10),
MiercolesEntrada varchar(10),
MiercolesSalida varchar(10),
JuevesEntrada varchar(10),
JuevesSalida varchar(10),
ViernesEntrada varchar(10),
ViernesSalida varchar(10),
SabadoEntrada varchar(10),
SabadoSalida varchar(10),
DomingoEntrada varchar(10),
DomingoSalida varchar(10)
);



INSERT INTO tbl_biblioteca (titulo,
autor,
editorial,
fecha_edicion,
registro,
area,
ubicacion,
id_plantel,
id_dep,
id_categoria,
id_departamento,
codigo,
status,
estado,
fecha_alta,
tipoLibro,
ISBN,
Paginas,
img,
sipnosis,
ejemplares) 
VALUES ('El principito','Antoine de Saint-Exupéry','Editorial Planeta','2018-01-01','2018-01-01','Biblioteca','Biblioteca','1','1','1','1','1','1','1','2018-01-01','1','1','1','1','1','1','1');


SELECT 
concat(t4.chrNombre, " ", t4.chrPaterno , " " , t4.chrMaterno) as maestro,
t2.chrNombre as materia, t3.intAnio , t3.chrNombre as ciclo , t5.chrNombre as escuela
FROM tblhorarioxciclo t1 INNER JOIN tblmateria t2 on t1.chrClaveMateria = t2.chrClave INNER JOIN tblcicloescolar t3 on t1.anio = t3.cveCiclo INNER JOIn 
tblusuario t4 on t1.chrClaveMaestro = t4.chrClave 
INNER JOIn tblescuela t5 on t4.chrClaveEscuela = t5.chrClave
where t3.intAnio = 2021 or t3.intAnio = 2022  



create table solicitudes(
id int primary key auto_increment,
idAlumno int,
idLibro int,
correo varchar(100),
telefono varchar(10),
fechaSolicitud date,
motivo varchar(255),
status varchar(10)
);



create table prestamos(
id int primary key auto_increment,
idAlumno int,
idLibro int,
idSolicitud int,
fechaPrestamo date,
fechaDevolucion date,
status varchar(10)
);

create table adeudos(
id int primary key auto_increment,
idAlumno int,
idLibro int,
idPrestamo int,
fechaPrestamo date,
fechaDevolucion date,
tipo varchar(10),

status varchar(10)
);


create table tbl_pagos(
id int primary key auto_increment,
idAlumno int,
idAdeudo int,
fechaPago date,
monto decimal(10,2),
status varchar(10)
);


SET GLOBAL event_scheduler = ON;


DELIMITER | 
CREATE EVENT checarDevolucion
ON SCHEDULE EVERY 1 DAY
STARTS '2023-02-15 00:00:00'
DO
BEGIN


UPDATE prestamos SET status = 'vencido' WHERE fechaDevolucion < CURDATE();


INSERT INTO adeudos(idAlumno,idLibro,fechaPrestamo,fechaDevolucion,tipo,status, idPrestamo) SELECT idAlumno,idLibro,fechaPrestamo,fechaDevolucion,'prestamo','activo', id FROM prestamos WHERE status = 'vencido';


UPDATE solicitudes SET status = 'vencido' WHERE fechaSolicitud < CURDATE() - INTERVAL 3 DAY;


if (SELECT status FROM solicitudes WHERE status = 'vencido') then

UPDATE tbl_biblioteca SET ejemplares = ejemplares + 1 WHERE id = (SELECT idLibro FROM solicitudes WHERE status = 'vencido');

UPDATE solicitudes SET status = 'inactivo' WHERE status = 'vencido';

END IF;

END
DELIMITER ;









