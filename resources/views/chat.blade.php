<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Chat</title>
    @vite('resources/js/chat.js')
</head>
<body>
    <div id="chat-data"
         data-app-id="{{ config('services.talkjs.app_id') }}"
         data-me-id="{{ $me->id }}"
         data-me-name="{{ $me->name }}"></div>

    <div style="display: flex; gap: 16px; padding: 16px; font-family: sans-serif;">
        <aside style="width: 220px;">
            <h3>Contactos</h3>
                @foreach ($contactos as $c)
        <button class="contacto"
                data-id="{{ $c['id'] }}"
                data-name="{{ $c['name'] }}"
                style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 10px; margin-bottom: 6px; text-align: left; cursor: pointer;">
            <span>{{ $c['name'] }}</span>
            <span class="badge"
                style="display: none; background: #e53935; color: #fff; border-radius: 12px; padding: 2px 8px; font-size: 12px; font-weight: bold;">0</span>
        </button>
    @endforeach
        </aside>

        <main id="chat-container" style="flex: 1;">
            <p>Escolhe um contacto para começar a conversar.</p>
        </main>
    </div>
</body>
</html>