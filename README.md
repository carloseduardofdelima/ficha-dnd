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
- **Compêndio de Itens Mágicos & Equipamentos**: Catálogo interativo de itens mágicos, armas, armaduras e equipamentos com filtros avançados por raridade, tipo, requerimento de sintonização (attunement) e busca textual.
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

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React 19)
- **Estilização**: Tailwind CSS v4 & Vanilla CSS (Variaveis dinâmicas para temas)
- **Banco de Dados**: PostgreSQL (via Supabase)
- **ORM**: Prisma Client
- **Autenticação**: NextAuth.js v5 (Suporte a credenciais locais e login via Google)
- **Renderização de PDF**: `@react-pdf/renderer` para geração da ficha padrão de D&D 5e
- **Processamento de Mídia**: Compressão com canvas local + salvamento em banco

---

## 📁 Estrutura do Projeto

Abaixo está o mapeamento dos principais diretórios da aplicação:

```
├── prisma/                 # Schema do banco de dados (schema.prisma) e migrações
├── public/                 # Assets estáticos (imagens, ícones e mockups)
├── scripts/                # Scripts utilitários de seeding e auditoria de regras
└── src/
    ├── app/                # Rotas da aplicação (App Router do Next.js)
    │   ├── ameacas/        # Compêndio do Bestiário de Monstros
    │   ├── campanhas/      # Painel de Campanhas, NPCs e Tracker de Iniciativa
    │   ├── deuses/         # Compêndio do Panteão Grego (Odisseia)
    │   ├── itens/          # Compêndio de Itens Mágicos e Equipamentos
    │   ├── magias/         # Grimório completo e filtros de magias
    │   ├── personagens/    # Fichas de personagens, assistente e level-up
    │   └── subclasses/     # Listagem e enciclopédia de subclasses
    ├── components/         # Componentes React compartilhados e etapas do wizard
    ├── lib/                # Bancos de dados de regras, itens (JSONs) e utilitários
    └── types/              # Definições de tipos TypeScript do domínio do D&D
```

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

3. **Configure o banco de dados e autenticação**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   # URLs de Conexão com Banco de Dados (Supabase/PostgreSQL)
   DATABASE_URL="sua_url_pooler_do_postgres"
   DIRECT_URL="sua_url_direta_do_postgres"

   # Configurações do NextAuth.js
   NEXTAUTH_SECRET="seu_secret_para_criptografia" # Pode ser gerado com: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"

   # Provedores de Autenticação OAuth (Google Cloud Console)
   GOOGLE_CLIENT_ID="seu_id_do_google"
   GOOGLE_CLIENT_SECRET="seu_secret_do_google"
   ```

4. **Sincronize o Banco de Dados**:
   Gere o Prisma Client e empurre o schema para o banco:
   ```bash
   npx prisma db push
   ```

5. **Semeadura de Dados (Opcional)**:
   Povoa o banco com massa de teste para personagens, monstros e campanhas:
   ```bash
   # Criar personagens prontos da edição 2014 para cada classe
   npx tsx scripts/seed-complete-2014.ts

   # Adicionar outros personagens de teste
   npx tsx scripts/seed-characters.ts

   # Criar campanhas, sessões e notas de teste
   npx tsx scripts/seed-campaign.ts

   # Povoar o Bestiário com monstros clássicos do SRD
   npx tsx scripts/add-classic-monster.ts
   ```

6. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

---

## ⚖️ Licença

Este projeto utiliza o conteúdo do **System Reference Document 5.1/5.2** da Wizards of the Coast, sob a licença Creative Commons Attribution 4.0 International.
