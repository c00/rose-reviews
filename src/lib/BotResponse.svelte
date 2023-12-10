<script lang="ts">
	import StreamingText from './StreamingText.svelte';

	export let name: string;
	export let avatar = '/Rose.png';
	export let text: string;
	export let showAvatar = true;
</script>

<div class="flex gap-4 items-top pl-4">
	{#if showAvatar}
		<div
			class="aspect-square rounded-full h-20 bg-cover mt-6 shrink-0"
			style="background-image: url({avatar});"
		></div>
	{:else}
		<div class="w-20 mt-0 shrink-0"></div>
	{/if}

	<div class="">
		<div class:mt-4={showAvatar} class="pt-4 px-4 border rounded border-slate-300">
			{#if showAvatar}
				 <div class="font-medium">{name}</div>
				 {/if}
			<div class="mb-4 whitespace-pre-wrap">
				<StreamingText {text} />
			</div>
		</div>
	</div>
</div>
