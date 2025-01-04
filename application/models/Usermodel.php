<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UserModel extends CI_Model {
    public function __construct() {
        parent::__construct();
        // Load database jika belum diload
        $this->load->database();
    }
    
    public function get_all_users() {
        return $this->db->get('users')->result(); // Ambil semua data user dari tabel 'users'
    }
    public function get_all_users_with_roles() {
        $this->db->select('users.*, role.role'); // Memilih kolom dari tabel users dan role
        $this->db->from('users');
        $this->db->join('role', 'users.role_id = role.id', 'left'); // Left join dengan tabel role berdasarkan role_id
        $query = $this->db->get();
        return $query->result(); // Mengembalikan hasil sebagai objek
    }
    public function get_all_roles() {
        return $this->db->get('role')->result(); // Ambil semua data user dari tabel 'users'
    }
    
    

    public function get_user_by_id($id) {
        return $this->db->get_where('users', ['id' => $id])->row(); // Ambil data user berdasarkan ID
    }

    public function insert_user($data) {
        $this->db->insert('users', $data); // Menambahkan data user baru ke tabel 'users'
    }

    public function delete_user($id) {
        $this->db->delete('users', ['id' => $id]); // Hapus data user berdasarkan ID
    }

    public function update_user($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('users', $data); // Update data user berdasarkan ID
    }
}
