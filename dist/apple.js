/**
 * Classe que representa a maçã no jogo
 */
import { CONFIG } from './constants.js';
export class Apple {
    constructor(tileCount) {
        this.tileCount = tileCount;
        // Primeira maçã em posição aleatória
        this.x = Math.floor(Math.random() * this.tileCount);
        this.y = Math.floor(Math.random() * this.tileCount);
        this.tileSize = this.calculateTileSize();
    }
    calculateTileSize() {
        return CONFIG.CANVAS.WIDTH / this.tileCount - 2;
    }
    /**
     * Respawna a maçã em uma posição aleatória
     */
    respawn() {
        this.x = Math.floor(Math.random() * this.tileCount);
        this.y = Math.floor(Math.random() * this.tileCount);
    }
    /**
     * Verifica se a posição da maçã colide com alguma parte da cobra
     * @param snakeParts - Partes da cobra
     * @returns boolean
     */
    collidesWithSnake(snakeParts) {
        return snakeParts.some(part => part.x === this.x && part.y === this.y);
    }
    /**
     * Respawna a maçã garantindo que não nasça em cima da cobra
     * @param snakeParts - Partes da cobra
     */
    respawnSafe(snakeParts) {
        do {
            this.respawn();
        } while (this.collidesWithSnake(snakeParts));
    }
    /**
     * Renderiza a maçã no canvas com efeito glow pulsante
     * @param ctx - Contexto do canvas
     */
    render(ctx, time = 0) {
        const padding = 2;
        const size = this.tileSize - padding * 2;
        const x = this.x * (CONFIG.CANVAS.WIDTH / this.tileCount) + padding;
        const y = this.y * (CONFIG.CANVAS.WIDTH / this.tileCount) + padding;
        // Efeito pulsante
        const pulse = Math.sin(time / 200) * 0.3 + 0.7;
        const glowSize = 15 * pulse;
        // Glow externo
        ctx.shadowColor = CONFIG.COLORS.APPLE_GLOW;
        ctx.shadowBlur = glowSize;
        // Corpo da maçã com gradiente
        const gradient = ctx.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2);
        gradient.addColorStop(0, '#ff4d94');
        gradient.addColorStop(1, CONFIG.COLORS.APPLE);
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, size, size);
        // Reset shadow
        ctx.shadowBlur = 0;
        // Brilho central
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x + 2, y + 2, size / 3, size / 3);
    }
    /**
     * Reseta a maçã para posição aleatória
     */
    reset() {
        this.respawn();
    }
}
//# sourceMappingURL=apple.js.map