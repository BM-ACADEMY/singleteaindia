export const convertToEmbedUrl = (url) => {
  if (!url) return "";

  // If it's already an embed link, return as is
  if (url.includes("google.com/maps/embed")) return url;

  // Handle shortened maps.app.goo.gl links
  // Unfortunately, maps.app.goo.gl is a redirect, so ideally resolve it in backend
  // Temporary fallback: replace base with embed
  if (url.includes("maps.app.goo.gl")) {
    return url.replace("maps.app.goo.gl", "www.google.com/maps?q=");
  }

  // Handle standard "https://www.google.com/maps/place/..."
  if (url.includes("google.com/maps")) {
    return url.replace("/maps/", "/maps/embed/");
  }

  return url;
};
