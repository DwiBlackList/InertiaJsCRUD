<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;



class WelcomeController extends Controller
{
    public function welcome()
    {
        $data = Post::with('user')->get();
        // dd($data);
        return Inertia::render('Welcome', [
            'data' => $data,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
