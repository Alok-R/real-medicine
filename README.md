# Super Coin Box

A simple game built with Phaser for Blueprint 2025's game development track.

## Getting Started

1. Install Node.js version 18+
2. Clone the repository
3. `npm install`
4. `npm start`

## Static Assets

This project uses `parcel-reporter-static-files-copy` via `.parcelrc`.

- Source static files live in `static/assets`.
- At build/serve time they are copied to `dist/assets`.
- Runtime paths in code should use `assets/...` (for example, `assets/player2.png`), not `static/assets/...`.
- If `staticOutPath` changes, runtime URL paths change accordingly.

## Demo

The game can be played here: https://supercoinbox.tcw.sh/

I also made an older version of this game with Phaser 2.4.6 many years ago with additional features and game levels. That can be played here: https://thecodingwizard.github.io/super-coin-box/. The source code can be found here: https://github.com/thecodingwizard/super-coin-box/tree/gh-pages.
