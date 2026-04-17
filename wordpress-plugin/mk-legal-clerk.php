<?php
/**
 * Plugin Name: MK Legal Hub - Virtual Clerk
 * Description: AI-powered legal document generator for bail petitions and court applications.
 * Version: 1.0.0
 * Author: MK Legal Hub
 * Text Domain: mk-legal-clerk
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define Constants
define('MK_LEGAL_CLERK_PATH', plugin_dir_path(__FILE__));
define('MK_LEGAL_CLERK_URL', plugin_dir_url(__FILE__));

// Include AJAX Handlers
require_once MK_LEGAL_CLERK_PATH . 'includes/ajax-handlers.php';

/**
 * Enqueue Frontend Assets (Example for implementation)
 */
function mk_legal_clerk_enqueue_scripts() {
    // Add nonces for security
    wp_localize_script('mk-legal-script', 'mk_legal_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('mk_legal_document_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'mk_legal_clerk_enqueue_scripts');
