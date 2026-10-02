## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Codebase context (graphify)

A knowledge graph of this repo lives in `graphify-out/` (gitignored). Use it by default, without being asked, to save tokens:

- Before exploring code to understand structure, dependencies or where something lives, run `graphify query "<question>" --budget 1500` and read only the files it points to. Use `graphify explain "<Symbol>"` for one node and `graphify path "A" "B"` for how two parts connect.
- For a whole-repo overview, read `graphify-out/GRAPH_REPORT.md` instead of listing and opening files.
- Fall back to normal search when the graph has no answer (styles, copy, markup details).
- The graph refreshes itself: local hooks in `.claude/settings.local.json` run `graphify update .` at session start and after every Edit/Write. No manual update is needed. Docs and images (`data.md`, `docs/`) only refresh with `/graphify --update`.
