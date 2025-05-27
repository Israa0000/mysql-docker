Hay que añadir `bind-address = 0.0.0.0` en `/etc/mysql/mysql.conf.d/mysqld.cnf` para que el servidor escuche en todas las interfaces de red.

CREATE USER 'usuario_remoto'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON *.* TO 'usuario_remoto'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

PARA INICIAR PROYECTO (SERVER.JS HECHO)
nmp init -y
npm i <paquetes>

node server, ejecuta archivos js
