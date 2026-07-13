# CodexBar-CN

非官方 Win-CodexBar 修改版，只保留 Codex 用量监测，并默认使用简体中文界面。

This is an unofficial modified build of Win-CodexBar. It keeps only Codex usage monitoring and defaults the UI to Simplified Chinese.

## What Changed

- Codex-only provider catalog and settings snapshot.
- Default UI language is Simplified Chinese.
- Single-provider mode hides the original "All providers" tab.
- Common Codex usage labels such as Session and Weekly are localized.
- App name, Windows metadata, Tauri identifier, settings directory, and startup registry key are separated as `CodexBar-CN`.
- A portable Windows executable is included under `portable/`.

## Download / Run

Portable build:

```text
portable/CodexBar-CN.exe
```

If your network requires a local proxy, edit and run:

```text
portable/Start-CodexBar-CN-WithProxy.example.bat
```

The example script currently uses:

```text
127.0.0.1:10809
```

Change the port or run `CodexBar-CN.exe` directly if you do not use that proxy.

## Privacy

This repository does not include any user credentials.

Do not publish files from these local directories:

```text
%APPDATA%\CodexBar
%APPDATA%\CodexBar-CN
```

Do not publish cookies, tokens, `settings.json`, logs, session files, or local build caches.

## Build From Source

Requirements on Windows:

- Rust/Cargo
- MSVC Build Tools
- Node.js + pnpm

Build desktop app:

```powershell
cd apps/desktop-tauri
pnpm install --frozen-lockfile
pnpm run tauri:build
```

The Tauri build command uses `tauri build --no-bundle`.

## Verification Used For This Build

The local build was checked with:

```text
pnpm exec vitest run src/components/ProviderGrid.test.tsx src/components/MenuCard.test.tsx
cargo test --manifest-path Cargo.toml codex_cn_
cargo test --manifest-path rust/Cargo.toml settings::tests::
pnpm run tauri:build
```

Portable exe SHA256:

```text
A9667317C13BA7A9E579938DB0F0401AFA42993FB1472745EDCDDB06A3348D4B
```

## Upstream

Based on:

- Win-CodexBar: https://github.com/Finesssee/Win-CodexBar
- CodexBar: https://github.com/steipete/CodexBar

## License

MIT License, same as the upstream project. See [LICENSE](./LICENSE).
