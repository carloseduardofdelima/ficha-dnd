# ⚔️ A Forja - Ficha de Personagem D&D 5e

**A Forja** é uma aplicação web moderna e interativa projetada para jogadores de Dungeons & Dragons 5ª Edição. Ela oferece uma ficha de personagem digital responsiva, esteticamente agradável e otimizada para uso em dispositivos móveis durante as sessões de RPG.

---

## 🚀 Funcionalidades Principais

-   **📱 Design Mobile-First**: Interface totalmente otimizada para smartphones, com navegação intuitiva e elementos de fácil interação.
-   **🎲 Cálculos Automáticos**: O sistema calcula automaticamente bônus de atributos, proficiências, Classe de Armadura (CA) com base nos itens equipados e bônus de ataque.
-   **⚡ Gerenciamento em Tempo Real**: Altere seus Pontos de Vida, use espaços de magia e gaste recursos de classe (como Fúrias ou Pontos de Foco) instantaneamente.
-   **🛡️ Sistema de Combate Dinâmico**: Visualização clara de ataques, danos e alcances em cartões interativos.
-   **📦 Inventário Inteligente**: Lista de itens com filtragem por categoria (Armas, Armaduras, Itens Gerais) e integração direta com os cálculos da ficha.

---

## 📂 Seções da Ficha

### 1. Atributos e Combate Principal
Localizada na aba principal, exibe os atributos (FOR, DES, CON, INT, SAB, CAR) e seus respectivos modificadores e testes de resistência. No topo, destaca-se a **Classe de Armadura (CA)** e o **Deslocamento**, reordenados dinamicamente para priorizar a visibilidade no celular.

### 2. Vida e Recursos
Gerencie seus **Pontos de Vida** com controles rápidos de +/- e monitore seus **Espaços de Magia** e **Recursos de Classe**. A seção inclui um botão de "Descanso Longo" para restaurar todos os valores rapidamente.

### 3. Ataques e Magias
Uma aba dedicada que transforma a tradicional tabela de ataques em uma lista de cartões elegantes. Cada ataque exibe bônus de acerto e dados de dano de forma proeminente, facilitando a rolagem rápida durante o combate.

### 4. Inventário
Exibe todos os itens carregados pelo personagem. O sistema identifica automaticamente armas e armaduras, permitindo que você veja os detalhes de cada item e entenda como eles afetam suas estatísticas.

---

## 🛠️ Tecnologias Utilizadas

-   **Framework**: [Next.js 15+](https://nextjs.org/) (com a nova engine Turbopack)
-   **Linguagem**: TypeScript
-   **Frontend**: React 19 e Tailwind CSS
-   **Ícones**: Lucide React
-   **Banco de Dados**: Prisma ORM (conectado ao Supabase/PostgreSQL)
-   **Autenticação**: NextAuth.js para login seguro via Google

---

## 🏃 Como Rodar o Projeto

1.  **Clone o repositório**:
    ```bash
    git clone [url-do-repositorio]
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz com suas credenciais do Banco de Dados e NextAuth.

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
