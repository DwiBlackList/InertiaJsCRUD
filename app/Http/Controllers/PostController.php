<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller

{

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function index()
    {
        $data = Post::all();
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
        ]);

        return response()->json($post, 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function update(Request $request)
    {
        Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required'],
        ])->validate();

        if ($request->has('id')) {
            Post::find($request->input('id'))->update($request->all());
            return redirect()->back()
                ->with('message', 'Post Updated Successfully.');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */

    public function destroy(Request $request , $id)
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
