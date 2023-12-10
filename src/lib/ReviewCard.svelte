<script lang="ts">
	import Avatar from './Avatar.svelte';
	import type { Reviewer } from './Models/Reviewer';
	import StreamingText from './StreamingText.svelte';

	export let reviewer: Reviewer;
</script>

<div
	class="border border-sky-900 bg-sky-800 text-white w-full rounded-lg px-8 pt-2 pb-8 flex flex-col gap-2"
>
	<div>
		<Avatar src={reviewer.imageUrl} />
		<div class="font-title text-center font-medium text-xl mt-4">
			<StreamingText text={reviewer.name} />
		</div>
		<div class="text-sm text-slate-200 text-center mb-4">
			{#if reviewer.role}
				<StreamingText text="{reviewer.role} at {reviewer.company}" />
			{/if}
		</div>
	</div>
	<div class="leading-7"><StreamingText text={reviewer.review} /></div>
</div>
