# Studio Twenty Six Site Editing Map

Most public copy and class information lives in `site/data.js`.

Edit these sections first:

- `SITE`: brand name, email, form endpoint, nav links, footer links.
- `HOME`: homepage hero, mission, Tess teaser, marquee text, making section, homepage signup teaser.
- `ABOUT`: about page hero, mission, vision, Tess bio, credits, story sections, quote.
- `SIGNUP`: signup page hero, form labels/options, step cards, class-date button text.
- `CLASSES_PAGE`: classes index hero copy and image.
- `CALENDAR`: calendar intro, filter chips, artwork cards, drawer notes, class detail links.
- `MONTHS`: visible calendar month tabs.
- `COSTS`: suggested prices and sliding-scale ranges.
- `EVENTS`: dated calendar sessions used by the Studio checkout.
- `CLASS_DETAILS`: individual class detail pages, images, included lists, and notes.
- `MEDIUMS`: the pill-shaped “Things you can make” list.

For images, keep the same relative style already used in `data.js`, for example:

```js
image: "../assets/photo-c1.jpg"
```

For Stripe checkout, update the matching event list in `api/checkout.js` when adding, removing, or repricing dated sessions.
