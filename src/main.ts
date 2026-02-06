/**
 * Entry point do jogo Snake
 * Inicializa e inicia o jogo quando o DOM estiver pronto
 */
import { Game } from './game';

// Inicia o jogo quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  try {
    const game = new Game('#game');
    game.start();
  } catch (error) {
    console.error('Erro ao iniciar o jogo:', error);
    document.body.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Erro ao carregar o jogo. Por favor, recarregue a página.</p>';
  }
});
