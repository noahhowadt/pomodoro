import { createApi } from "unsplash-js";
import type { Random } from "unsplash-js/dist/methods/photos/types";

if (!import.meta.env.UNSPLASH_ACCESS_KEY)
  throw new Error("UNSPLASH_ACCESS_KEY is not defined");

const serverApi = createApi({
  accessKey: import.meta.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const searchTerms = [
  "nature",
  "mountains",
  "water",
  "forest",
  "abstract art",
  "architecture",
];
async function getImage() {
  const result = await serverApi.photos.getRandom({
    orientation: "landscape",
    query: searchTerms[Math.floor(Math.random() * searchTerms.length)],
  });
  if (result.errors) throw new Error(result.errors[0]);

  return result.response as Random;
}

export default getImage;
