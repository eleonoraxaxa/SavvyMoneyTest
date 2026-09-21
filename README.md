# SavvyMoney Test

A responsive implementation of the supplied [Adobe XD design](https://xd.adobe.com/view/461545f4-16a4-4d0b-84cf-355f9144d524-1346/specs/), built with Next.js App Router, React, TypeScript, and CSS Modules.

## Run locally

Use Node.js 22 LTS or newer.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The lockfile is included for reproducible installs. ESLint 9 is retained because the React rules bundled with this Next.js release are incompatible with ESLint 10.

## Behavior and design

- Soap is selected on initial load. Selecting Hazmat, Soap, Paper, or Desinfectant updates the heading, illustration, and selected background using local state. Reloading resets the selection to Soap.
- The supplied design contains one 375 × 812 mobile artboard. Its original vectors, Roboto typography, white canvas, and peach-to-yellow selected background are reused. The other category views and wider layouts extend that composition.
- The label “Desinfectant” follows the spelling in the supplied design. Its longer heading uses a smaller mobile font to fit on one line.
- Layout dimensions, spacing, typography, and breakpoints use `em`. Percentages handle fluid widths, while `100svh` and safe-area insets handle mobile browser chrome and notches. SVG view boxes use their original unitless coordinates.
- Wider layouts enlarge the illustration at `48em` and `75em`. Short screens use a smaller illustration below `42em` in height. Very short landscape screens scroll vertically instead of clipping content.
- Category controls implement the ARIA tabs pattern, including arrow keys with wrapping, Home/End, a single tab stop, linked panels, and visible focus. Illustrations have descriptions; navigation icons are decorative because their text labels already name the controls. Motion respects reduced-motion preferences.
- Content, illustrations, and fonts are served locally. There is no backend, account flow, or runtime dependency on Adobe or Google Fonts.

## Structure

```text
src/app/                       Root layout, home page, global styles, and icon
src/components/                Interactive showcase and scoped responsive styles
src/data/products.ts           Typed local category content
src/assets/fonts/              Roboto Medium/Bold and SIL Open Font License
public/images/                 Original design illustrations as standalone SVGs
```

Only the interactive showcase is a Client Component; the layout and page remain Server Components. The home route is prerendered during the production build.

## Verification

Browser checks covered all four categories at 320 × 568, 375 × 812, 768 × 1024, 1440 × 900, and 812 × 375. Checks verified a single selected tab and visible panel, matching headings, loaded illustrations, touch target widths, and no horizontal overflow. Keyboard checks covered Left/Right, wraparound, Home/End, and matching keyboard focus.

These were live browser checks, not a committed automated test suite. Linting, TypeScript checking, and the production build are available through the commands above. Physical-device and cross-browser testing remain separate checks.

## Assets

The four illustrations were extracted from the vector paths in the user-provided Adobe XD artboard. No replacement illustrations were generated. Roboto is self-hosted under the included SIL Open Font License in `src/assets/fonts/OFL.txt`.
