# Instagram homepage feed

The homepage `#instagram` section shows latest posts from https://www.instagram.com/studio26ca/

This environment has no Meta/Instagram token. The public page therefore uses Instagram’s official profile embed (`embed.js` + the @studio26ca permalink). That widget updates when Instagram updates the profile; it is not a handful of hardcoded photos.

To switch the section to an on-site photo grid (same store as `/api/instagram-feed.js`):

1. Create a Meta app with Instagram API access for @studio26ca.
2. Set `INSTAGRAM_ACCESS_TOKEN` on Vercel (optional `INSTAGRAM_USER_ID`).
3. Redeploy. The API caches Graph results for 15 minutes.

Do not invent posts. Do not email anyone from this feed.
