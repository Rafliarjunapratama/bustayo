<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Logout extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
    }

    // Fungsi logout
    public function index() {
        // Hapus semua data sesi
        $this->session->sess_destroy();

        // Redirect ke halaman login
        redirect('utama');
    }
}
?>
