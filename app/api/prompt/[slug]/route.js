import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";
import slugify from "slugify";
// Get (read)
export const GET = async(request, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt
            .findOne({slug: params.slug})
            .populate('creator');
        if (!prompt) 
            return new Response("Prompt not  found", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response(JSON.stringify({error: 'Failed to fetch prompts'}), {status: 500});
    }
};
// Patch (update)
export const PATCH = async(request, {params}) => {
    const {prompt, tag} = await request.json()

    try {
        await connectToDB()
        const existingPrompt = await Prompt.findOne({slug: params.slug})
        if (!existingPrompt) 
            return new Response("Prompt not  found", {status: 404})
            const slug = slugify(prompt, { lower: true });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        existingPrompt.slug = slug;

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: 'Failed to Update prompts'}), {status: 500});
    }
}

// Delete(delete)
export const DELETE = async(request, {params}) => {
    try {
        await connectToDB()
        await Prompt.findOneAndDelete( {slug:params.slug})
        return new Response("Prompt delete", {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: 'Failed to Delete prompts'}), {status: 500});
    }
}
