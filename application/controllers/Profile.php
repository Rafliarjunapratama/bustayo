<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Profile_model');
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
            $this->load->view('user/tamplate/header/info/info');
            $this->load->view('user/tamplate/header/sidebar', $data);
            $this->load->view('user/dashboard/profile/profile', $data);
            $this->load->view('user/tamplate/botom/botomprofile/botomprofile');
        } else {
            redirect('login');
        }
    }

    public function update_profile() {
        $user_id = $this->session->userdata('id');
        $username = $this->input->post('username');
        $pass = $this->input->post('pass');
        $user = $this->User_model->get_user_by_id($user_id);
        // Retrieve current user data
        $current_user = $this->Profile_model->get_profile($user_id);
     
        // Validate and use existing username and password if not provided
        $username = !empty($username) ? $username : $current_user->username;
        $pass = !empty($pass) ? $pass : $current_user->password;
        $image = $current_user->image; // Keep current image if no new one is uploaded

        // Retrieve user data based on user_id
        $user = $this->User_model->get_user_by_id($user_id);

        // Pass user data to view
        $data['username'] = $user ? $user->username : 'Guest';

        if ($user) {
            // Handle profile image upload if a new image is selected
            if (!empty($_FILES['image']['name'])) {
                $config['upload_path'] = './assets/img/upload/'; // Ensure this path is correct
                $config['allowed_types'] = 'jpg|jpeg|png';
                $config['max_size'] = 8048; // 8 MB limit

                $this->load->library('upload', $config);

                if ($this->upload->do_upload('image')) {
                    $upload_data = $this->upload->data();
                    $image = $upload_data['file_name']; // Set the new image name
                } else {
                    $error = $this->upload->display_errors();
                    log_message('error', 'Image upload error: ' . $error);
                    $this->session->set_flashdata('error', 'Failed to upload image: ' . $error);
                    redirect('profile'); // Redirect if image upload fails
                    return;
                }
            }

            // Prepare data for profile update
            $update_data = [
                'username' => $username,
                'password' => $pass,
                'image' => $image
            ];

            // Update profile in database
            if ($this->Profile_model->update_profile($user_id, $update_data)) {
                $this->session->set_flashdata('success', 'Profile updated successfully.');
            } else {
                $this->session->set_flashdata('error', 'Failed to update profile.');
            }

            redirect('profile');
        } else {
            redirect('login');
        }
    }
}
