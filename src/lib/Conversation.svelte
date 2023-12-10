<script lang="ts">
	import BotResponse from './BotResponse.svelte';
	import UserResponse from './UserResponse.svelte';
	import { conversationStore, type ChatResponse } from './conversationStore';

	function isPreviousSame(chat: ChatResponse, i: number): boolean {
		if (i === 0) return false;
		const prev = $conversationStore[i - 1];
		return prev.from === chat.from;
	}
</script>

<div class="flex flex-col gap-2">
	{#each $conversationStore as chat, i}
		{#if chat.from === 'assistant'}
			<BotResponse showAvatar={!isPreviousSame(chat, i)} name="Rose" text={chat.content} />
		{:else}
			<UserResponse text={chat.content} />
		{/if}
	{/each}
</div>
