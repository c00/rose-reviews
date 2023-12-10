<script lang="ts">
	import StreamingText from "./StreamingText.svelte";

	export let avatar = '/Patrick.png';
	export let text: string;
	export let showAvatar = true;
</script>

<div class="flex gap-4 items-top pl-4 self-end">
	<div class="">
		<div class:mt-4={showAvatar} class="pt-4 px-4 border rounded border-slate-300">
			<div class="mb-4 whitespace-pre-wrap">
				<StreamingText {text} />
			</div>
		</div>
	</div>

	{#if showAvatar}
		<div
			class="aspect-square rounded-full h-20 bg-cover mt-6 border border-slate-200 shrink-0"
			style="background-image: url({avatar});"
		></div>
	{:else}
		<div class="w-20 mt-0 shrink-0"></div>
	{/if}
</div>
