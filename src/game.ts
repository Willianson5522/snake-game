/**
 * Classe principal do jogo Snake
 * Gerencia o estado, lógica e renderização
 */
import { CONFIG, GAME_STATES, DIFFICULTY_SETTINGS } from './constants';
import { Snake } from './snake';
import { Apple } from './apple';
import { InputHandler } from './input';
import { HighScoreManager } from './highscore';
import { GameState, Difficulty, DifficultySettings } from './types';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  tileCount: number;
  speed: number;
  snake: Snake;
  apple: Apple;
  score: number;
  state: GameState;
  isNewRecord: boolean;
  difficulty: Difficulty;
  difficultySettings: DifficultySettings;

  private highScoreManager: HighScoreManager;
  private lastTime: number;
  private accumulator: number;
  private fixedDeltaTime: number;
  private gameTime: number;
  private startTime: number;

  // UI Elements
  private menuScreen!: HTMLElement | null;
  private pauseOverlay!: HTMLElement | null;
  private gameOverScreen!: HTMLElement | null;
  private hudScore!: HTMLElement | null;
  private hudHighScore!: HTMLElement | null;
  private hudTime!: HTMLElement | null;
  private menuHighScore!: HTMLElement | null;
  private finalScore!: HTMLElement | null;
  private newRecordElement!: HTMLElement | null;
  private difficultySelect!: HTMLSelectElement | null;

  constructor(canvasId: string) {
    const canvas = document.querySelector(canvasId);
    if (!canvas) {
      throw new Error(`Canvas com id "${canvasId}" não encontrado`);
    }

    this.canvas = canvas as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Não foi possível obter contexto 2D do canvas');
    }

    this.ctx = ctx;
    this.tileCount = CONFIG.GAME.TILE_COUNT;
    this.difficulty = 'MEDIUM';
    this.difficultySettings = DIFFICULTY_SETTINGS[this.difficulty];
    this.speed = this.difficultySettings.initialSpeed;

    this.snake = new Snake(this.tileCount);
    this.apple = new Apple(this.tileCount);
    this.score = 0;
    this.state = GAME_STATES.MENU;
    this.isNewRecord = false;

    this.highScoreManager = new HighScoreManager();
    new InputHandler(this);

    this.lastTime = 0;
    this.accumulator = 0;
    this.fixedDeltaTime = 1000 / this.speed;
    this.gameTime = 0;
    this.startTime = 0;

    // Initialize UI elements
    this.initializeUI();
    this.setupEventListeners();
    this.updateMenuHighScore();
  }

  /**
   * Inicializa referências aos elementos da UI
   */
  private initializeUI(): void {
    this.menuScreen = document.querySelector('#menu-screen');
    this.pauseOverlay = document.querySelector('#pause-overlay');
    this.gameOverScreen = document.querySelector('#game-over-screen');
    this.hudScore = document.querySelector('#hud-score');
    this.hudHighScore = document.querySelector('#hud-highscore');
    this.hudTime = document.querySelector('#hud-time');
    this.menuHighScore = document.querySelector('#menu-highscore');
    this.finalScore = document.querySelector('#final-score');
    this.newRecordElement = document.querySelector('#new-record');
    this.difficultySelect = document.querySelector('#difficulty') as HTMLSelectElement;

    // Set initial HUD values
    this.updateHUD();
  }

  /**
   * Configura event listeners dos botões
   */
  private setupEventListeners(): void {
    // Start button
    document.querySelector('#btn-start')?.addEventListener('click', () => {
      this.startGame();
    });

    // Resume button
    document.querySelector('#btn-resume')?.addEventListener('click', () => {
      this.togglePause();
    });

    // Restart button
    document.querySelector('#btn-restart')?.addEventListener('click', () => {
      this.startGame();
    });

    // Reset button
    document.querySelector('#btn-reset')?.addEventListener('click', () => {
      this.reset();
    });

    // Pause button
    document.querySelector('#btn-pause')?.addEventListener('click', () => {
      this.togglePause();
    });

    // Difficulty selector
    this.difficultySelect?.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      this.setDifficulty(target.value as Difficulty);
    });
  }

  /**
   * Define a dificuldade do jogo
   */
  setDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
    this.difficultySettings = DIFFICULTY_SETTINGS[difficulty];

    if (this.state === GAME_STATES.MENU) {
      this.speed = this.difficultySettings.initialSpeed;
      this.fixedDeltaTime = 1000 / this.speed;
    }
  }

  /**
   * Inicia o jogo
   */
  start(): void {
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * Loop principal do jogo
   */
  private gameLoop(currentTime: number): void {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.state === GAME_STATES.PLAYING) {
      this.accumulator += deltaTime;
      this.gameTime = currentTime - this.startTime;

      while (this.accumulator >= this.fixedDeltaTime) {
        this.update();
        this.accumulator -= this.fixedDeltaTime;
      }

      this.updateHUD();
    }

    this.render(currentTime);
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * Atualiza o estado do jogo
   */
  private update(): void {
    // Move a cobra primeiro
    this.snake.move();

    // Verifica colisões ANTES de atualizar as partes
    if (this.snake.hasStarted()) {
      if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
        this.handleGameOver();
        return;
      }
    }

    // Verifica colisão com a maçã
    if (this.snake.checkAppleCollision(this.apple)) {
      // Cresce ANTES de atualizar as partes para garantir crescimento imediato
      this.snake.grow();
      this.score++;
      // Reposiciona a maçã
      this.apple.respawnSafe(this.snake.getAllParts());
      // Aumenta velocidade a cada 5 pontos
      if (this.score % 5 === 0 && this.speed < this.difficultySettings.maxSpeed) {
        this.speed += this.difficultySettings.speedIncrement;
        this.fixedDeltaTime = 1000 / this.speed;
      }
    }

    // Atualiza as partes da cobra DEPOIS de possivelmente crescer
    this.snake.updateParts();
  }

  /**
   * Renderiza o jogo
   */
  private render(time: number): void {
    this.clearScreen();
    this.drawGrid();

    if (this.state !== GAME_STATES.MENU) {
      this.apple.render(this.ctx, time);
      this.snake.render(this.ctx);
    }

    this.updateScreens();
  }

  /**
   * Desenha o grid de fundo
   */
  private drawGrid(): void {
    this.ctx.strokeStyle = CONFIG.COLORS.GRID;
    this.ctx.lineWidth = 1;

    const tileSize = this.canvas.width / this.tileCount;

    for (let i = 0; i <= this.tileCount; i++) {
      const pos = i * tileSize;

      this.ctx.beginPath();
      this.ctx.moveTo(pos, 0);
      this.ctx.lineTo(pos, this.canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, pos);
      this.ctx.lineTo(this.canvas.width, pos);
      this.ctx.stroke();
    }
  }

  /**
   * Atualiza a visibilidade das telas
   */
  private updateScreens(): void {
    this.menuScreen?.classList.toggle('hidden', this.state !== GAME_STATES.MENU);
    this.pauseOverlay?.classList.toggle('hidden', this.state !== GAME_STATES.PAUSED);
    this.gameOverScreen?.classList.toggle('hidden', this.state !== GAME_STATES.GAME_OVER);
  }

  /**
   * Atualiza o HUD
   */
  private updateHUD(): void {
    if (this.hudScore) {
      this.hudScore.textContent = this.score.toString();
    }
    if (this.hudHighScore) {
      this.hudHighScore.textContent = this.highScoreManager.get().toString();
    }
    if (this.hudTime) {
      this.hudTime.textContent = this.formatTime(this.gameTime);
    }
  }

  /**
   * Atualiza o high score no menu
   */
  private updateMenuHighScore(): void {
    if (this.menuHighScore) {
      this.menuHighScore.textContent = this.highScoreManager.get().toString();
    }
  }

  /**
   * Formata o tempo
   */
  private formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Limpa a tela
   */
  private clearScreen(): void {
    this.ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Inicia o jogo
   */
  startGame(): void {
    this.reset();
    this.state = GAME_STATES.PLAYING;
    this.startTime = performance.now();
    this.gameTime = 0;
  }

  /**
   * Pausa/Despausa
   */
  togglePause(): void {
    if (this.state === GAME_STATES.PLAYING) {
      this.state = GAME_STATES.PAUSED;
    } else if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.PLAYING;
      this.startTime = performance.now() - this.gameTime;
    }
  }

  /**
   * Altera direção
   */
  changeDirection(direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): void {
    if (this.state === GAME_STATES.PLAYING) {
      this.snake.changeDirection(direction);
    }
  }

  /**
   * Game over
   */
  private handleGameOver(): void {
    this.state = GAME_STATES.GAME_OVER;
    this.isNewRecord = this.highScoreManager.checkAndUpdate(this.score);

    if (this.finalScore) {
      this.finalScore.textContent = this.score.toString();
    }
    if (this.newRecordElement) {
      this.newRecordElement.classList.toggle('hidden', !this.isNewRecord);
    }

    this.updateMenuHighScore();
  }

  /**
   * Reseta o jogo
   */
  reset(): void {
    this.snake.reset();
    this.apple.reset();
    this.score = 0;
    this.speed = this.difficultySettings.initialSpeed;
    this.fixedDeltaTime = 1000 / this.speed;
    this.accumulator = 0;
    this.gameTime = 0;
    this.isNewRecord = false;
    this.state = GAME_STATES.MENU;

    this.updateHUD();
  }

  /**
   * Retorna estado atual
   */
  getState(): GameState {
    return this.state;
  }
}
