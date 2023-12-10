<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Reviewer } from './Models/Reviewer';
	import { addChatResponse, conversationStore } from './conversationStore';
	import Send from './icons/Send.svelte';

	const dispatch = createEventDispatcher();

	let prompt: string = '';
	let error = '';
	let disabled = false;
	let state: 'idle' | 'busy' | 'done' = 'idle';
	let reviewer: Reviewer;
	let productPrompt: string = '';

	function keypress(e: KeyboardEvent) {
		if (e.altKey) return;
		if (e.ctrlKey) return;
		if (e.key === 'Enter') {
			e.preventDefault();
			submit();
		}
	}

	async function submit() {
		prompt = prompt.trim();
		if (prompt.length < 3) {
			error = 'Type at least 3 characters.';
			return;
		}

		if (prompt.length < 3) return;

		error = '';

		dispatch('submit-prompt', prompt);

		// productPrompt = prompt;
		// addChatResponse(prompt, 'user');



		// await getReviewer();
		// await getReview();
		// await getReviewerPhoto();

		// addChatResponse('All done!');
		// //todo add to reviewer store
		// console.log('reviewer', reviewer);
		// console.log('conversation', $conversationStore);
	}

	async function getReviewer() {
		addChatResponse("Let's go!");

		const response = await fetch('/api/reviewer', {
			method: 'POST',
			body: JSON.stringify({ prompt }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			console.log('Sadness all around.');
		} else {
			const data = await response.json();
			if (!data.reviewer) {
				console.warn('Output did not include reviewer:', data);
				throw new Error('Could not get Reviewer');
			}

			reviewer = data.reviewer;
			addChatResponse(`${reviewer.name}. Working as ${reviewer.role} at ${reviewer.company}.`);
		}
	}

	async function getReviewerPhoto() {
		const response = await fetch('/api/reviewer-avatar', {
			method: 'POST',
			body: JSON.stringify({ description: reviewer.physicalDescription }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			console.log('Sadness all around.');
		} else {
			const data = await response.json();
			reviewer.imageUrl = data.image;
		}
	}

	async function getReview() {
		// Send the GET request
		const response = await fetch('/api/review', {
			method: 'POST',
			body: JSON.stringify({ product: productPrompt, reviewer }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			console.log('Sadness all around.');
			throw new Error('Could not get review');
		} else {
			const data = await response.json();
			reviewer.review = data.review;
		}
	}
</script>

{#if state === 'idle'}
	<form on:submit|preventDefault={submit}>
		<div class="flex flex-col gap-2">
			<div class="flex gap-4 items-end">
				<textarea
					{disabled}
					class="grow px-2 py-1 border rounded border-slate-400 resize-none"
					rows="4"
					name="q"
					id="q"
					bind:value={prompt}
					placeholder="e.g. Tinder but for dogs"
					on:keypress={keypress}
				/>
				<button
					{disabled}
					class="rounded-full p-1 w-8 h-8 aspect-square text-emerald-300 hover:text-emerald-400 active:text-emerald-500 transition-all"
					type="submit"
				>
					<Send />
				</button>
			</div>
			{#if error}
				<div class="text-red-500">{error}</div>
			{/if}
		</div>
	</form>
{/if}
