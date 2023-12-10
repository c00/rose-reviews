import { OPENAI_API_KEY } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { type Reviewer, reviewerSchema } from '../../../lib/Models/Reviewer.js';
import { tryParse } from '../../../lib/tryParse.js';

const agentPrompt = `Create a fake person. Give them a creative name, gender (m/f), company they work at and role. Also write one paragraph about their personality, and one paragraph about what they look like physically. The person should have a role related to the product or service the user provides, but not work at the company.
Your response should be JSON and only JSON.
Example output: 
{
  "name": "Jenny Jones",
  "gender": "m",
  "company": "Fake Tech Inc",
  "role": "Head of Marketing",
  "personality": "Jenny is a happy person that likes things, blabla",
  "physicalDescription": "Jenny has blonde hair, is 24 years old, wears glasses, etc"
}`;

export async function POST({ request }) {
	const { prompt } = await request.json();

	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY,
	});

	console.log('Creating Reviewer...');
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{ role: 'system', content: agentPrompt },
			{ role: 'user', content: `This is the product / service: ${prompt}` },
		],
		model: 'gpt-3.5-turbo',
	});

	const content = chatCompletion.choices[0].message.content;
	if (!content) throw error(500, 'Empty content from ChatGPT');

	const reviewer = tryParse<Reviewer>(content);
	const result = reviewerSchema.safeParse(reviewer);
	if (!result.success) {
		console.error('Content sucked', reviewer, result.error.issues);
		throw error(500, 'Content body from ChatGPT was incorrect');
	}

	return json({ reviewer });
}
