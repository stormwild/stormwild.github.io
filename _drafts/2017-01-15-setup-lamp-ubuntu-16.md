---
title: Setup Lamp on Ubuntu 16
permalink: setup-lamp-ubuntu-16
---

Update Ubuntu

sudo apt-get update

sudo apt-get upgrade

sudo apt-get dist-upgrade

Install Apache

sudo apt-get install apache2 apache2-utils

systemctl status apache2

If it’s not running, use systemctl to start it.

sudo systemctl start apache2

It’s also a good idea to enable Apache to automatically start when Ubuntu 16.04 is rebooted.

sudo systemctl enable apache2

apache2.service is not a native service, redirecting to systemd-sysv-install
Executing /lib/systemd/systemd-sysv-install enable apache2

Check Apache version:

apache2 -v

Server version: Apache/2.4.18 (Ubuntu)
Server built:   2016-07-14T12:32:26

Now in your browser’s address bar, type the public IP address of Ubuntu 16.04 LTS server. You should see the “It works!” Web page which means Apache Web server is running correctly.

You can use the following command to fetch the public IP address of Ubuntu 16.04 server.

sudo apt-get install curl

curl http://icanhazip.com

Finally, we need to make www-data (Apache user) as the owner of web root directory.

sudo chown www-data:www-data -R /var/www/html/ 

sudo find /var/www/html -type d -exec chmod g+s {} \;

ubuntu@ip-172-31-42-236:~$ ls -al /var/www/
total 12
drwxr-xr-x  3 root root 4096 Jan 15 11:07 .
drwxr-xr-x 14 root root 4096 Jan 15 11:07 ..
drwxr-xr-x  2 root root 4096 Jan 15 11:07 html

ubuntu@ip-172-31-42-236:~$ ls -al /var/www/
total 12
drwxr-xr-x  3 root     root 4096 Jan 15 11:07 .
drwxr-xr-x 14 root     root 4096 Jan 15 11:07 ..
drwxr-xr-x  2 www-data root 4096 Jan 15 11:07 html


ubuntu@ubuntu-xenial:~$ sudo chown www-data:www-data -R /var/www/html/ 
ubuntu@ubuntu-xenial:~$ ls -al /var/www/
total 12
drwxr-xr-x  3 root     root     4096 Feb 12 11:24 .
drwxr-xr-x 14 root     root     4096 Feb 12 11:24 ..
drwxr-xr-x  2 www-data www-data 4096 Feb 12 11:24 html
ubuntu@ubuntu-xenial:~$ sudo find /var/www/html -type d -exec chmod g+s {} \;
ubuntu@ubuntu-xenial:~$ ls -al /var/www/
total 12
drwxr-xr-x  3 root     root     4096 Feb 12 11:24 .
drwxr-xr-x 14 root     root     4096 Feb 12 11:24 ..
drwxr-sr-x  2 www-data www-data 4096 Feb 12 11:24 html
ubuntu@ubuntu-xenial:~$ 



Install MariaDB

sudo apt-get -y install mariadb-server mariadb-client

After it’s installed, MariaDB server should be automatically stared. Use systemctl to check its status.

systemctl status mysql

ubuntu@ip-172-31-42-236:~$ systemctl status mysql
● mysql.service - LSB: Start and stop the mysql database server daemon
   Loaded: loaded (/etc/init.d/mysql; bad; vendor preset: enabled)
   Active: active (running) since Sun 2017-01-15 11:13:05 UTC; 13s ago
     Docs: man:systemd-sysv-generator(8)
   CGroup: /system.slice/mysql.service
           ├─29020 /bin/bash /usr/bin/mysqld_safe
           ├─29165 /usr/sbin/mysqld --basedir=/usr --datadir=/var/lib/mysql --plugin-dir=/usr/lib/mysql/plugin --user=mysql --s
           └─29166 logger -t mysqld -p daemon error

Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.host                                         OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.index_stats                                  OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.innodb_index_stats                           OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.innodb_table_stats                           OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.plugin                                       OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.proc                                         OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.procs_priv                                   OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.proxies_priv                                 OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29217]: mysql.roles_mapping                                OK
Jan 15 11:13:06 ip-172-31-42-236 /etc/mysql/debian-start[29277]: Triggering myisam-recover for all MyISAM tables and aria-recov
lines 1-19/19 (END)


If it’s not running, start it with this command:

sudo systemctl start mysql

To enable MariaDB to automatically start when Ubuntu 16.04 is rebooted:

sudo systemctl enable mysql

ubuntu@ip-172-31-42-236:~$ sudo systemctl enable mysql
mysql.service is not a native service, redirecting to systemd-sysv-install
Executing /lib/systemd/systemd-sysv-install enable mysql

Now run the post installation security script.

sudo mysql_secure_installation

root pw myname/root


ubuntu@ip-172-31-42-236:~$ sudo mysql_secure_installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MariaDB to secure it, we'll need the current
password for the root user.  If you've just installed MariaDB, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none): 
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.

Set root password? [Y/n] 
New password: 
Re-enter new password: 
Password updated successfully!
Reloading privilege tables..
 ... Success!


By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] 
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] 
 ... Success!

By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] 
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] 
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.

Thanks for using MariaDB!

Install PHP7


Enter the following command to install PHP7 and PHP7 extensions.

 sudo apt-get install php
 
// Ubuntu 16.04
The following additional packages will be installed:
  php-common php7.0 php7.0-cli php7.0-common php7.0-fpm php7.0-json php7.0-opcache php7.0-readline

sudo apt-get -y install libapache2-mod-php

The following NEW packages will be installed:
  libapache2-mod-php libapache2-mod-php7.0


sudo apt-get install php7.0-fpm php7.0-mysql php7.0-common php7.0-gd php7.0-json php7.0-cli php7.0-curl libapache2-mod-php7.0

sudo apt-get install php-fpm php-mysql php-gd php-curl 

https://gist.github.com/theodorosploumis/51579dd8ee085e08b24f5fcc0550d85e

sudo apt-get install php-memcached php-pear php-xml php-mbstring php-intl php-zip php-json

sudo apt-get install -y \
             php \
             libapache2-mod-php \
             php-fpm \
             php-mysql \
             php-memcached \
             php-pear \
             php-xml \
             php-mbstring \
             php-xdebug \
             php-intl \
             php-curl \
             php-gd \
             php-zip \
             php-json \
             
             
ubuntu@ubuntu-xenial:~$ sudo apt-get install php-memcached php-pear php-xml php-mbstring php-intl php-zip php-json
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  libmemcached11 libxslt1.1 libzip4 php7.0-intl php7.0-mbstring php7.0-xml php7.0-zip
The following NEW packages will be installed:
  libmemcached11 libxslt1.1 libzip4 php-intl php-json php-mbstring php-memcached php-pear php-xml php-zip php7.0-intl php7.0-mbstring php7.0-xml php7.0-zip
0 upgraded, 14 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,314 kB of archives.
After this operation, 5,695 kB of additional disk space will be used.
Do you want to continue? [Y/n] 

             
Enable the Apache php7.0 module then restart Apache Web server.

sudo a2enmod php7.0

ubuntu@ip-172-31-42-236:~$ sudo a2enmod php7.0
Considering conflict php5 for php7.0:
Module php7.0 already enabled

sudo systemctl restart apache2



ubuntu@ip-172-31-42-236:~$ sudo apt-get install php7.0-fpm php7.0-mysql php7.0-common php7.0-gd php7.0-json php7.0-cli php7.0-curl libapache2-mod-php7.0
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  fontconfig-config fonts-dejavu-core libcurl3 libfontconfig1 libgd3 libjbig0 libjpeg-turbo8 libjpeg8 libtiff5 libvpx3
  libxpm4 php-common php7.0-opcache php7.0-readline
Suggested packages:
  php-pear libgd-tools
The following NEW packages will be installed:
  fontconfig-config fonts-dejavu-core libapache2-mod-php7.0 libcurl3 libfontconfig1 libgd3 libjbig0 libjpeg-turbo8 libjpeg8
  libtiff5 libvpx3 libxpm4 php-common php7.0-cli php7.0-common php7.0-curl php7.0-fpm php7.0-gd php7.0-json php7.0-mysql
  php7.0-opcache php7.0-readline
0 upgraded, 22 newly installed, 0 to remove and 0 not upgraded.
Need to get 7503 kB of archives.
After this operation, 27.5 MB of additional disk space will be used.
Do you want to continue? [Y/n] 
Get:1 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libjpeg-turbo8 amd64 1.4.2-0ubuntu3 [111 kB]
Get:2 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libxpm4 amd64 1:3.5.11-1 [33.1 kB]
Get:3 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libjbig0 amd64 2.1-3.1 [26.6 kB]
Get:4 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 fonts-dejavu-core all 2.35-1 [1039 kB]
Get:5 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 fontconfig-config all 2.11.94-0ubuntu1.1 [49.9 kB]
Get:6 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 php-common all 1:35ubuntu6 [10.8 kB]
Get:7 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-common amd64 7.0.13-0ubuntu0.16.04.1 [833 kB]
Get:8 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-json amd64 7.0.13-0ubuntu0.16.04.1 [16.9 kB]
Get:9 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-opcache amd64 7.0.13-0ubuntu0.16.04.1 [76.1 kB]
Get:10 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-readline amd64 7.0.13-0ubuntu0.16.04.1 [12.9 kB]
Get:11 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-cli amd64 7.0.13-0ubuntu0.16.04.1 [1282 kB]
Get:12 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 libapache2-mod-php7.0 amd64 7.0.13-0ubuntu0.16.04.1 [1224 kB]
Get:13 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 libcurl3 amd64 7.47.0-1ubuntu2.2 [186 kB]
Get:14 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 libfontconfig1 amd64 2.11.94-0ubuntu1.1 [131 kB]
Get:15 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libjpeg8 amd64 8c-2ubuntu8 [2194 B]
Get:16 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libtiff5 amd64 4.0.6-1 [144 kB]
Get:17 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial/main amd64 libvpx3 amd64 1.5.0-2ubuntu1 [732 kB]
Get:18 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 libgd3 amd64 2.1.1-4ubuntu0.16.04.5 [125 kB]
Get:19 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-curl amd64 7.0.13-0ubuntu0.16.04.1 [27.6 kB]
Get:20 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/universe amd64 php7.0-fpm amd64 7.0.13-0ubuntu0.16.04.1 [1289 kB]
Get:21 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-gd amd64 7.0.13-0ubuntu0.16.04.1 [27.4 kB]
Get:22 http://us-west-2.ec2.archive.ubuntu.com/ubuntu xenial-updates/main amd64 php7.0-mysql amd64 7.0.13-0ubuntu0.16.04.1 [123 kB]
Fetched 7503 kB in 0s (23.7 MB/s)  
Selecting previously unselected package libjpeg-turbo8:amd64.
(Reading database ... 82959 files and directories currently installed.)
Preparing to unpack .../libjpeg-turbo8_1.4.2-0ubuntu3_amd64.deb ...
Unpacking libjpeg-turbo8:amd64 (1.4.2-0ubuntu3) ...
Selecting previously unselected package libxpm4:amd64.
Preparing to unpack .../libxpm4_1%3a3.5.11-1_amd64.deb ...
Unpacking libxpm4:amd64 (1:3.5.11-1) ...
Selecting previously unselected package libjbig0:amd64.
Preparing to unpack .../libjbig0_2.1-3.1_amd64.deb ...
Unpacking libjbig0:amd64 (2.1-3.1) ...
Selecting previously unselected package fonts-dejavu-core.
Preparing to unpack .../fonts-dejavu-core_2.35-1_all.deb ...
Unpacking fonts-dejavu-core (2.35-1) ...
Selecting previously unselected package fontconfig-config.
Preparing to unpack .../fontconfig-config_2.11.94-0ubuntu1.1_all.deb ...
Unpacking fontconfig-config (2.11.94-0ubuntu1.1) ...
Selecting previously unselected package php-common.
Preparing to unpack .../php-common_1%3a35ubuntu6_all.deb ...
Unpacking php-common (1:35ubuntu6) ...
Selecting previously unselected package php7.0-common.
Preparing to unpack .../php7.0-common_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-common (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-json.
Preparing to unpack .../php7.0-json_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-json (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-opcache.
Preparing to unpack .../php7.0-opcache_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-opcache (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-readline.
Preparing to unpack .../php7.0-readline_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-readline (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-cli.
Preparing to unpack .../php7.0-cli_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-cli (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package libapache2-mod-php7.0.
Preparing to unpack .../libapache2-mod-php7.0_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking libapache2-mod-php7.0 (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package libcurl3:amd64.
Preparing to unpack .../libcurl3_7.47.0-1ubuntu2.2_amd64.deb ...
Unpacking libcurl3:amd64 (7.47.0-1ubuntu2.2) ...
Selecting previously unselected package libfontconfig1:amd64.
Preparing to unpack .../libfontconfig1_2.11.94-0ubuntu1.1_amd64.deb ...
Unpacking libfontconfig1:amd64 (2.11.94-0ubuntu1.1) ...
Selecting previously unselected package libjpeg8:amd64.
Preparing to unpack .../libjpeg8_8c-2ubuntu8_amd64.deb ...
Unpacking libjpeg8:amd64 (8c-2ubuntu8) ...
Selecting previously unselected package libtiff5:amd64.
Preparing to unpack .../libtiff5_4.0.6-1_amd64.deb ...
Unpacking libtiff5:amd64 (4.0.6-1) ...
Selecting previously unselected package libvpx3:amd64.
Preparing to unpack .../libvpx3_1.5.0-2ubuntu1_amd64.deb ...
Unpacking libvpx3:amd64 (1.5.0-2ubuntu1) ...
Selecting previously unselected package libgd3:amd64.
Preparing to unpack .../libgd3_2.1.1-4ubuntu0.16.04.5_amd64.deb ...
Unpacking libgd3:amd64 (2.1.1-4ubuntu0.16.04.5) ...
Selecting previously unselected package php7.0-curl.
Preparing to unpack .../php7.0-curl_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-curl (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-fpm.
Preparing to unpack .../php7.0-fpm_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-fpm (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-gd.
Preparing to unpack .../php7.0-gd_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-gd (7.0.13-0ubuntu0.16.04.1) ...
Selecting previously unselected package php7.0-mysql.
Preparing to unpack .../php7.0-mysql_7.0.13-0ubuntu0.16.04.1_amd64.deb ...
Unpacking php7.0-mysql (7.0.13-0ubuntu0.16.04.1) ...
Processing triggers for libc-bin (2.23-0ubuntu5) ...
Processing triggers for man-db (2.7.5-1) ...
Processing triggers for systemd (229-4ubuntu13) ...
Processing triggers for ureadahead (0.100.0-19) ...
Setting up libjpeg-turbo8:amd64 (1.4.2-0ubuntu3) ...
Setting up libxpm4:amd64 (1:3.5.11-1) ...
Setting up libjbig0:amd64 (2.1-3.1) ...
Setting up fonts-dejavu-core (2.35-1) ...
Setting up fontconfig-config (2.11.94-0ubuntu1.1) ...
Setting up php-common (1:35ubuntu6) ...
Setting up php7.0-common (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/calendar.ini with new version

Creating config file /etc/php/7.0/mods-available/ctype.ini with new version

Creating config file /etc/php/7.0/mods-available/exif.ini with new version

Creating config file /etc/php/7.0/mods-available/fileinfo.ini with new version

Creating config file /etc/php/7.0/mods-available/ftp.ini with new version

Creating config file /etc/php/7.0/mods-available/gettext.ini with new version

Creating config file /etc/php/7.0/mods-available/iconv.ini with new version

Creating config file /etc/php/7.0/mods-available/pdo.ini with new version

Creating config file /etc/php/7.0/mods-available/phar.ini with new version

Creating config file /etc/php/7.0/mods-available/posix.ini with new version

Creating config file /etc/php/7.0/mods-available/shmop.ini with new version

Creating config file /etc/php/7.0/mods-available/sockets.ini with new version

Creating config file /etc/php/7.0/mods-available/sysvmsg.ini with new version

Creating config file /etc/php/7.0/mods-available/sysvsem.ini with new version

Creating config file /etc/php/7.0/mods-available/sysvshm.ini with new version

Creating config file /etc/php/7.0/mods-available/tokenizer.ini with new version
Setting up php7.0-json (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/json.ini with new version
Setting up php7.0-opcache (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/opcache.ini with new version
Setting up php7.0-readline (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/readline.ini with new version
Setting up php7.0-cli (7.0.13-0ubuntu0.16.04.1) ...
update-alternatives: using /usr/bin/php7.0 to provide /usr/bin/php (php) in auto mode
update-alternatives: using /usr/bin/phar7.0 to provide /usr/bin/phar (phar) in auto mode
update-alternatives: using /usr/bin/phar.phar7.0 to provide /usr/bin/phar.phar (phar.phar) in auto mode

Creating config file /etc/php/7.0/cli/php.ini with new version
Setting up libapache2-mod-php7.0 (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/apache2/php.ini with new version
Module mpm_event disabled.
Enabling module mpm_prefork.
apache2_switch_mpm Switch to prefork
apache2_invoke: Enable module php7.0
Setting up libcurl3:amd64 (7.47.0-1ubuntu2.2) ...
Setting up libfontconfig1:amd64 (2.11.94-0ubuntu1.1) ...
Setting up libjpeg8:amd64 (8c-2ubuntu8) ...
Setting up libtiff5:amd64 (4.0.6-1) ...
Setting up libvpx3:amd64 (1.5.0-2ubuntu1) ...
Setting up libgd3:amd64 (2.1.1-4ubuntu0.16.04.5) ...
Setting up php7.0-curl (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/curl.ini with new version
Setting up php7.0-fpm (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/fpm/php.ini with new version
Setting up php7.0-gd (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/gd.ini with new version
Setting up php7.0-mysql (7.0.13-0ubuntu0.16.04.1) ...

Creating config file /etc/php/7.0/mods-available/mysqlnd.ini with new version

Creating config file /etc/php/7.0/mods-available/mysqli.ini with new version

Creating config file /etc/php/7.0/mods-available/pdo_mysql.ini with new version
Processing triggers for libc-bin (2.23-0ubuntu5) ...
Processing triggers for libapache2-mod-php7.0 (7.0.13-0ubuntu0.16.04.1) ...
Processing triggers for systemd (229-4ubuntu13) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for php7.0-fpm (7.0.13-0ubuntu0.16.04.1) ...

Test PHP

php --version

ubuntu@ip-172-31-42-236:~$ php --version
PHP 7.0.13-0ubuntu0.16.04.1 (cli) ( NTS )
Copyright (c) 1997-2016 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2016 Zend Technologies
    with Zend OPcache v7.0.13-0ubuntu0.16.04.1, Copyright (c) 1999-2016, by Zend Technologies

Upgrade PHP7.1
http://askubuntu.com/questions/856793/upgrade-to-the-specific-php-7-1-from-php-7-0-in-ubuntu-16-04

There is no official PHP 7.1 in the Ubuntu 16.04 repos.

If you want PHP 7.1, there is a version available in ppa:ondrej/php

You can install it like this:

sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get upgrade
(optional) sudo apt-get remove php7.0
sudo apt-get install php7.1 (from comments)

sudo a2dismod php7.0

sudo a2enmod php7.1

sudo vi /var/www/html/test.php




Apache PHP7.0 Module vs PHP-FPM

There are now basically two ways to run PHP code with Apache web server:

Apache PHP module
PHP-FPM.
The above configuration uses the Apache PHP7.0 module to handle PHP code. It’s totally fine and if you are happy with it, then delete test.php file now so that no one else can see your server’s information and don’t follow the instructions below.

But if you want to use PHP-FPM to run PHP code, then you need to enable Apache mod_proxy_fcgi module with the following command:

sudo a2enmod proxy_fcgi

ubuntu@ip-172-31-42-236:~$ sudo a2enmod proxy_fcgi
Considering dependency proxy for proxy_fcgi:
Enabling module proxy.
Enabling module proxy_fcgi.
To activate the new configuration, you need to run:
  service apache2 restart
  
Then edit the virtual host configuration file. This tutorial uses the default virtual host as an example.

sudo vi /etc/apache2/sites-available/000-default.conf  

Add the ProxyPassMatch directive to this file.

....

ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined
ProxyPassMatch ^/(.*\.php(/.*)?)$ unix:/run/php/php7.0-fpm.sock|fcgi://localhost/var/www/html/

.....

Save and close this file. Restart Apache2.

sudo systemctl restart apache2


Start php7.0-fpm

sudo systemctl start php7.0-fpm

Check status:

systemctl status php7.0-fpm


● php7.0-fpm.service - The PHP 7.0 FastCGI Process Manager
   Loaded: loaded (/lib/systemd/system/php7.0-fpm.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2017-01-15 11:18:11 UTC; 8min ago
  Process: 7142 ExecStartPre=/usr/lib/php/php7.0-fpm-checkconf (code=exited, status=0/SUCCESS)
 Main PID: 7151 (php-fpm7.0)
   Status: "Processes active: 0, idle: 2, Requests: 0, slow: 0, Traffic: 0req/sec"
    Tasks: 3
   Memory: 24.9M
      CPU: 73ms
   CGroup: /system.slice/php7.0-fpm.service
           ├─7151 php-fpm: master process (/etc/php/7.0/fpm/php-fpm.conf)                      
           ├─7155 php-fpm: pool www                                                            
           └─7156 php-fpm: pool www                                                            

Jan 15 11:18:11 ip-172-31-42-236 systemd[1]: Stopped The PHP 7.0 FastCGI Process Manager.
Jan 15 11:18:11 ip-172-31-42-236 systemd[1]: Starting The PHP 7.0 FastCGI Process Manager...
Jan 15 11:18:11 ip-172-31-42-236 systemd[1]: Started The PHP 7.0 FastCGI Process Manager.
Jan 15 11:26:04 ip-172-31-42-236 systemd[1]: Started The PHP 7.0 FastCGI Process Manager.



Enable https
http://www.tecmint.com/install-lamp-on-ubuntu-16-10/ --> show how to enable https

ubuntu@ip-172-31-23-4:~$ sudo a2enmod ssl

Considering dependency setenvif for ssl:
Module setenvif already enabled
Considering dependency mime for ssl:
Module mime already enabled
Considering dependency socache_shmcb for ssl:
Module socache_shmcb already enabled
Module ssl already enabled

ubuntu@ip-172-31-23-4:~$ 

ubuntu@ip-172-31-23-4:~$  sudo a2ensite default-ssl.conf 
Site default-ssl already enabled
ubuntu@ip-172-31-23-4:~$ 


Create AMI
http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/creating-an-ami-ebs.html

Install wordpress
http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html

wget https://wordpress.org/latest.tar.gz

ubuntu@ip-172-31-23-4:~$ wget https://wordpress.org/latest.tar.gz
--2017-01-28 08:32:03--  https://wordpress.org/latest.tar.gz
Resolving wordpress.org (wordpress.org)... 66.155.40.249, 66.155.40.250
Connecting to wordpress.org (wordpress.org)|66.155.40.249|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 7997959 (7.6M) [application/octet-stream]
Saving to: ‘latest.tar.gz’

latest.tar.gz                                  100%[=================================================================================================>]   7.63M  23.8MB/s    in 0.3s    

2017-01-28 08:32:03 (23.8 MB/s) - ‘latest.tar.gz’ saved [7997959/7997959]

ubuntu@ip-172-31-23-4:~$ tar -xzf latest.tar.gz
ubuntu@ip-172-31-23-4:~$ ls
latest.tar.gz  wordpress
ubuntu@ip-172-31-23-4:~$ 

https://gist.github.com/stormwild/ca7badceef5ebbbf6448

ubuntu@ip-172-31-23-4:~$ mysql -u root -p
Enter password: 
ERROR 1698 (28000): Access denied for user 'root'@'localhost'
ubuntu@ip-172-31-23-4:~$ sudo mysql -u root -p                                                                                                                                           
Enter password: 
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 47
Server version: 10.0.29-MariaDB-0ubuntu0.16.04.1 Ubuntu 16.04

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE USER 'rmnadmin'@'localhost' IDENTIFIED BY 'Password_123#';
Query OK, 0 rows affected (0.00 sec)


GRANT ALL PRIVILEGES ON *.* TO 'rmnadmin'@'%' WITH GRANT OPTION;

https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-16-04

sudo nano /etc/apache2/apache2.conf

<Directory /var/www/html/>
    AllowOverride All
</Directory>

sudo a2enmod rewrite

ubuntu@ip-172-31-23-4:/etc/apache2$ sudo vi apache2.conf 
ubuntu@ip-172-31-23-4:/etc/apache2$ sudo a2enmod rewrite
Enabling module rewrite.
To activate the new configuration, you need to run:
  service apache2 restart
ubuntu@ip-172-31-23-4:/etc/apache2$ sudo service apache2 restart
ubuntu@ip-172-31-23-4:/etc/apache2$ sudo apache2ctl configtest
Syntax OK
ubuntu@ip-172-31-23-4:/etc/apache2$ sudo systemctl restart apache2
ubuntu@ip-172-31-23-4:/etc/apache2$ sudo chown -R www-data:www-data /var/www/html

sudo find /var/www/html -type d -exec chmod g+s {} \;


Sending Email
http://stackoverflow.com/questions/19858457/send-mail-using-amazon-ec2-instance
https://www.abeautifulsite.net/configuring-sendmail-on-ubuntu-1404

sudo apt-get install sendmail
sudo sendmailconfig
sudo service apache2 restart


fix for 404 on missing php
http://serverfault.com/questions/450628/apache-2-4-php-fpm-proxypassmatch
<VirtualHost ...>

 ...

 # This is to forward all PHP to php-fpm.
 <FilesMatch \.php$>
   SetHandler "proxy:unix:/path/to/socket.sock|fcgi://unique-domain-name-string/"
 </FilesMatch>

 # Set some proxy properties (the string "unique-domain-name-string" should match
 # the one set in the FilesMatch directive.
 <Proxy fcgi://unique-domain-name-string>
   ProxySet connectiontimeout=5 timeout=240
 </Proxy>

 # If the php file doesn't exist, disable the proxy handler.
 # This will allow .htaccess rewrite rules to work and 
 # the client will see the default 404 page of Apache
 RewriteCond %{REQUEST_FILENAME} \.php$
 RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_URI} !-f
 RewriteRule (.*) - [H=text/html]

</VirtualHost>

https://wiki.apache.org/httpd/PHP-FPM



--------------------

Resources:

https://www.linuxbabe.com/linux-server/install-apache-mariadb-and-php7-lamp-stack-on-ubuntu-16-04-lts

https://www.linuxbabe.com/ubuntu/upgrade-ubuntu-16-04-to-ubuntu-16-10

https://www.linode.com/docs/websites/lamp/install-lamp-on-ubuntu-16-04

http://www.tecmint.com/install-lamp-on-ubuntu-16-10/ --> show how to enable https

https://www.howtoforge.com/tutorial/install-apache-with-php-and-mysql-on-ubuntu-16-04-lamp/

https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-16-04

http://www.rolandolucio.com/howto/2016/02/05/php7-mysql5.7-apache2-ubuntu-lamp.html


Cool Stuff:

https://www.airpair.com/aws/posts/building-a-scalable-web-app-on-amazon-web-services-p1#4-2-5-3-the-database-tier-in-aws

https://serifandsemaphore.io/how-to-host-wordpress-like-a-boss-b5993fcfbd8e#.cvq8o8og1

https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-16-04

https://www.cyberciti.biz/tips/php-howto-turn-on-error-log-file.html

https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04


Vagrant:

http://kvz.io/blog/2013/01/16/vagrant-tip-keep-virtualbox-guest-additions-in-sync/
