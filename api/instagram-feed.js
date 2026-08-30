// Latest @studio26ca posts. Prefers Instagram Graph when a token is set.
// Without a token, the homepage uses Instagram's official profile embed instead.
// Do not invent posts.

const PROFILE_URL = "https://www.instagram.com/studio26ca/";
const TTL_MS = 15 * 60 * 1000;
let cache = { at: 0, body: null };

function token() {
  return process.env.INSTAGRAM_ACCESS_TOKEN || process.env.IG_ACCESS_TOKEN || process.env.INSTAGRAM_TOKEN || "";
}

function asPost(item) {
  if (!item || !item.permalink) return null;
  const mediaUrl = item.media_url || "";
  const thumbnailUrl = item.thumbnail_url || "";
  if (!mediaUrl && !thumbnailUrl) return null;
  return {
    id: item.id || item.permalink,
    permalink: item.permalink,
    mediaUrl,
    thumbnailUrl: thumbnailUrl || mediaUrl,
    timestamp: item.timestamp || "",
    mediaType: item.media_type || "",
  };
}

async function fetchGraphPosts(accessToken) {
  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=8&access_token=${encodeURIComponent(accessToken)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Instagram Graph returned ${response.status}`);
  const data = await response.json();
  return (data.data || []).map(asPost).filter(Boolean);
}

module.exports = async function instagramFeed(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");

  if (cache.body && Date.now() - cache.at < TTL_MS) {
    return res.status(200).json(cache.body);
  }

  const accessToken = token();
  let posts = [];
  let source = "oembed";

  if (accessToken) {
    try {
      posts = await fetchGraphPosts(accessToken);
      if (posts.length) source = "graph";
    } catch (error) {
      console.error("Instagram Graph feed failed", error);
    }
  }

  const body = {
    handle: "studio26ca",
    profileUrl: PROFILE_URL,
    source,
    posts,
  };
  cache = { at: Date.now(), body };
  return res.status(200).json(body);
};
