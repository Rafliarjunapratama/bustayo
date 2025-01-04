<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile_model extends CI_Model {
    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function update_profile($user_id, $data) {
        $this->db->where('id', $user_id);
        return $this->db->update('users', $data);
    }

    public function get_profile($user_id) {
        $this->db->where('id', $user_id);
        $query = $this->db->get('users'); // Replace 'users' with your table name
        return $query->row(); // Return a single row as an object
    }
}
