# Startup Assets

Upload the current files to the public `startup-assets` bucket using these object keys before applying `supabase/seed.sql`.

| Local source | Storage object key |
| --- | --- |
| `src/assets/appono-logo.png` | `appono/logo.png` |
| `src/assets/appono-equipe.jpg` | `appono/team.jpg` |
| `src/assets/appono-equipe-2.jpg` | `appono/members/guilherme-yuji.jpg` |
| `src/assets/appono-equipe-3.jpg` | `appono/members/davi-janusz.jpg` |
| `src/assets/appono-equipe-4.jpg` | `appono/members/joao-victor.jpg` |
| `src/assets/selectio-logo.png` | `selectio/logo.png` |
| `src/assets/selectio-equipe.png` | `selectio/team.png` |
| `src/assets/selectio-kalil.png` | `selectio/members/kalil-barreto.png` |
| `src/assets/selectio-gustavo.png` | `selectio/members/gustavo-amorim.png` |
| `src/assets/selectio-marcos.png` | `selectio/members/marcos-peyerl.png` |
| `src/assets/bixuco-logo.png` | `bixuco/logo.png` |
| `src/assets/bixuco-equipe.png` | `bixuco/team.png` |
| `src/assets/bixuco-arthur.png` | `bixuco/members/arthur-regiani.png` |
| `src/assets/bixuco-sophia.png` | `bixuco/members/sophia-freitas.png` |
| `src/assets/bixuco-yasmin.png` | `bixuco/members/yasmin-bertoni.png` |
| `src/assets/facos-logo.svg` | `facos/logo.svg` |
| `src/assets/condomit-logo.png` | `condomit/logo.png` |
| `src/assets/recure-logo.png` | `recure/logo.png` |
| `src/assets/recure-equipe.jpg` | `recure/team.jpg` |
| `src/assets/recure-fernando.jpg` | `recure/members/fernando-bolonha.jpg` |
| `src/assets/recure-pedro.jpg` | `recure/members/pedro-de-macedo.jpg` |
| `src/assets/recure-rafael.jpg` | `recure/members/rafael-rodrigues.jpg` |
| `src/assets/recure-daniel.jpg` | `recure/members/daniel-martins.jpg` |

The seed stores these object keys in the `*_url` columns. The application resolves them to public URLs through the configured Supabase project URL.
