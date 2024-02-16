import type { APIRoute } from "astro";
import getImage from "../../utils/getImage";

export const GET: APIRoute = async ({ params, request }) => {
  const photo = await getImage();
  return new Response(JSON.stringify(photo), {
    headers: {
      "content-type": "application/json",
    },
  });
};
