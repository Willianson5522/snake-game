/**
 * Gerenciador de pontuação máxima (High Score) usando localStorage
 */
export class HighScoreManager {
    constructor(storageKey = 'snake_highscore') {
        this.storageKey = storageKey;
        this.currentHighScore = this.load();
    }
    /**
     * Carrega o high score do localStorage
     * @returns number
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? parseInt(stored, 10) : 0;
        }
        catch (e) {
            console.warn('localStorage não disponível');
            return 0;
        }
    }
    /**
     * Salva o high score no localStorage
     * @param score
     */
    save(score) {
        try {
            localStorage.setItem(this.storageKey, score.toString());
        }
        catch (e) {
            console.warn('Não foi possível salvar no localStorage');
        }
    }
    /**
     * Verifica e atualiza o high score se necessário
     * @param currentScore
     * @returns true se houve novo recorde
     */
    checkAndUpdate(currentScore) {
        if (currentScore > this.currentHighScore) {
            this.currentHighScore = currentScore;
            this.save(currentScore);
            return true;
        }
        return false;
    }
    /**
     * Obtém o high score atual
     * @returns number
     */
    get() {
        return this.currentHighScore;
    }
    /**
     * Reseta o high score (para testes)
     */
    reset() {
        this.currentHighScore = 0;
        try {
            localStorage.removeItem(this.storageKey);
        }
        catch (e) {
            console.warn('Não foi possível resetar localStorage');
        }
    }
}
//# sourceMappingURL=highscore.js.map