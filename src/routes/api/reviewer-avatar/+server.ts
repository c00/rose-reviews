import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';

export async function POST({ request }) {
	const { description, gender } = await request.json();
	const genderText = gender === 'f' ? 'female' : 'male';

	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY,
	});

	console.log('Generating an avatar...');

	const imageResult = await openai.images.generate({
		prompt: `Photo realistic profile picture of one ${genderText} person. ${description}`,
		model: 'dall-e-3',
		quality: 'standard',
		response_format: 'url',
		size: '1024x1024',
		n: 1,
	});

	const image = imageResult.data[0];

	console.log(image.revised_prompt);

	return json({ image: image.url });
}
