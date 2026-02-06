/**
 * Classe que representa uma parte do corpo da cobra
 */
import { SnakePartData } from './types';

export class SnakePart implements SnakePartData {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Classe que representa a cobra
 */
import { CONFIG, DIRECTIONS } from './constants';
import { Direction, Velocity } from './types';

export class Snake {
  tileCount: number;
  tileSize: number;
  headX!: number;
  headY!: number;
  velocity!: Velocity;
  parts!: SnakePart[];
  tailLength!: number;

  constructor(tileCount: number) {
    this.tileCount = tileCount;
    this.tileSize = this.calculateTileSize();
    this.reset();
  }
  
  calculateTileSize(): number {
    return CONFIG.CANVAS.WIDTH / this.tileCount - 2;
  }
  
  /**
   * Reseta a cobra para o estado inicial
   */
  reset(): void {
    this.headX = CONFIG.START_POSITION.HEAD_X;
    this.headY = CONFIG.START_POSITION.HEAD_Y;
    this.velocity = { ...DIRECTIONS.NONE };
    this.parts = [];
    this.tailLength = CONFIG.GAME.INITIAL_TAIL_LENGTH;
  }
  
  /**
   * Altera a direção da cobra
   * @param direction - Direção (UP, DOWN, LEFT, RIGHT)
   * @returns true se a direção foi alterada
   */
  changeDirection(direction: Direction): boolean {
    const newVelocity = DIRECTIONS[direction];
    
    // Previne movimento na direção oposta
    if (this.velocity.x === -newVelocity.x && this.velocity.y === -newVelocity.y) {
      return false;
    }
    
    // Previne mudar direção se já estiver se movendo na mesma direção
    if (this.velocity.x === newVelocity.x && this.velocity.y === newVelocity.y) {
      return false;
    }
    
    this.velocity = { ...newVelocity };
    return true;
  }
  
  /**
   * Move a cobra
   */
  move(): void {
    this.headX += this.velocity.x;
    this.headY += this.velocity.y;
  }
  
  /**
   * Faz a cobra crescer aumentando o tailLength
   */
  grow(): void {
    this.tailLength++;
  }
  
  /**
   * Atualiza as partes do corpo da cobra
   */
  updateParts(): void {
    // Adiciona a nova posição da cabeça
    this.parts.push(new SnakePart(this.headX, this.headY));
    
    // Remove a cauda se exceder o tamanho mínimo (1 = cabeça)
    // tailLength = 1 significa só a cabeça visível
    if (this.parts.length > Math.max(1, this.tailLength)) {
      this.parts.shift();
    }
  }
  
  /**
   * Verifica colisão com as paredes
   * @returns boolean
   */
  checkWallCollision(): boolean {
    return (
      this.headX < 0 ||
      this.headX >= this.tileCount ||
      this.headY < 0 ||
      this.headY >= this.tileCount
    );
  }
  
  /**
   * Verifica colisão com o próprio corpo
   * @returns boolean
   */
  checkSelfCollision(): boolean {
    return this.parts.some(part => 
      part.x === this.headX && part.y === this.headY
    );
  }
  
  /**
   * Verifica colisão com a maçã
   * @param apple - Objeto maçã
   * @returns boolean
   */
  checkAppleCollision(apple: { x: number; y: number }): boolean {
    return this.headX === apple.x && this.headY === apple.y;
  }
  
  /**
   * Verifica se a cobra começou a se mover
   * @returns boolean
   */
  hasStarted(): boolean {
    return this.velocity.x !== 0 || this.velocity.y !== 0;
  }
  
  /**
   * Renderiza a cobra no canvas
   * @param ctx - Contexto do canvas
   */
  render(ctx: CanvasRenderingContext2D): void {
    const tilePixelSize = CONFIG.CANVAS.WIDTH / this.tileCount;
    const padding = 1;
    const size = tilePixelSize - padding * 2;

    // Renderiza o corpo com gradiente
    for (let i = 0; i < this.parts.length; i++) {
      const part = this.parts[i];
      const alpha = 0.4 + (i / this.parts.length) * 0.6;
      const color = this.hexToRgba(CONFIG.COLORS.SNAKE, alpha);

      ctx.fillStyle = color;
      ctx.shadowColor = CONFIG.COLORS.SNAKE;
      ctx.shadowBlur = 10;
      ctx.fillRect(
        part.x * tilePixelSize + padding,
        part.y * tilePixelSize + padding,
        size,
        size
      );
    }

    // Renderiza a cabeça com glow mais forte
    ctx.fillStyle = CONFIG.COLORS.SNAKE_HEAD;
    ctx.shadowColor = CONFIG.COLORS.SNAKE_HEAD;
    ctx.shadowBlur = 20;
    ctx.fillRect(
      this.headX * tilePixelSize + padding,
      this.headY * tilePixelSize + padding,
      size,
      size
    );

    // Reset shadow
    ctx.shadowBlur = 0;
  }

  /**
   * Converte cor hex para rgba
   */
  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  /**
   * Obtém todas as partes da cobra incluindo a cabeça
   * @returns Array
   */
  getAllParts(): SnakePart[] {
    return [...this.parts, new SnakePart(this.headX, this.headY)];
  }
}
