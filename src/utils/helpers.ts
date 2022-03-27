export const isValidUrl = (urlToCheck: string) => {
  let url;

  try {
    url = new URL(urlToCheck);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export const getMediaType = (urlContent: string) => {
  const types = new Map([
    ["jpg", "img"],
    ["gif", "img"],
    ["png", "img"],
    ["mp4", "video"],
    ["3gp", "video"],
  ]);

  const url = new URL(urlContent);

  const extension = url.pathname.split(".");

  for (let i = 0; i < extension.length; i++) {
    const found = types.get(extension[i]);

    if (found) {
      return found;
    }
  }
  return "";
};
