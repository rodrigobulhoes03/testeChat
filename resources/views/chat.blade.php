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
         data-me-name="{{ $me->name }}"
         data-other-id="{{ $user->id }}"
         data-other-name="{{ $user->name }}"
         data-conversation-id="{{ $conversationId }}"></div>

    <div id="chat-container"></div>
</body>
</html>