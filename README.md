# Moving-Albums

A [Spicetify](https://spicetify.app) extension that adds a cursor-tracked 3D tilt effect to playlist/album/artist cards — hover a card and it tilts toward your mouse in perspective, with a soft glow, like a physical card catching the light.

## Features

- Pure CSS 3D transforms (`perspective` + `rotateX`/`rotateY`) — no WebGL, no Three.js, no dependencies
- Cursor position within the card drives the tilt angle
- Throttled to `requestAnimationFrame` so it doesn't spam style recalculations
- Tries several known Spotify card selectors, since Spotify's internal class names have changed across versions

## Requirements

- [Spicetify CLI](https://spicetify.app/docs/getting-started) installed and working
- Spotify desktop app

## Installation

### Option A — via Spicetify Marketplace

Search "Moving-Albums" in the Marketplace's Extensions tab and install it.

### Option B — manual install

1. Copy the file into your Spicetify Extensions folder:

   ```bash
   cp moving-albums.js ~/.config/spicetify/Extensions/
   ```

2. Register it:

   ```bash
   spicetify config extensions moving-albums.js
   spicetify apply
   ```

3. Fully quit and reopen Spotify.

## Usage

Hover your mouse over any playlist, album, or artist card in a grid (Home, search results, library, etc.) — it should tilt toward your cursor and lift with a subtle glow. Move away and it settles back flat.

## Customization

| What | Where |
|---|---|
| Tilt strength | `MAX_TILT` constant (degrees) |
| Card selector(s) | `CARD_SELECTOR` array — add another selector if cards in your Spotify version aren't matching |
| Glow color | the `rgba(205,245,100,...)` box-shadow color in `handleMove` |

## Known limitations

Spotify periodically changes its internal DOM class names. If hovering cards does nothing, open DevTools (`spicetify config always_enable_devtools 1 && spicetify apply`, then right-click → Inspect in Spotify) and check what class a card element actually has, then add it to `CARD_SELECTOR`.

## Uninstalling

Via Marketplace: click "Remove" on the extension.

Manual install:

```bash
spicetify config extensions moving-albums.js-
spicetify apply
```

Then delete `moving-albums.js` from `~/.config/spicetify/Extensions/` if you don't plan to reinstall.

## Notes

This is a personal/unofficial extension, not affiliated with or endorsed by Spotify.

## License

[MIT](LICENSE)
