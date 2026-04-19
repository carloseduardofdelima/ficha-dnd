# A Forja - Ficha de Personagem D&D 5e

A Forja é uma aplicação web avançada desenvolvida para jogadores de Dungeons & Dragons 5ª Edição. A plataforma oferece uma ficha de personagem digital responsiva, com design otimizado e alta performance, ideal para uso em dispositivos móveis durante sessões de RPG.

![Demonstração da Interface Principal](./public/assets/readme/main_navigation.webp)

---

## Atualizações Recentes

O sistema foi atualizado com funcionalidades avançadas para otimizar a gestão de personagens:

### Inventário com Cálculo de Carga Automático
Gestão de inventário simplificada com cálculo automático de peso total. O sistema monitora a capacidade de carga do personagem e permite a inclusão de itens através de um catálogo integrado.

### Interface Visual para Magias
Substituição de listagens textuais por uma interface visual intuitiva. Cada magia conta com identificação visual específica para agilizar a tomada de decisão durante o combate.
- **Identificação Visual**: Biblioteca de ícones associada às magias do System Reference Document (SRD).
- **Acesso Rápido**: Detalhes como alcance, tempo de conjuração e efeitos disponíveis de forma imediata.

### Registro de Habilidades (D&D 2024)
Integração com as regras de 2024, incluindo um banco de dados completo de habilidades de classe.
- **Consultas Integradas**: Descrições oficiais acessíveis via modais, eliminando a necessidade de consultas externas.
- **Progressão Dinâmica**: Atualização automática da ficha de acordo com o nível do personagem, desbloqueando novas competências.

### Bloco de Notas Persistente
Módulo dedicado para anotações de campanha com persistência de dados, garantindo que informações cruciais sejam mantidas com segurança.

---

## Funcionalidades Principais

- **Design Responsivo**: Interface mobile-first desenvolvida com estética moderna e navegação fluida.
- **Cálculos Automatizados**: Processamento automático de modificadores de atributos, proficiências, Classe de Armadura (CA) e bônus de ataque.
- **Gestão em Tempo Real**: Atualização instantânea de Pontos de Vida, espaços de magia e recursos de classe.
- **Módulo de Combate**: Visualização otimizada de ataques e magias em cartões de alta legibilidade.

---

## Tecnologias Utilizadas

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router + Turbopack)
- **Linguagem**: TypeScript
- **Frontend**: React 19, Tailwind CSS e Vanilla CSS.
- **Ícones**: Lucide React & Biblioteca customizada de ícones de magias.
- **Persistência**: Prisma ORM (PostgreSQL via Supabase).
- **Autenticação**: NextAuth.js (Integração com Google Auth).

---

## Instruções de Instalação

1.  **Clonagem do Repositório**:
    ```bash
    git clone [url-do-repositorio]
    ```

2.  **Instalação de Dependências**:
    ```bash
    npm install
    ```

3.  **Configuração do Ambiente**:
    Configure as variáveis de ambiente necessárias para o banco de dados e autenticação no arquivo `.env`.

4.  **Execução em Desenvolvimento**:
    ```bash
    npm run dev
    ```
