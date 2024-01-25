import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import slugify from "slugify";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    // Generate slug based on the prompt
    const slug = slugify(prompt, { lower: true });

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
      slug,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
