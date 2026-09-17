# INFO Startups

Aplicacao React/Vite que apresenta as startups dos alunos de Informatica da FECAP. O catalogo, os textos PT/EN, os membros e os links estao em `src/data/startups.js`. Logos e fotos ficam em `src/assets/` e entram na build do Vite.

## Desenvolvimento

Requer Node.js 20 ou superior.

```powershell
npm install
npm run dev
```

Nenhuma variavel de ambiente ou banco de dados e necessaria. Para alterar o conteudo, edite `src/data/startups.js` e adicione imagens a `src/assets/` quando preciso. Cada alteracao de conteudo exige uma nova build e publicacao.

## Verificacao

```powershell
node scripts/verify-preferences.mjs
node scripts/verify-headline.mjs
node scripts/verify-hero-3d.mjs
npm run build
npm run preview
```

## Publicacao no Vercel

Conecte o repositorio Git ao projeto Vercel e use o preset **Vite**, o comando de build `npm run build` e o diretorio de saida `dist`. Nao cadastre `VITE_SUPABASE_URL` nem `VITE_SUPABASE_PUBLISHABLE_KEY`: a build usa diretamente o catalogo local.

As mudancas em `src/data/startups.js` e `src/assets/` precisam ser commitadas e enviadas ao repositorio para aparecerem no deploy. Os arquivos em `supabase/` e os scripts de seed permanecem apenas como referencia para uma eventual retomada; nao participam da aplicacao ou da build atual.
