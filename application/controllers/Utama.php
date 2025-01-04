<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Utama extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('SupirAktif_model');     
 
       
    }

    public function index() {
        // Load view perjalanan
        
        $this->load->view('user/tamplate/header/headercoridor/headercoridor');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/tracker/journey_view.php');
        $this->load->view('user/tamplate/botom/botomtracker/botomjurney.php');   
    }

    public function info() {
        $data['supiraktifs'] = $this->SupirAktif_model->get_all();
        // Load view perjalanan
        $this->load->view('user/tamplate/header/info/info');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/info/info',$data);
        $this->load->view('user/tamplate/botom/botominfo/botominfo');
        
     
       
        
    }

    public function coridor1() {
        // Load view perjalanan
        $data['coridor'] = 1;
        $this->load->view('user/tamplate/header/headercoridor/headercoridor.php');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/coridor/coridor1.php',$data);
        $this->load->view('user/tamplate/botom/botomcoridor/botomcoridor1.php');
        
     
       
        
    }

    public function coridor2() {
        // Load view perjalanan
        $data['coridor'] = 2;
        $this->load->view('user/tamplate/header/headercoridor/headercoridor.php');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/coridor/coridor1.php',$data);
        $this->load->view('user/tamplate/botom/botomcoridor/botomcoridor2.php');   
    }

    public function coridor3() {
        // Load view perjalanan
        $data['coridor'] = 3;
        $this->load->view('user/tamplate/header/headercoridor/headercoridor.php');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/coridor/coridor1.php',$data);
        $this->load->view('user/tamplate/botom/botomcoridor/botomcoridor3.php');   
    }

    public function coridor4() {
        // Load view perjalanan
        $data['coridor'] = 4;
        $this->load->view('user/tamplate/header/headercoridor/headercoridor.php');
        $this->load->view('utama/template/sidebar');
        $this->load->view('user/dashboard/coridor/coridor1.php',$data);
        $this->load->view('user/tamplate/botom/botomcoridor/botomcoridor4.php');   
    }
}