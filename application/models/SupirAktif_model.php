<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SupirAktif_model extends CI_Model {

    // Nama tabel di database
    private $table = 'supiraktif';

    public function __construct() {
        parent::__construct();
    }

    // Fungsi untuk mengambil semua data supir aktif
    public function get_all() {
        return $this->db->get($this->table)->result();
    }

    // Fungsi untuk menambahkan data supir aktif
    public function add($data) {
        return $this->db->insert($this->table, $data);
    }

    // Fungsi untuk mengedit data berdasarkan ID
    public function edit($id) {
        return $this->db->get_where($this->table, ['id' => $id])->row();
    }

    // Fungsi untuk memperbarui data supir aktif
    public function update($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update($this->table, $data);
    }

    // Fungsi untuk menghapus data berdasarkan ID
    public function delete($id) {
        return $this->db->delete($this->table, ['id' => $id]);
    }
}
