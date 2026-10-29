import '@talkjs/web-components';
import '@talkjs/web-components/default.css';
import { getTalkSession } from '@talkjs/core';

const { appId, meId, meName } = document.getElementById('chat-data').dataset;

const session = getTalkSession({ appId, userId: meId });
const euCriado = session.currentUser.createIfNotExists({ name: meName });

let conversaAberta = null;

// ID único por par de utilizadores, igual para os dois lados
function idConversa(otherId) {
  return 'chat_' + [meId, otherId].sort().join('_');
}

async function abrirConversa(otherId, otherName) {
  await euCriado;
  await session.user(otherId).createIfNotExists({ name: otherName });

  const conversationId = idConversa(otherId);
  const conversation = session.conversation(conversationId);
  await conversation.createIfNotExists();
  await conversation.participant(otherId).createIfNotExists();

  conversaAberta = conversationId;

  const container = document.getElementById('chat-container');
  container.innerHTML = '';

  const chatbox = document.createElement('t-chatbox');
  chatbox.setAttribute('app-id', appId);
  chatbox.setAttribute('user-id', meId);
  chatbox.setAttribute('conversation-id', conversationId);
  chatbox.style.width = '100%';
  chatbox.style.height = '600px';
  container.appendChild(chatbox);
}

document.querySelectorAll('.contacto').forEach((botao) => {
  botao.addEventListener('click', () => {
    abrirConversa(botao.dataset.id, botao.dataset.name)
      .catch((erro) => console.error('Erro ao abrir a conversa:', erro));
  });
});

// Bolinhas de não lidas + ordenar contactos pela última mensagem
euCriado.then(() => {
  session.subscribeConversations((conversas) => {
    const naoLidas = {};
    conversas.forEach((c) => {
      naoLidas[c.id] = c.unreadMessageCount;
    });

    // Conversas com mensagens, da mais recente para a mais antiga
    const ordem = conversas
      .filter((c) => c.lastMessage)
      .sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt)
      .map((c) => c.id);

    const botoes = [...document.querySelectorAll('.contacto')];

    // Atualizar as bolinhas
    botoes.forEach((botao) => {
      const id = idConversa(botao.dataset.id);
      // Na conversa que já está aberta não mostramos a bolinha
      const total = id === conversaAberta ? 0 : (naoLidas[id] || 0);
      const badge = botao.querySelector('.badge');
      badge.textContent = total;
      badge.style.display = total > 0 ? 'inline-block' : 'none';
    });

    // Reordenar: primeiro quem tem mensagens (mais recente no topo),
    // depois os restantes contactos pela ordem original
    const posicao = (botao) => {
      const i = ordem.indexOf(idConversa(botao.dataset.id));
      return i === -1 ? Infinity : i;
    };

    const ordenados = botoes
      .map((botao, indiceOriginal) => ({ botao, indiceOriginal }))
      .sort((a, b) => {
        const pa = posicao(a.botao);
        const pb = posicao(b.botao);
        if (pa !== pb) return pa - pb;
        return a.indiceOriginal - b.indiceOriginal;
      });

    const lista = botoes[0]?.parentElement;
    ordenados.forEach(({ botao }) => lista.appendChild(botao));
  });
}).catch((erro) => console.error('Erro nas notificações:', erro));