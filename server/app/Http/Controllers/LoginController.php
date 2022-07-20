<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller{
    public function __construct(){

    }
    public function index(Request $request){   
        return "hi";
    }
    public function data(){
        return "some data";
    }
}