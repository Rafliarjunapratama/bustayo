<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {
    public function __construct() {
        parent::__construct();
        // Load database jika belum diload
        $this->load->database();
    }
    public function get_user_by_id($user_id) {
        // Mengambil satu baris data user berdasarkan user_id
        return $this->db->where('id', $user_id)->get('users')->row();
    }
    public function get_user_by_role_id($user_id) {
        // Mengambil satu baris data user berdasarkan user_id
        return $this->db->where('id', $user_id)->get('role')->row();
    }

    
}
?>