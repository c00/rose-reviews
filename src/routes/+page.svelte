<script lang="ts">
	import { goto } from '$app/navigation';
	import Conversation from '../lib/Conversation.svelte';
	import Prompt from '../lib/Prompt.svelte';

	function doThings(e: CustomEvent<string>) {
		goto(`/reviews?prompt=${encodeURIComponent(e.detail)}`);
	}
</script>

<h1 class="mt-12 mx-auto px-12 text-center font-title text-2xl mb-8">
	Make reviews for real and fake products
</h1>

<div class="mt-4 flex mx-auto px-12 gap-4 justify-center">
	<div class="w-2/3 max-w-screen-md flex flex-wrap gap-4">
		<Conversation />

		<div class="mt-4 w-full">
			<Prompt on:submit-prompt={doThings} />
		</div>
	</div>
</div>
