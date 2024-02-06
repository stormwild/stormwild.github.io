---
title: DBA
permalink: dba
---

Database Administration Notes

Database replication and synchronization

Resources:

[Mysql database sync between two databases](http://stackoverflow.com/questions/7707859/mysql-database-sync-between-two-databases)

[Sync two MySQL databases in two different locations](https://dba.stackexchange.com/questions/65351/sync-two-mysql-databases-in-two-different-locations)

[Replication](https://dev.mysql.com/doc/refman/5.7/en/replication.html)

[Database Synchronization](https://dev.mysql.com/doc/workbench/en/wb-database-synchronization.html)

[Binary Log](https://dev.mysql.com/doc/refman/5.7/en/binary-log.html)

[How to sync a MySQL table between two remote databases.](http://codeinthehole.com/tips/how-to-sync-a-mysql-table-between-two-remote-databases/)

```php
<?php
$tableName = 'some_table';
$sql =
   "SELECT * 
    FROM $tableName";
$pathToCsv = '/tmp/some-file.csv';
$command = sprintf("mysql -h %s -u %s  --password=%s -D %s -e '%s' > %s",
    '10.0.0.2', 
    'db-user', 
    'db-password', 
    'database_name', 
    $sql, 
    $pathToCsv);
exec($command);

$sql =
   "LOAD DATA LOCAL INFILE '$pathToCsv'
    REPLACE INTO TABLE `$tableName`
    CHARACTER SET 'utf8'
    IGNORE 1 LINES";
$db->execute($sql); // Using your favourite database adapter
```