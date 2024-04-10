---
# layout: '@layouts/markdown-post-layout.astro'
title: Various Notes
published: 2017-05-31
description: 'Various Notes'
image: '@assets/posts/placeholder-red-circle.png'
tags: ["Notes", "React", "Sass", "ES2015"]
---

<https://medium.com/@srinisoundar/setting-up-environment-for-react-sass-es2015-babel-with-webpack-2f77445129#.g72ssc1j6>

<https://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html>

Learn to compute from binary to decimal to hexadecimal and octal

WordPress Unit Tests

        // Batch insert into mysql by RedBean
        // http://stackoverflow.com/questions/18416321/batch-insert-into-mysql-by-redbean
        // Creator of RedBeanPHP here.
        // This is not supported by RedBeanPHP. You will have to use plain old SQL for this.
        // Gabor de Mooij

        // http://stackoverflow.com/questions/12786605/how-to-bulk-insert-with-redbeanphp
        // R::storeAll($beans);

        /*R::freeze(true);
        R::begin();
        try {
            R::exec($sql);
            R::commit();
        } catch (Exception $e) {
            R::rollback();
            echo $e->getMessage();
            echo $e->getTraceAsString();
        }*/
        
        https://php-built.com/2016/01/20/installing-xdebug-for-php7/
        

    // temp delete before commit
    protected function testDb($args)
    {
        echo 'Import starting...' . PHP_EOL;

        $args->setAliases([
            'f' => 'from',
            't' => 'to',
            'd' => 'days'
        ]);

        if ((isset($args->from)) && (isset($args->to))) {
            $from = new \DateTime($args->from);
            $to = new \DateTime($args->to);
            $from = $from->format('Y-m-d 00:00:00');
            $to = $to->format('Y-m-d 23:59:59');
        } else
            if (isset($args->days)) {
                $today = new \DateTime();
                $daysAgo = new \DateTime();
                $daysAgo->sub(new \DateInterval('P' . $args->days . 'D'));
                $from = $daysAgo->format('Y-m-d 00:00:00');
                $to = $today->format('Y-m-d 23:59:59');
            } else {
                echo "Required params:\n  --from=YY-MM-DD --to=YY-MM-DD, or\n  --days=3\n";
                return;
            }

        echo "\"App UID\",\"Browser\",\"Browser Version\",\"OS\",\"Installed\",\"Uninstalled\",\"Last URL Seen\",\"Last Seen At\",\"User ID\",\"Extension Version\",\"Last Event Type\",\"Last Event Date\",\"Event Count\",\"Savings\"\n";

        $result = R::getAll("SELECT * FROM cofundapp_uninstall WHERE timestamp >= :from AND timestamp <= :to", [
            'from' => $from,
            'to' => $to
        ]);

    }


    // temporary call to test if connection to db is working
        $this->testDb($args);        

sudo find /var/www/html -type d -exec chmod g+s {} \;
