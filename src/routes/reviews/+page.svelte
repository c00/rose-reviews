<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Conversation from '../../lib/Conversation.svelte';
	import ReviewCard from '../../lib/ReviewCard.svelte';
	import { addChatResponse, resetConversation } from '../../lib/conversationStore';
	import { createReviewer } from '../../lib/createReviewer';
	import { reviewerStore } from '../../lib/reviewerStore';

	const reviewCount = 2;

	$: reversed = [...$reviewerStore].reverse();

	let prompt: string;

	onMount(() => {
		prompt = $page.url.searchParams.get('prompt') || '';
		if (!prompt) return;

		addChatResponse(prompt, 'user');

		createMore()
	});

	function createMore() {
		for (let i = 0; i < reviewCount; i++) {
			createReviewer(prompt);
		}
	}

	function restart() {
		reviewerStore.set([]);
		resetConversation();
		goto('\\');
	}
</script>

<h1 class="mt-12 mx-auto px-12 text-center font-title text-2xl mb-8">
	Make reviews for real and fake products
</h1>

<div class="mt-4 flex mx-auto px-12 gap-4 justify-center">
	<div class="w-2/3 max-w-screen-md flex flex-wrap gap-4 flex-row-reverse">
		{#each reversed as reviewer (reviewer.id)}
			<div class="review-width">
				<ReviewCard {reviewer} />
			</div>
		{/each}
	</div>

	<div class="grow max-w-sm">
		<div class="mt-4 flex gap-4 justify-end">
			<button
				class="px-4 py-2 uppercase bg-slate-200 rounded border border-slate-300 hover:bg-blue-300 transition-colors active:bg-blue-400"
				on:click={restart}>Start over</button
			>

			<button
				class="px-4 py-2 uppercase bg-slate-200 rounded border border-slate-300 hover:bg-blue-300 transition-colors active:bg-blue-400"
				on:click={createMore}>Create More</button
			>
		</div>
		<Conversation />
	</div>
</div>

<style lang="postcss">
	.review-width {
		width: calc(50% - 1rem);
	}
</style>
