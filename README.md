# INFO Startups

Aplicacao React/Vite que apresenta as startups desenvolvidas pelos alunos de Informatica da FECAP. A homepage organiza o acervo por turma e cada startup possui uma pagina exclusiva, com conteudo em portugues e ingles, tema claro/escuro, identidade visual propria e recursos de acessibilidade.

O catalogo de startups e servido pelo Supabase em producao. Os textos genericos da interface continuam locais em `src/data/translations.js`, porque fazem parte do proprio produto e nao do conteudo editorial das startups.

## Tecnologias

- React 19 e Vite
- Supabase Postgres, Storage e Row Level Security (RLS)
- Three.js para a experiencia visual da homepage
- Lucide React para icones

## Inicio rapido

Requer Node.js 20 ou superior.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Preencha `.env.local` com as credenciais publicas do projeto Supabase:

```dotenv
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publicavel
```

Somente essas duas variaveis podem ser usadas pelo frontend. Nunca adicione `SUPABASE_SECRET_KEY`, `service_role` ou outra chave administrativa em arquivos `VITE_*`.

Enquanto as variaveis nao existirem, o modo de desenvolvimento usa `src/data/startups.js` como fallback para manter a interface utilizavel. Uma build de producao nao faz esse fallback: ela apresenta o estado de erro/configuracao caso o Supabase nao esteja disponivel.

## Configuracao do Supabase

1. Crie um projeto no Supabase e copie a URL e a chave publicavel para `.env.local`.
2. No SQL Editor do projeto, execute [a migration](supabase/migrations/202609140001_create_startups.sql). Ela cria as tabelas, indices, gatilho de `updated_at`, bucket publico `startup-assets` e politicas de RLS.
3. No Storage, envie os arquivos listados no [manifesto de assets](supabase/storage-manifest.md), preservando exatamente os caminhos indicados.
4. Gere o seed a partir da fonte local e execute [supabase/seed.sql](supabase/seed.sql) no SQL Editor:

```powershell
npm run seed:supabase
```

O seed e idempotente para as startups: ele atualiza cada `slug` e substitui os membros daquela startup. Ele preserva os dados atuais de Appono, Selectio, Bixuco, Facos e Condomit, incluindo os textos PT/EN, membros, links, ordem e acentos visuais.

### Modelo de dados

`public.startups` concentra o conteudo de cada projeto e seus campos bilingues em `jsonb`: `tags`, `description`, `tagline`, `segment`, `headline`, `paragraphs` e `features`. A ordenacao e controlada por `cohort_year` e `sort_order`.

`public.startup_members` pertence a uma startup e guarda nome, cargo bilingue, canais de contato, imagem e ordem de exibicao. A delecao de uma startup remove seus membros em cascata.

Os campos `logo_url`, `team_image_url` e `image_url` armazenam caminhos de objetos do bucket, como `selectio/logo.png`. No cliente, `src/services/startups.js` os converte em URLs publicas do bucket `startup-assets`.

### Seguranca

As tabelas possuem RLS habilitado. Para `anon` e `authenticated`, o banco concede apenas `SELECT`:

- Startups somente quando `is_published = true`.
- Membros somente quando a startup vinculada esta publicada.
- Nenhum `INSERT`, `UPDATE` ou `DELETE` e concedido a visitantes.

O gerenciamento inicial do conteudo deve ser feito pelo Dashboard do Supabase, que opera com privilegios administrativos fora do navegador.

## Arquitetura do catalogo

```text
App.jsx
  -> services/startups.js
    -> lib/supabase.js
      -> public.startups + public.startup_members
      -> Storage / startup-assets
```

O servico consulta apenas startups publicadas, recebe os membros no mesmo request, normaliza a resposta e entrega o formato que a interface ja usa:

```js
{ startupsByYear, years }
```

Isso preserva a navegacao, a pagina de detalhes, os idiomas e os temas sem acoplar os componentes ao formato do banco.

## Scripts

```powershell
npm run dev                # servidor de desenvolvimento
npm run build              # build de producao
npm run preview            # visualiza a build local
npm run seed:supabase      # regenera supabase/seed.sql a partir dos dados locais
npm run verify:service     # valida a normalizacao sem acesso a rede
node scripts/verify-headline.mjs
node scripts/verify-preferences.mjs
```

## Estrutura relevante

```text
src/
  data/translations.js       textos genericos da interface
  data/startups.js           fallback de desenvolvimento e fonte transitoria do seed
  lib/supabase.js            cliente Supabase com chaves publicas do Vite
  services/startups.js       consulta e normalizacao do catalogo
  components/                homepage, detalhes e experiencia 3D
supabase/
  migrations/                schema, RLS e Storage
  seed.sql                   conteudo inicial do catalogo
  storage-manifest.md        arquivos e caminhos esperados no bucket
scripts/
  generate-supabase-seed.mjs gerador do seed
```

## Operacao de conteudo

Para publicar ou ocultar uma startup, altere `is_published` no Dashboard do Supabase. Para inserir uma nova, crie a startup, envie os assets ao bucket em uma pasta com o `slug` e depois cadastre seus membros em `startup_members`, sempre preenchendo `sort_order`.

Ao substituir uma imagem, mantenha o mesmo caminho de Storage para evitar alterar o registro, ou atualize o campo correspondente no banco. O bucket e publico porque a experiencia precisa carregar logos e fotos diretamente; nao armazene arquivos privados nele.

## Solucao de problemas

**A pagina exibe erro ao carregar startups em producao**: confirme `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, a execucao da migration e se ha startups com `is_published = true`.

**A imagem nao aparece**: confira se o objeto foi enviado ao bucket `startup-assets`, se o caminho coincide com o manifesto e se a politica publica de leitura do Storage foi criada.

**O conteudo parece desatualizado**: execute `npm run seed:supabase`, revise o SQL gerado e rode-o novamente no SQL Editor. Em seguida, recarregue a aplicacao.

**O cliente Supabase falha no navegador**: use a chave publicavel do projeto, nunca uma chave secreta. Reinicie `npm run dev` depois de modificar `.env.local`.
