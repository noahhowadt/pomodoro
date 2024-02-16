import { createApi } from "unsplash-js";

if (!import.meta.env.UNSPLASH_ACCESS_KEY)
  throw new Error("UNSPLASH_ACCESS_KEY is not defined");

const serverApi = createApi({
  accessKey: import.meta.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

async function getImage() {
  /*const result = await serverApi.photos.getRandom({
    orientation: "landscape",
    query: "nature",
  });
  if (result.errors) throw new Error(result.errors[0]);

  return result.response as Random;*/
  return { urls: { regular: "/public/image.jpg" } };
}

export default getImage;
