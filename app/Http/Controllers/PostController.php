<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller

{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function index()
    {
        $data = Post::with('user')->where('user_id', '=', Auth::user()->id)->get();
        return Inertia::render('Posts', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $post = Post::create([
            'title' => $request->input('title'),
            'body' => $request->input('body'),
            'user_id' => Auth::user()->id,
        ]);

        if ($post) {
            return redirect()->route('posts.index');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function update(Request $request, Post $post)
    {
        //set validation
        $request->validate([
            'title'   => 'required',
            'body' => 'required',
        ]);

        //update post
        $post->update([
            'title'     => $request->title,
            'body'   => $request->body
        ]);

        if ($post) {
            return redirect()->back();
        }
        // dd('test');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy(Request $request, $id)
    {
        // if ($request->has('id')) {
        //     Post::find($request->input('id'))->delete();
        //     // return redirect()->back();
        // }
        $delete = Post::find($id);
        $delete->delete();
        return redirect()->back();
        // dd($delete);
    }
}
