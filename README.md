# ⚔️ A Forja - Ficha de Personagem D&D 5e

**A Forja** é uma aplicação web premium projetada para jogadores de Dungeons & Dragons 5ª Edição. Ela oferece uma ficha de personagem digital responsiva, esteticamente impecável e otimizada para uso em dispositivos móveis durante as sessões de RPG.

![Demonstração da Interface Principal](file:///C:/Users/carlo/.gemini/antigravity/brain/7d5011e6-11ad-498c-be34-f97ac6d05900/main_navigation_v2_1776556743132.webp)

---

## ✨ O que há de novo?

Implementamos recentemente uma série de funcionalidades avançadas para tornar a gestão do seu personagem ainda mais fluida:

### 🎒 Inventário Inteligente com Peso em Tempo Real
Gerencie sua carga sem esforço. O sistema calcula automaticamente o peso total de todos os seus itens, alertando sobre capacidades e permitindo a adição de itens diretamente de um catálogo completo.

![Demonstração do Inventário](file:///C:/Users/carlo/.gemini/antigravity/brain/7d5011e6-11ad-498c-be34-f97ac6d05900/inventory_demo_1776556898186.webp)

### 🔮 Sistema de Magias Visual
Adeus à lista de texto puro. Agora cada magia possui seu próprio ícone artístico associado, facilitando a identificação visual rápida durante o combate.
- **Ícones Temáticos**: Mais de 100 ícones únicos associados às magias do SRD.
- **Detalhes em um Clique**: Veja o alcance, tempo de conjuração e efeito completo sem sair da ficha.

### 📜 Documentação de Habilidades (D&D 2024)
Integrado com as novas regras de 2024, a ficha agora possui um banco de dados de habilidades de classe.
- **Clique para Detalhar**: Não lembra o que "Surto de Ação" faz? Basta clicar na habilidade para abrir um modal com a descrição oficial completa.
- **Evolução Dinâmica**: A ficha se adapta conforme você sobe de nível, revelando novas habilidades automaticamente.

### ✍️ Bloco de Notas Persistente
Uma aba dedicada para suas anotações de campanha. Todas as notas são salvas automaticamente no banco de dados, garantindo que você nunca perca aquele detalhe crucial da história.

---

## 🚀 Funcionalidades Principais

-   **📱 Design Mobile-First**: Interface totalmente otimizada para smartphones, com navegação fluida via Glassmorphism.
-   **🎲 Cálculos Automáticos**: O sistema gerencia bônus de atributos, proficiências, Classe de Armadura (CA) e bônus de ataque.
-   **⚡ Gerenciamento em Tempo Real**: Altere Pontos de Vida, gaste espaços de magia e recursos de classe instantaneamente.
-   **🛡️ Combate Dinâmico**: Visualização de ataques e magias em cartões interativos de alto contraste.

---

## 🛠️ Tecnologias Utilizadas

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router + Turbopack)
-   **Linguagem**: TypeScript
-   **Frontend**: React 19, Tailwind CSS e Vanilla CSS para design premium.
-   **Ícones**: Lucide React & Custom Spell Icon Library.
-   **Banco de Dados**: Prisma ORM (Supabase/PostgreSQL).
-   **Autenticação**: NextAuth.js (Google Auth).

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

3.  **Configuração**:
    Adicione as URLs do seu banco de dados e segredos do NextAuth no arquivo `.env`.

4.  **Desenvolvimento**:
    ```bash
    npm run dev
    ```
