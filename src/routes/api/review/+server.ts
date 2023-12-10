import { OPENAI_API_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import OpenAI from 'openai';

const agentPrompt = `Write short, one paragraph reviews for fictional products. Use the product and Reviewer details provided. The output is only the paragraph of text.`;

export async function POST({ request }) {
	const { product, reviewer } = await request.json();

	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY,
	});

	console.log('Creating a Review for ' + reviewer.name);
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{ role: 'system', content: agentPrompt },
			{ role: 'user', content: `This is the product / service: ${product}` },
			{ role: 'user', content: `This is the character of the reviewer: ${reviewer.personality}` },
		],
		model: 'gpt-3.5-turbo',
	});

	const content = chatCompletion.choices[0].message.content;
	if (!content) throw error(500, 'Empty content from ChatGPT');

	return json({ review: content });
}
