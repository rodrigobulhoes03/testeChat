<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');

Route::get('/chat-teste/{quem}', function (string $quem) {
    $users = ['frank' => 'Frank', 'nina' => 'Nina', 'rui' => 'Rui', 'rodrigo' => 'Rodrigo', 'vanda' => 'Vanda', 'ana' => 'Ana'];
    abort_unless(isset($users[$quem]), 404);

    $contactos = collect($users)
        ->except($quem)
        ->map(fn ($nome, $id) => ['id' => $id, 'name' => $nome])
        ->values();

    return view('chat', [
        'me' => (object) ['id' => $quem, 'name' => $users[$quem]],
        'contactos' => $contactos,
    ]);
});