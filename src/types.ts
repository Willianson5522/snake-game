/**
 * Tipos e interfaces do jogo Snake
 */

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface GameConfig {
  CANVAS: {
    WIDTH: number;
    HEIGHT: number;
    BACKGROUND_COLOR: string;
  };
  GAME: {
    INITIAL_SPEED: number;
    TILE_COUNT: number;
    INITIAL_TAIL_LENGTH: number;
  };
  COLORS: {
    SNAKE: string;
    SNAKE_HEAD: string;
    SNAKE_TAIL: string;
    APPLE: string;
    APPLE_GLOW: string;
    GRID: string;
    BACKGROUND: string;
    SCORE: string;
  };
  FONTS: {
    SCORE: string;
    GAME_OVER: string;
    SUBTITLE: string;
    HUD: string;
  };
  MESSAGES: {
    GAME_OVER: string;
    SCORE_PREFIX: string;
    HIGH_SCORE_PREFIX: string;
    TIME_PREFIX: string;
    PAUSED: string;
    START: string;
    NEW_RECORD: string;
  };
  START_POSITION: {
    HEAD_X: number;
    HEAD_Y: number;
    APPLE_X: number;
    APPLE_Y: number;
  };
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'NONE';

export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface DifficultySettings {
  name: string;
  initialSpeed: number;
  speedIncrement: number;
  maxSpeed: number;
}

export interface SnakePartData {
  x: number;
  y: number;
}

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
}

export interface AppleConfig {
  x: number;
  y: number;
}