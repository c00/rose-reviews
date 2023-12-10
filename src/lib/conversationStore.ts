import { writable } from 'svelte/store';

export interface ChatResponse {
	content: string;
	from: 'assistant' | 'user';
}
const introText =
	"Hi! I'm Rose the Review Wizard. Tell me what your product or service is about, and I'll take care of the rest!";

export const conversationStore = writable<ChatResponse[]>([
	{ from: 'assistant', content: introText },
]);

export function resetConversation() {
	conversationStore.set([{ from: 'assistant', content: introText }]);
}

export function addChatResponse(content: string, from: 'assistant' | 'user' = 'assistant') {
	conversationStore.update((v) => {
		v.push({ from, content });
		return v;
	});
}

export const exampleConversation: ChatResponse[] = [
	{
		from: 'assistant',
		content:
			"Hi! I'm Rose the Review Wizard. Tell me what your product or service is about, and I'll take care of the rest!",
	},
	{
		from: 'user',
		content: 'tinder for frogs',
	},
	{
		from: 'assistant',
		content: 'Here we go!',
	},
	{
		from: 'assistant',
		content: 'Lily Green. Working as Product Manager at Ribbit Solutions.',
	},
	{
		from: 'assistant',
		content: 'All done!',
	},
];
