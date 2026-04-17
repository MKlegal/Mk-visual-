<?php
/**
 * AJAX Handlers for Legal Document Generation
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register AJAX hooks for authenticated and guest users
add_action('wp_ajax_generate_bail_pdf', 'mk_handle_generate_bail_pdf');
add_action('wp_ajax_nopriv_generate_bail_pdf', 'mk_handle_generate_bail_pdf');

function mk_handle_generate_bail_pdf() {
    // 1. Security Check
    // check_ajax_referer('mk_legal_document_nonce', 'security');

    // 2. Data Extraction
    $court_type    = sanitize_text_field($_POST['court_type']);
    $district      = sanitize_text_field($_POST['district']);
    $bail_type     = sanitize_text_field($_POST['bail_type']); // '497' or '498'
    $accused_name  = sanitize_text_field($_POST['accused_name']);
    $father_name   = sanitize_text_field($_POST['father_name']);
    $fir_no        = sanitize_text_field($_POST['fir_no']);
    $fir_year      = sanitize_text_field($_POST['fir_year']);
    $police_station = sanitize_text_field($_POST['police_station']);
    $sections      = sanitize_text_field($_POST['sections']);

    // 3. Auto-Legal Grounds Logic
    $legal_grounds = [];
    if (strpos($bail_type, '497') !== false) {
        $legal_grounds[] = "That the case is one of further inquiry under section 497(2) Cr.P.C.";
        $legal_grounds[] = "That the accused is entitled to bail on the ground of statutory delay as per the latest precedents.";
        $legal_grounds[] = "That the investigation is complete and the accused is no more required for any recovery.";
    } else if (strpos($bail_type, '498') !== false) {
        $legal_grounds[] = "That the case is based on malafide intention and ulterior motives of the complainant/police.";
        $legal_grounds[] = "That the accused has been falsely implicated to disgrace and humiliate him.";
        $legal_grounds[] = "That there is no apprehension of the accused absconding or tampering with prosecution evidence.";
    }

    // 4. mPDF Initialization (Assumes mPDF is installed via Composer in the plugin)
    // require_once MK_LEGAL_CLERK_PATH . 'vendor/autoload.php';
    
    try {
        // Initialize mPDF with Pakistani Legal Standard Settings
        $mpdf = new \Mpdf\Mpdf([
            'format' => 'Legal-P', // 8.5 x 14 inches
            'margin_left' => 35,   // Wide margin for court file binding
            'margin_right' => 15,
            'margin_top' => 15,
            'margin_bottom' => 15,
            'mode' => 'utf-8',
            'autoScriptToLang' => true,
            'autoLangToFont' => true,
        ]);

        // 5. HTML Template Structure
        $html = "
        <div style='font-family: serif; font-size: 14pt; line-height: 1.6;'>
            <div style='text-align: center; font-weight: bold; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;'>
                IN THE COURT OF $court_type AT $district
            </div>

            <div style='margin-bottom: 15px;'>
                <b>$accused_name</b> s/o $father_name ... <i>Petitioner</i>
            </div>

            <div style='text-align: center; font-weight: bold; margin: 20px 0;'>VERSUS</div>

            <div style='margin-bottom: 30px;'>
                The State & Another ... <i>Respondents</i>
            </div>

            <div style='background: #f0f0f0; padding: 10px; border: 1px solid #ccc; margin-bottom: 20px;'>
                <b>CASE DETAILS:</b><br>
                FIR No: $fir_no/$fir_year<br>
                Police Station: $police_station<br>
                Offence: $sections PPC
            </div>

            <div style='text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 20px;'>
                APPLICATION UNDER SECTION $bail_type CR.P.C FOR GRANT OF BAIL
            </div>

            <p>Respectfully Sheweth,</p>
            
            <ol>
                <li>That the petitioner is innocent and has been falsely implicated in the above-mentioned case.</li>
                <li>That the facts of the FIR are concocted and based on sheer fabrication.</li>";

        // Inject Dynamic Legal Grounds
        foreach ($legal_grounds as $ground) {
            $html .= "<li>$ground</li>";
        }

        $html .= "
                <li>That the petitioner is a law-abiding citizen and ready to provide reliable sureties.</li>
            </ol>

            <div style='margin-top: 40px;'>
                <p><b>PRAYER:</b></p>
                <p>It is, therefore, most humbly prayed that the petitioner may graciously be granted bail till the final decision of the case in the interest of justice.</p>
            </div>

            <div style='margin-top: 60px; text-align: right;'>
                <p>PETITIONER<br>Through Counsel<br><b>MK Legal Hub AI</b></p>
            </div>
        </div>";

        // 6. PDF Rendering and Response
        $mpdf->WriteHTML($html);

        // Save to uploads directory
        $upload_dir = wp_upload_dir();
        $base_path = $upload_dir['basedir'] . '/mk-drafts/';
        if (!file_exists($base_path)) {
            mkdir($base_path, 0755, true);
        }

        $filename = 'bail-petition-' . time() . '.pdf';
        $file_path = $base_path . $filename;
        $download_url = $upload_dir['baseurl'] . '/mk-drafts/' . $filename;

        $mpdf->Output($file_path, \Mpdf\Output\Destination::FILE);

        wp_send_json_success([
            'download_url' => $download_url,
            'filename' => $filename,
            'message' => 'Document generated successfully.'
        ]);

    } catch (\Exception $e) {
        wp_send_json_error(['message' => 'mPDF Error: ' . $e->getMessage()]);
    }
}
