# Changelog - Snake Game Moderno

## [1.0.0] - 2026-02-05

### Features
- Migrado de JavaScript para TypeScript
- Arquitetura modular (classes separadas)
- Sistema de dificuldade (Fácil, Médio, Difícil)
- High Score com localStorage
- Timer de jogo
- Menu inicial com seletor de dificuldade
- Tela de Game Over aprimorada
- Sistema de Pause (tecla P)
- Responsividade mobile
- Design glassmorphism + neon
- Controles touch (D-Pad)
- Acessibilidade (ARIA labels)

### Fixes
- Corrigido bug de crescimento inconsistente da cobra
- Corrigido problema de game over ao comer primeira maçã
- Corrigido cursor de texto se movendo com setas
- Corrigido tamanho do canvas e renderização
- Corrigido posicionamento de cobra e maçã

### Refactor
- Código reestruturado em módulos TypeScript
- Tipagem completa com interfaces
- Design system com variáveis CSS
- Estilo visual moderno (glassmorphism + neon)

### Assets
- bg_snake.jpg integrado como background
- Setas originais (up, down, left, right) nos botões

### Build
- Configuração TypeScript (tsconfig.json)
- Build automatizado com `npx tsc`
