<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::get('/chat-teste/{quem}', function (string $quem) {
    $users = ['diogo' => 'Diogo', 'nina' => 'Nina'];
    abort_unless(isset($users[$quem]), 404);
    $outro = $quem === 'diogo' ? 'nina' : 'diogo';

    return view('chat', [
        'me' => (object) ['id' => $quem, 'name' => $users[$quem]],
        'user' => (object) ['id' => $outro, 'name' => $users[$outro]],
        'conversationId' => 'chat_teste',
    ]);
});