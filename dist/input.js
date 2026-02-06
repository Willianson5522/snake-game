/**
 * Handler de inputs do jogo (teclado e touch)
 */
import { KEYS, GAME_STATES } from './constants.js';
export class InputHandler {
    constructor(game) {
        this.game = game;
        this.lastDirectionChange = 0;
        this.directionChangeDelay = 50; // ms - previne mudanças muito rápidas
        this.setupKeyboardListeners();
        this.setupTouchListeners();
    }
    /**
     * Configura os listeners de teclado
     */
    setupKeyboardListeners() {
        document.body.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }
    /**
     * Configura os listeners de touch/click
     */
    setupTouchListeners() {
        // D-Pad buttons
        const btnUp = document.querySelector('#btn-up');
        const btnDown = document.querySelector('#btn-down');
        const btnLeft = document.querySelector('#btn-left');
        const btnRight = document.querySelector('#btn-right');
        const btnReset = document.querySelector('#btn-reset');
        // Controles direcionais (funcionam apenas durante o jogo)
        btnUp?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDirectionalInput('UP');
        });
        btnDown?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDirectionalInput('DOWN');
        });
        btnLeft?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDirectionalInput('LEFT');
        });
        btnRight?.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleDirectionalInput('RIGHT');
        });
        // Botão reset (funciona em qualquer estado)
        btnReset?.addEventListener('click', (e) => {
            e.preventDefault();
            this.game.reset();
        });
    }
    /**
     * Processa input direcional com debounce
     * @param direction - Direção (UP, DOWN, LEFT, RIGHT)
     */
    handleDirectionalInput(direction) {
        const now = Date.now();
        if (now - this.lastDirectionChange >= this.directionChangeDelay) {
            this.game.changeDirection(direction);
            this.lastDirectionChange = now;
        }
    }
    /**
     * Processa eventos de teclado
     * @param event
     */
    handleKeyDown(event) {
        const key = event.key;
        const state = this.game.getState();
        // Lista de teclas que não devem ter comportamento padrão
        const gameKeys = [
            KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT,
            KEYS.W, KEYS.A, KEYS.S, KEYS.D,
            KEYS.SPACE, KEYS.ENTER, KEYS.P, KEYS.R
        ];
        // Previne comportamento padrão para teclas do jogo (evita scroll com setas)
        if (gameKeys.includes(key)) {
            event.preventDefault();
        }
        // Teclas que funcionam em qualquer estado
        switch (key) {
            case KEYS.R:
                this.game.reset();
                return;
        }
        // Teclas específicas por estado
        switch (state) {
            case GAME_STATES.MENU:
                this.handleMenuKeys(key);
                break;
            case GAME_STATES.PLAYING:
                this.handlePlayingKeys(key);
                break;
            case GAME_STATES.PAUSED:
                this.handlePausedKeys(key);
                break;
            case GAME_STATES.GAME_OVER:
                this.handleGameOverKeys(key);
                break;
        }
    }
    /**
     * Processa teclas no menu inicial
     * @param key
     */
    handleMenuKeys(key) {
        switch (key) {
            case KEYS.SPACE:
            case KEYS.ENTER:
                this.game.startGame();
                break;
        }
    }
    /**
     * Processa teclas durante o jogo
     * @param key
     */
    handlePlayingKeys(key) {
        switch (key) {
            case KEYS.ARROW_UP:
            case KEYS.W:
                this.handleDirectionalInput('UP');
                break;
            case KEYS.ARROW_DOWN:
            case KEYS.S:
                this.handleDirectionalInput('DOWN');
                break;
            case KEYS.ARROW_LEFT:
            case KEYS.A:
                this.handleDirectionalInput('LEFT');
                break;
            case KEYS.ARROW_RIGHT:
            case KEYS.D:
                this.handleDirectionalInput('RIGHT');
                break;
            case KEYS.P:
                this.game.togglePause();
                break;
        }
    }
    /**
     * Processa teclas durante a pausa
     * @param key
     */
    handlePausedKeys(key) {
        switch (key) {
            case KEYS.P:
            case KEYS.SPACE:
            case KEYS.ENTER:
                this.game.togglePause();
                break;
        }
    }
    /**
     * Processa teclas na tela de game over
     * @param key
     */
    handleGameOverKeys(key) {
        switch (key) {
            case KEYS.SPACE:
            case KEYS.ENTER:
                this.game.startGame();
                break;
        }
    }
}
//# sourceMappingURL=input.js.map