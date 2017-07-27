---
title: Disable PHP Deprecated Warnings in Wordpress
permalink: disable-php-deprecated-warnings-in-wordpress
redirect_from: 2015/11/22/disable-php-deprecated-warnings-in-wordpress/
---

When moving a WordPress site to a new server running the latest version of PHP5 (i.e. > 5.3), PHP Warnings may appear.

The following code will turn off these warnings even when WP_DEBUG is set to true

In your `wp-includes/load.php`

```php
function wp_debug_mode() {
	if ( WP_DEBUG ) {
		error_reporting( E_ALL ^ E_NOTICE ^ E_USER_NOTICE ); // changed from error_reporting( E_ALL );

		if ( WP_DEBUG_DISPLAY )
			ini_set( 'display_errors', 1 );
		elseif ( null !== WP_DEBUG_DISPLAY )
			ini_set( 'display_errors', 0 );

		if ( WP_DEBUG_LOG ) {
			ini_set( 'log_errors', 1 );
			ini_set( 'error_log', WP_CONTENT_DIR . '/debug.log' );
		}
	} else {
		error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR );
	}
	if ( defined( 'XMLRPC_REQUEST' ) )
		ini_set( 'display_errors', 0 );
}
```

Reference:
['PHP Deprecated' warnings on every screen](https://wordpress.org/support/topic/php-deprecated-warnings-on-every-screen)
