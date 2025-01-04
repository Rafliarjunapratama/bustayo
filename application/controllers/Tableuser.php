<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Tableuser extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('UserModel'); // Pastikan model sudah ada
        $this->load->model('User_model');
        $this->load->model('Login_model');
    }

    public function index() {
        $data['users'] = $this->UserModel->get_all_users(); // Ambil semua data user
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

        $this->load->view('admin/template/header');
        $this->load->view('admin/template/sidebar', $data);
        $this->load->view('admin/dashboard/table/user_view', $data);
        $this->load->view('admin/template/botom');
        } else {
            redirect('login');
        }
    } 

    public function delete($id) {
        $this->UserModel->delete_user($id); // Hapus user berdasarkan ID
        redirect('Tableuser'); // Redirect ke halaman utama setelah dihapus
    }

    public function add() {
        // Load the roles to pass to the view
        $data['roles'] = $this->UserModel->get_all_roles();
    
        // Get user information if available (for editing or display purposes)
        $user_id = $this->session->userdata('id');
        $user = $this->User_model->get_user_by_id($user_id);
        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';
      
    
        // Load view files only if user is logged in
        if ($user) {
            if ($role == 1) {
                $this->load->view('admin/template/header');
                $this->load->view('admin/template/sidebar', $data);
                $this->load->view('admin/dashboard/table/add_user', $data); // Pass roles and user info
                $this->load->view('admin/template/botom');
            } else {
                $this->load->view('admin/template/header');
                $this->load->view('admin/template/sidebar', $data);
                $this->load->view('admin/dashboard/table/add_user_moderator', $data); // Pass roles and user info
                $this->load->view('admin/template/botom');
            }
           
        } else {
            redirect('login'); // Redirect to login if user is not logged in
        }
    }
    

    public function save() {
        $data = [
            'username' => $this->input->post('username'),
            'email' => $this->input->post('email'),
            'password' => $this->input->post('password'),
            'image' =>  'default.jpg', // Menggunakan gambar default jika tidak ada input
            'role_id' => $this->input->post('role_id')
        ];
        $this->UserModel->insert_user($data); // Simpan user baru
        redirect('Tableuser'); // Redirect setelah menambah data
    }

    public function edit($id) {
        $data['user'] = $this->UserModel->get_user_by_id($id); // Ambil data user berdasarkan ID
        $data['roles'] = $this->UserModel->get_all_roles();
    
        // Get user information if available (for editing or display purposes)
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
            if ($role ==1) {
                $this->load->view('admin/template/header');
                $this->load->view('admin/template/sidebar', $data);
                $this->load->view('admin/dashboard/table/edit_user', $data); // Pass roles and user info
                $this->load->view('admin/template/botom');
            }else{
                $this->load->view('admin/template/header');
                $this->load->view('admin/template/sidebar', $data);
                $this->load->view('admin/dashboard/table/edit_user_moderator', $data); // Pass roles and user info
                $this->load->view('admin/template/botom');
            }
           
        } else {
            redirect('login'); // Redirect to login if user is not logged in
        }


    }

    public function update() {
        $id = $this->input->post('id');
        
        // Load file upload library
        $config['upload_path'] = './assets/img/upload/'; // Define upload path
        $config['allowed_types'] = 'jpg|jpeg|png|gif'; // Allowed file types
        $config['max_size'] = 9048; // Limit upload size to 2MB
        
        $this->load->library('upload', $config);
        
        // Initialize data array with other fields
        $data = [
            'username' => $this->input->post('username'),
            'email' => $this->input->post('email'),
            'role_id' => $this->input->post('role_id'),
            "password" =>$this->input->post('password')
        ];
        
        // Check if a new password is provided
      
       
        
        // Handle file upload
        if ($this->upload->do_upload('image')) {
            $uploadData = $this->upload->data();
            $data['image'] = $uploadData['file_name'];
        } else {
            // Jika tidak ada file baru yang diunggah, gunakan file gambar lama
            $data['image'] = $this->input->post('current_image');
        }
        
        // Update user data in the database
        $this->UserModel->update_user($id, $data);
        
        // Redirect to the user table page after update
        redirect('Tableuser');
    }
    
    
}
