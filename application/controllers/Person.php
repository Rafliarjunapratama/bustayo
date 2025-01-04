<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Person extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
    }
 
    public function index() {
     $user_id = $this->session->userdata('id');

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';

        if ($user) {
            // Load view perjalanan
            $data['coridor'] = "all";
            $this->load->view('user/tamplate/header/user/headerperson');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/person/user1', $data);
            $this->load->view('user/tamplate/botom/botomuser/botomuserall');
        } else {
            redirect('login');
        }
    }

    public function coridor1() {
     $user_id = $this->session->userdata('id');

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';

        if ($user) {
            // Load view perjalanan
            $data['coridor'] = 1;
            $this->load->view('user/tamplate/header/user/headerperson');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/person/user1', $data);
            $this->load->view('user/tamplate/botom/botomuser/botomuser');
        } else {
            redirect('login');
        }
    }

    public function coridor2() {
     $user_id = $this->session->userdata('id');

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';

        if ($user) {
            // Load view perjalanan
            $data['coridor'] = 2;
            $this->load->view('user/tamplate/header/user/headerperson');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/person/user1', $data);
            $this->load->view('user/tamplate/botom/botomuser/botomuser2');
        } else {
            redirect('login');
        }
    }

    public function coridor3() {
     $user_id = $this->session->userdata('id');

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';

        if ($user) {
            // Load view perjalanan
            $data['coridor'] = 3;
            $this->load->view('user/tamplate/header/user/headerperson');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/person/user1', $data);
            $this->load->view('user/tamplate/botom/botomuser/botomuser3');
        } else {
            redirect('login');
        }
    }

    public function coridor4() {
     $user_id = $this->session->userdata('id');

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data (like username) to the view
    $data['username'] = $user ? $user->username : 'Guest';
        $data['emailo'] = $user ? $user->email : 'No email available';
        $data['gambar'] = $user ? $user->image : 'no image';

        $role = $user ? $user->role_id : 'no image';
        $users = $this->User_model->get_user_by_role_id($role);
        $data['role'] = $users ? $users->role : 'Guest';

        if ($user) {
            // Load view perjalanan
            $data['coridor'] = 4;
            $this->load->view('user/tamplate/header/user/headerperson');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/person/user1', $data);
            $this->load->view('user/tamplate/botom/botomuser/botomuser4');
        } else {
            redirect('login');
        }
    }

}
