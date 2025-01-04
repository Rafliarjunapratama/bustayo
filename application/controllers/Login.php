<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // Load model untuk login dan register
        $this->load->model('Login_model');
        $this->load->model('User_model');
    }

    // Halaman Login
    public function index()
    {
        $this->load->view('loginuser/index');
    }

    // Halaman Register
    public function register()
    {
        // Memeriksa apakah form register sudah disubmit
        if ($this->input->post()) {
            $username = $this->input->post('username');
            $email = $this->input->post('email');
            $password =$this->input->post('password');
            $password_lagi = $this->input->post('password_lagi');

            if ($password == $password_lagi) {
               
                // Menyimpan data ke database
                $data = [
                    'username' => $username,
                    'email' => $email,
                    'password' => $password,
                    'image' => 'default.jpg',
                    'role_id' => 3,
                ];
                $this->Login_model->register_user($data);
                // Redirect setelah register berhasil
                redirect('login');
            } else {
                // Menampilkan pesan error jika password tidak cocok
                echo 'Password tidak cocok!';
            }
        } else {
            $this->load->view('loginuser/register');
        }
    }

    // Proses Login
    public function authenticate()
    {
        $email = $this->input->post('email');
        $password = $this->input->post('password');

        $user = $this->Login_model->get_user_by_username($email);
        $pass = $this->Login_model->get_user_by_pass($password);

        if ($user &&$pass) {
            // Menyimpan data user dalam session jika login berhasil
            $this->session->set_userdata('id', $user['id']);
   

            $user = $this->User_model->get_user_by_id($user['id']);
            $role = $user ? $user->role_id : 'no image';
       
            if ($role == 1) {
                redirect('admin');
            } else {
                redirect('journey');
            }
            
        } else {
            // Menampilkan pesan error jika login gagal
            echo 'Username atau password salah!';
        }
    }
}
?>
