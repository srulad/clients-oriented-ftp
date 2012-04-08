<?php
/**
 * ProjectSend system constants
 *
 * This file includes the most basic system options that cannot be
 * changed through the web interface, such as the version number,
 * php directives and the user and password length values.
 *
 * @package ProjectSend
 * 
 */

define('CURRENT_VERSION', 'r110');

/**
 * Turn off reporting of PHP errors, warnings and notices.
 * On a development environment, it should be set to E_ALL for
 * complete debugging.
 *
 * @link http://www.php.net/manual/en/function.error-reporting.php
 */
error_reporting(0);

define('GLOBAL_TIME_LIMIT', 5*60);
define('UPLOAD_TIME_LIMIT', 120*60);
@set_time_limit(GLOBAL_TIME_LIMIT);

define('ROOT_DIR', dirname(__FILE__));

/**
 * Include the personal configuration file
 * It must be created before installing ProjectSend.
 *
 * @see sys.config.sample.php
 */
if(file_exists(ROOT_DIR.'/sys.config.php')) {
	include(ROOT_DIR.'/sys.config.php');
}
else {
	echo '<h1>Missing a required file</h1>';
	echo "<p>The system couldn't find the configuration file <strong>sys.config.php</strong> that should be located on the <strong>includes</strong> folder.</p>
	<p>This file contains the database connection information, as well as the language and other important settings.</p>
	<p>If this is the first time you are trying to run ProjectSend, you can edit the sample file <strong>includes/sys.config.sample.php</strong> to create your own configuration information.<br />
		Then make sure to rename it to sys.config.php</p>";
	exit;
}

/**
 * This values affect both validation methods (client and server side)
 * and also the maxlength value of the form fields.
 */
define('MIN_USER_CHARS', 5);
define('MAX_USER_CHARS', 16);
define('MIN_PASS_CHARS', 5);
define('MAX_PASS_CHARS', 16);

/*
 * Cookie expiration time (in seconds).
 * Set by default to 30 days (60*60*24*30).
 */
define('COOKIE_EXP_TIME', 60*60*24*30);

/*
 * Define the folder where the uploaded files are stored before
 * being assigned to any client.
 *
 * Also, this is the folder where files are searched for when
 * using the Import from FTP feature.
 *
 */
define('USER_UPLOADS_TEMP_FOLDER', 'upload/temp');
define('CLIENT_UPLOADS_TEMP_FOLDER', 'upload/temp');

require_once(ROOT_DIR.'/classes/database.php');
require_once(ROOT_DIR.'/site.options.php');

/** System User Roles names */
define('USER_ROLE_LVL_9', 'System Administrator');
define('USER_ROLE_LVL_8', 'Account Manager');
define('USER_ROLE_LVL_7', 'Uploader');

/**
 * Define the system name, and the information that will be used
 * on the footer blocks.
 *
 */
define('SYSTEM_URI','http://code.google.com/p/clients-oriented-ftp/');
define('SYSTEM_URI_LABEL','ProjectSend on Google Code');
define('SYSTEM_NAME','ProjectSend'); /** Previously cFTP */

define('LOGO_THUMB_FOLDER','../img/custom/thumbs/');

/**
 * Current system language
 * @see sys.config.sample.php
 */
$lang = SITE_LANG;
define('I18N_DEFAULT_DOMAIN', 'cftp_admin');
require_once(ROOT_DIR.'/i18n.php');
I18n::LoadDomain(ROOT_DIR."/../lang/{$lang}.mo", 'cftp_admin' );
?>