import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch user prompts.", {
      status: 500,
    });
  }
};
