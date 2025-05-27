# MySQL con Docker

El proceso de instalar y configurar mysql no es demasiado complicado, pero puede ser delicado, con este proyecto puedes saltarte todo el proceso de instalación y configuración, ya que lo lanzamos en un contenedor de docker.

Asegurate de instalar docker y docker-compose, si no lo tienes instalado puedes seguir la [guía de instalación](https://docs.docker.com/engine/install/ubuntu/) de docker.

## Uso

Lee y entiende el archivo `Dockerfile`, `init.sql`, `mysqld.cnf` y `launch.sh` para entender como funciona el contenedor y como puedes modificarlo a tu gusto.

Simplemente ejecuta `./launch.sh` y el contenedor se lanzará y preguntará por el acceso a **root** definido en el `Dockerfile`.

## Interactuando con la base de datos

Puedes usar esta base de datos para entender como se interactua con MySQL/MariaDB desde el cliente de terminal, algunos comandos básicos son:

```bash
# Conectarse a la base de datos
mysql -u root -p
# Para hacerlo desde tu host:
docker exec -it <mysql-container-name> mysql -u root -p
# Mostrar las bases de datos
SHOW DATABASES; 
# Acceder a una base de datos
USE <database-name>;
# Mostrar las tablas de una base de datos
SHOW TABLES;
# Mostrar la estructura de una tabla
DESCRIBE <table-name>;
# Mostrar los datos de una tabla
SELECT * FROM <table-name>;
# Crear una base de datos
CREATE DATABASE <database-name>;
# Crear una tabla
USE <database-name>;
CREATE TABLE <table-name> (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL
);
```