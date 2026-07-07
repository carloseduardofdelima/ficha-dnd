# 🛡️ A Forja - Ficha de Personagem D&D 5e

**A Forja** é uma plataforma web premium para jogadores e mestres de Dungeons & Dragons 5ª Edição. Desenvolvida com as tecnologias mais modernas do ecossistema React, oferece uma experiência de ficha digital fluida, visualmente deslumbrante e otimizada para todas as telas.

![Demonstração da Interface Principal](./public/assets/readme/main_navigation.webp)
![Mockup do App Web e Mobile](./public/assets/readme/mockup_app.jpeg)

---

## ✨ Funcionalidades Atuais

### 📊 Gestão de Personagem (Ficha Digital)
- **Cálculos Automáticos**: Proficiências, modificadores de atributos, Classe de Armadura (CA) adaptativa, iniciativa, pontos de vida e espaços de magia por nível calculados em tempo real.
- **Suporte Regras 2014 & 2024 (One D&D)**: Suporte híbrido completo para ambos os conjuntos de regras, permitindo escolher o ruleset no momento da criação ou do level up.
- **Gerador / Rolador Aleatório**: Criação de personagens rápida com animação de dados (d20) virtuais para selecionar classe, espécie, atributos (com rolagem simulada), magias e perícias.
- **Rastreadores de Recursos**: Gerenciador dinâmico de recursos de classe como Fúria, Canalizar Divindade, Pontos de Chi, entre outros.
- **Inventário Inteligente**: Catálogo de itens SRD (2014 e 2024) com cálculo automático de peso e capacidade de carga.
- **Grimório Pessoal**: Biblioteca de magias preparada e gerenciada por nível, com ícones personalizados por escola e filtros específicos (ex: Eldritch Knight).
- **Gerenciador de Companheiros**: Seção para adicionar e controlar pets, invocações e companheiros/ajudantes com estatísticas dedicadas.
- **Assistente de Level Up**: Sistema interativo passo a passo para subida de nível, permitindo escolha de talentos (Feats), subclasses e rolagem (ou média) de pontos de vida.
- **Exportação PDF**: Geração de ficha de personagem no layout oficial D&D 5e via `@react-pdf/renderer` para impressão ou compartilhamento.
- **Avatar Customizado**: Upload local de imagens para avatar do personagem com compressão automática.

### 🏰 Painel do Mestre & Campanhas
- **Dashboard de Campanhas**: Criação, gerenciamento e exclusão de campanhas (longas ou One-shots).
- **Sessões e Notas**: Registro detalhado das sessões de jogo com anotações fixáveis e privadas/públicas.
- **Gerenciador de NPCs**: Cadastro e controle de NPCs vinculados à campanha.
- **Combat Tracker (Iniciativa & Combate)**: Rastreamento em tempo real de turnos, rodadas, ordem de iniciativa e pontos de vida de jogadores e monstros.
- **Gestor de Condições**: Aplicação e visualização rápida de condições (Amedrontado, Envenenado, Caído, Inconsciente, etc.) nos participantes do combate.
- **Escudo do Mestre (DM Screen)**: Painel de consulta rápida com regras essenciais e utilitários para mestragem em tempo real.

### 📜 Compêndios & Utilitários
- **Bestiário (Ameaças)**: Consulta a monstros do SRD com blocos de estatísticas completos, ações, habilidades e atributos detalhados.
- **Enciclopédia de Subclasses**: Lista detalhada de subclasses das regras de 2014 e 2024 com ilustrações personalizadas e progressão de habilidades.
- **Compêndio de Magias**: Filtros avançados de magias por classe, escola, nível, tempo de conjuração e componentes.
- **Panteão Olímpico (Deuses)**: Consulta a divindades inspiradas na Odisseia Grega, contendo símbolos, tendências, domínios e descrições detalhadas.

### 🔐 Segurança, Sincronização & Estilo
- **Autenticação Segura**: Login via Google e e-mail/senha através do NextAuth.js.
- **Persistência em Nuvem**: Banco de dados PostgreSQL (via Supabase) integrado ao ORM Prisma com salvamento automático e indicador de status de sincronização.
- **Temas Dinâmicos**: Seletor integrado com 6 paletas de cores premium para customizar toda a interface do aplicativo:
  - 🔴 **Carmesim** (Default)
  - 🟣 **Roxo**
  - 🔵 **Azul**
  - 🟢 **Verde**
  - ⚫ **Escuro**
  - ⚪ **Claro**

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router + React 19)
- **Estilização**: Tailwind CSS 4 & Vanilla CSS
- **Banco de Dados**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Autenticação**: NextAuth.js
- **PDF**: React-PDF Renderer
- **Upload de Imagens**: Compressão com canvas local + salvamento em banco

---

## ⚙️ Como Instalar e Rodar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/ficha-dnd.git
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL="sua_url_do_postgres"
   DIRECT_URL="sua_url_direta_do_postgres"
   NEXTAUTH_SECRET="seu_secret_aqui"
   GOOGLE_CLIENT_ID="seu_id_do_google"
   GOOGLE_CLIENT_SECRET="seu_secret_do_google"
   ```

4. **Sincronize o Banco**:
   ```bash
   npx prisma db push
   ```

5. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

---

## ⚖️ Licença

Este projeto utiliza o conteúdo do **System Reference Document 5.1/5.2** da Wizards of the Coast, sob a licença Creative Commons Attribution 4.0 International.
