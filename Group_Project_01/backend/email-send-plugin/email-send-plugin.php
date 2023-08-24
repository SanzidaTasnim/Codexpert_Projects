<?php
/*
* Plugin Name:       Email Send Plugin
* Plugin URI:        https://wordpress.org/plugins/
* Description:       Email send to the user after creating new post
* Version:           1.0.0
* Requires at least: 5.2
* Requires PHP:      7.2
* Author:            Sanzida
* Author URI:        https://sanzida.me/
* License:           GPL v2 or later
* License URI:       https://www.gnu.org/licenses/gpl-2.0.html
* Update URI:        https://example.com/my-plugin/
* Text Domain:       email-send-plugin
* Domain Path:       /languages
*/

/**
 * No direct access from outside
 */
if ( ! defined( 'ABSPATH' ) ){
    exit();
}

/**
 * initializing the main class
 */
class Custom_Email_Notifier {
    public function __construct() {
        add_action( 'wp_insert_post', [ $this, 'emsp_send_email_after_post_insert' ] );
    }

    public function emsp_send_email_after_post_insert( $post_id ) {
        $post = get_post( $post_id );
        
        if ($post) {
            $author_id = $post->post_author;
            $author    = get_user_by( 'ID', $author_id );

            if ($author) {
                $email   = $author->user_email;
                $to      = $email;
                $subject = 'New Post Inserted';
                $message = '<h1>Congratulations!</h1> <h4>A new post has been inserted Successfully!</h4>: ' . $post->post_title;

                wp_mail( $to, $subject, $message );
            }
        }
    }
}

$custom_email_notifier = new Custom_Email_Notifier();