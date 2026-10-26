import '@talkjs/web-components';
import '@talkjs/web-components/default.css';
import { getTalkSession } from '@talkjs/core';

const { appId, meId, meName, otherId, otherName, conversationId } =
  document.getElementById('chat-data').dataset;

async function iniciarChat() {
  const session = getTalkSession({ appId, userId: meId });

  await session.currentUser.createIfNotExists({ name: meName });
  await session.user(otherId).createIfNotExists({ name: otherName });

  const conversation = session.conversation(conversationId);
  await conversation.createIfNotExists();
  await conversation.participant(otherId).createIfNotExists();

  const chatbox = document.createElement('t-chatbox');
  chatbox.setAttribute('app-id', appId);
  chatbox.setAttribute('user-id', meId);
  chatbox.setAttribute('conversation-id', conversationId);
  chatbox.style.width = '400px';
  chatbox.style.height = '600px';
  document.getElementById('chat-container').appendChild(chatbox);
}

iniciarChat().catch((erro) => console.error('Erro ao iniciar o TalkJS:', erro));