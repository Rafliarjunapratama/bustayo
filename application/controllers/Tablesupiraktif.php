<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tablesupiraktif extends CI_Controller {

    public function __construct() {
        parent::__construct();
        // Memuat model yang sudah dibuat
        $this->load->model('SupirAktif_model');
        $this->load->model('UserModel'); // Pastikan model sudah ada
        $this->load->model('User_model');
        $this->load->model('Login_model');
    }

    // Menampilkan semua data supir aktif
    public function index() {
        // Mengambil data dari model
        $data['supiraktifs'] = $this->SupirAktif_model->get_all();
        $data['users'] = $this->UserModel->get_all_users_with_roles(); 
       

        $user_id = $this->session->userdata('id');
        $user = $this->User_model->get_user_by_id($user_id);
        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';


        if ($user) {
        // Menampilkan view$this->load->view('admin/template/header');
        $this->load->view('admin/template/header');
        $this->load->view('admin/template/sidebar', $data);
        $this->load->view('admin/dashboard/supir/supir_view', $data);
        $this->load->view('admin/template/botom');
    } else {
        redirect('login');
    }
    }

    // Menampilkan form tambah data supir aktif
    public function add() {
   
        $data['users'] = $this->UserModel->get_all_users_with_roles(); 
       

        $user_id = $this->session->userdata('id');
        $user = $this->User_model->get_user_by_id($user_id);
        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';


        if ($user) {
        // Menampilkan view$this->load->view('admin/template/header');
        $this->load->view('admin/template/header');
        $this->load->view('admin/template/sidebar', $data);
        $this->load->view('admin/dashboard/supir/add_supir', $data);
        $this->load->view('admin/template/botom');
    } else {
        redirect('login');
    }
    }

    public function save() {
        $data = [
            'coridor' => $this->input->post('coridor'),
            'supir' => $this->input->post('supir'),
        ];
        // Menyimpan data ke database
        $this->SupirAktif_model->add($data);
        redirect('Tablesupiraktif');
    }

    // Menampilkan form edit data supir aktif
    public function edit($id) {
        // Mengambil data berdasarkan ID
        $data['supiraktif'] = $this->SupirAktif_model->edit($id);
        
        $data['users'] = $this->UserModel->get_all_users_with_roles(); 
       

        $user_id = $this->session->userdata('id');
        $user = $this->User_model->get_user_by_id($user_id);
        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';


        if ($user) {
        // Menampilkan view$this->load->view('admin/template/header');
        $this->load->view('admin/template/header');
        $this->load->view('admin/template/sidebar', $data);
        $this->load->view('admin/dashboard/supir/edit_supir', $data);
        $this->load->view('admin/template/botom');
    } else {
        redirect('login');
    }
    }

    public function update($id) {
        // Pastikan $id diterima
        $data_update = [
            'coridor' => $this->input->post('coridor'),
            'supir' => $this->input->post('supir'),
        ];
    
        // Memperbarui data ke database
        $this->SupirAktif_model->update($id, $data_update);
    
        // Redirect ke halaman yang sesuai setelah update
        redirect('Tablesupiraktif');
    }
    

    // Menghapus data berdasarkan ID
    public function delete($id) {
        // Menghapus data dari database
        $this->SupirAktif_model->delete($id);
        redirect('Tablesupiraktif');
    }
}
