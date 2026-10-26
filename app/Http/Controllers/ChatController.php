<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        $me = Auth::user();
        $conversationId = 'chat_' . collect([$me->id, $user->id])->sort()->join('_');

        return view('chat', compact('me', 'user', 'conversationId'));
    }
}