<script lang="ts">
	import { fade } from 'svelte/transition';
	import Profile from './icons/Profile.svelte';

	export let src: string | undefined;
	let image: HTMLImageElement;
	let imageLoaded = false;
	let imageInit = false;

	$: if (src && image) loadImage();

	function loadImage() {
		if (imageInit) return;
		imageInit = true;

    if (!src) return;
    image.src = src;

		image.addEventListener('load', function () {
			console.log('Image is loaded and ready to use!');
			imageLoaded = true;
		});

		// Add the error event handler to handle any errors during image loading
		image.addEventListener('error', function () {
			console.log('Error occurred while loading the image.');
		});
	}
</script>

<div
	class="h-40 w-auto rounded-full mt-6 border border-slate-700 shadow-md mx-auto overflow-hidden aspect-square relative"
>
	{#if !imageLoaded}
		<div class="h-40 w-40 transition-all text-slate-500 glow" out:fade>
			<Profile />
		</div>
	{/if}
	<img
		bind:this={image}
		alt="Avatar"
		class:opacity-100={imageLoaded}
		class="h-40 w-auto opacity-0 transition-all"
	/>
</div>

<style lang="postcss">
	.glow {
		animation: glow 1s infinite alternate;
	}

	@keyframes glow {
		from {
			@apply text-slate-400;
		}
		to {
			@apply text-slate-500;
		}
	}
</style>
