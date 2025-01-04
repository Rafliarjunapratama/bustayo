<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    // Menyimpan data user saat register
    public function register_user($data)
    {
        return $this->db->insert('users', $data);
    }

    // Mengambil data user berdasarkan username
    public function get_user_by_username($email)
    {
        $this->db->where('email', $email);
        $query = $this->db->get('users');
        return $query->row_array(); // Mengembalikan satu row jika ditemukan
    }

    public function get_user_by_pass($password)
    {
        $this->db->where('password', $password);
        $query = $this->db->get('users');
        return $query->row_array(); // Mengembalikan satu row jika ditemukan
    }

}
?>
