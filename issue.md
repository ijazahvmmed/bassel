# Mobile Right-Side Overflow — Implementation Report

## 1. Current Site Implementation

### 1.1 DOM Structure
The application follows a standard React hierarchy:
- `html`
  - `body` (Styled with `overflow-x: hidden`, `width: 100%`)
    - `div#root`
      - `PromoBanner` (Fixed, top: 0, 100% width)
      - `Navbar` (Fixed, top: var(--banner-height), 100% width)
      - `Hero` (Section, min-height: 100vh)
      - `BeginAdventure` (Section)
      - `StorySummary` (Section)
      - `TestimonialsSection` (Section)
      - `BookShowcase` (Section)
      - `ThemesAndQuotes` (Section)
      - `LoreSection` (Section)
      - `NewsSection` (Section)
      - `FAQSection` (Section)
      - `Footer` (Footer)

Most sections use a `.container` wrapper with `max-width: 1200px` and `padding: 0 20px`.

### 1.2 CSS Layout System
- **Box Model**: Standardized using `* { box-sizing: border-box; }`.
- **Primary Layouts**: Heavy reliance on **CSS Grid** (`repeat(auto-fit, minmax(...))`) and **Flexbox**.
- **Positioning**: 
  - `Fixed`: Used for the `PromoBanner` and `Navbar`.
  - `Absolute`: Used for decorative elements (borders, quote boxes) and background overlays.
  - `Relative`: Used as anchors for the absolute decorative elements.

### 1.3 Mobile-Specific Rules
- Media queries are currently limited to:
  - Global `:root` variable adjustment for `--banner-height` (40px -> 60px).
  - Desktop menu hiding (`.hidden-mobile`) and mobile toggle visibility (`.visible-mobile`) at `992px`.
  - Banner text font-size scaling at `600px`.
- Viewport handles scaling via `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.

---

## 2. Exact Cause of the Mobile Overflow

### Offending Element(s)
1. **`StorySummary` Grid Container**: The grid items have a minimum width that exceeds common mobile viewports.
2. **`StorySummary` Decorative Quote Box**: An absolutely positioned `div` with a negative `right` value.
3. **`BookShowcase` Decorative Border**: An absolutely positioned `div` with a negative `right` value.
4. **`NewsSection` & `LoreSection` Grids**: Minimum widths in `minmax()` that approach or exceed narrow mobile viewport widths.

### Responsible CSS Rules
1. **For `StorySummary`**: 
   - `gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"`
   - `right: "-30px"` (Absolute positioning on quote block)
2. **For `BookShowcase`**:
   - `right: "-20px"` (Absolute positioning on border decoration)
3. **For `NewsSection` / `LoreSection`**:
   - `gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"`

### Technical Explanation
- **Grid Minimums**: The `minmax(400px, 1fr)` rule forces the grid column to be at least `400px` wide. On a standard mobile device (e.g., iPhone 13 at 390px or iPhone SE at 375px), the grid column pushes beyond the container boundaries, creating horizontal overflow.
- **Negative Offsets**: The use of `right: "-30px"` or `right: "-20px"` on absolute elements inside a relative container that sits flush with the screen edge forces those decorative elements to protrude into the "non-existent" space to the right of the viewport. Since the parent sections do not have `overflow: hidden`, these elements trigger horizontal scrollbars or gaps.

---

## 3. Proof of Overflow
- **Viewport Calculation**: On a **375px** screen:
  - Available space inside `.container` (padding 20px each side) = **335px**.
  - `StorySummary` minimum column width = **400px**.
  - **Resulting Overflow**: `400px - 335px = 65px` of hidden content/scrollable area.
  - Adding the `right: -30px` quote box adds another **30px** to the overflow, totaling **~95px** of right-side gap.

---

## 4. Fixes Based on Existing Code

### Fix A — Minimal & Safe (CSS Hidden Overflow)
Add `overflow: hidden` to sections containing protruding decorative elements. This is the least invasive way to clip the "blooming" decorations.

```css
/* Add to existing styles constant */
section {
  overflow: hidden;
  width: 100%;
}
```
**Why this works**: It forces any child elements (like the `-30px` quote box) to be clipped if they exceed the section's boundary, immediately removing the right-side gap without changing the internal layout.

### Fix B — Structural Correction (Responsive Grids)
Update the `minmax` values to ensure they are always smaller than the narrowest common mobile viewport (~320px).

```tsx
/* StorySummary.tsx / Hero / etc */
// Change 400px to 280px or 100%
gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))"
```
**Why this prevents recurrence**: By using `min(100%, 300px)`, you allow the grid item to shrink to 100% of the screen width on very small devices while maintaining the desired layout on larger screens. This addresses the root architectural cause.

---

## 5. What NOT to Do
- **Avoid `overflow-x: hidden` on `html` alone**: This often breaks "sticky" positioning and doesn't resolve the underlying issue of content being cut off.
- **Avoid hardcoded viewport widths**: Do not set `width: 375px` or similar; it breaks responsiveness on iPads and larger phones.
- **Avoid removing negative offsets entirely**: These are part of the "premium" design aesthetic; they should be clipped, not deleted.

---

## 6. Verification Checklist
1. Open Chrome DevTools.
2. Toggle Device Toolbar and select **iPhone SE** (375px).
3. Check for the horizontal scrollbar at the bottom.
4. Inspect the `html` element; its width should be exactly `375px` with no trailing whitespace.
5. Scroll vertically to the `StorySummary` and `BookShowcase` sections to ensure the gold decorations are clipped properly at the screen edges.
