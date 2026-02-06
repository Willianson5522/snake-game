export const CONFIG = {
    CANVAS: {
        WIDTH: 320,
        HEIGHT: 320,
        BACKGROUND_COLOR: 'black'
    },
    GAME: {
        INITIAL_SPEED: 7,
        TILE_COUNT: 20,
        INITIAL_TAIL_LENGTH: 1
    },
    COLORS: {
        SNAKE: '#00ff88',
        SNAKE_HEAD: '#00ffaa',
        SNAKE_TAIL: '#00cc6a',
        APPLE: '#ff006e',
        APPLE_GLOW: '#ff006e',
        GRID: 'rgba(0, 255, 136, 0.05)',
        BACKGROUND: '#0a0a0f',
        SCORE: '#ffffff'
    },
    FONTS: {
        SCORE: '14px Verdana, sans-serif',
        GAME_OVER: '50px Georgia, serif',
        SUBTITLE: '20px Verdana, sans-serif',
        HUD: '12px Verdana, sans-serif'
    },
    MESSAGES: {
        GAME_OVER: 'Game Over!',
        SCORE_PREFIX: 'Score: ',
        HIGH_SCORE_PREFIX: 'High Score: ',
        TIME_PREFIX: 'Time: ',
        PAUSED: 'PAUSED',
        START: 'Pressione ESPAÇO ou ENTER para começar',
        NEW_RECORD: 'NOVO RECORDE!'
    },
    START_POSITION: {
        HEAD_X: 10,
        HEAD_Y: 10,
        APPLE_X: 5,
        APPLE_Y: 5
    }
};
export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
    NONE: { x: 0, y: 0 }
};
export const KEYS = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    R: 'r',
    P: 'p',
    SPACE: ' ',
    ENTER: 'Enter'
};
export const GAME_STATES = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER'
};
export const DIFFICULTY_SETTINGS = {
    EASY: {
        name: 'Fácil',
        initialSpeed: 5,
        speedIncrement: 0.3,
        maxSpeed: 12
    },
    MEDIUM: {
        name: 'Médio',
        initialSpeed: 7,
        speedIncrement: 0.5,
        maxSpeed: 18
    },
    HARD: {
        name: 'Difícil',
        initialSpeed: 10,
        speedIncrement: 0.8,
        maxSpeed: 25
    }
};
//# sourceMappingURL=constants.js.map