<script lang="ts">
	export let text: string | undefined;
	export let speed = 15;
	export let charsPerTick = 1;
  export let skipStream = false;

	$: if (text) start();

	let current: string = '';
	let currentLength = 0;
	let to: ReturnType<typeof setInterval>;

	function start() {
		if (!text) {
			if (to) clearInterval(to);
      return;
		}

    if (skipStream) {
      current = text;
      return;
    }

		to = setInterval(() => {
			if (!text || current.length >= text.length) {
				clearInterval(to);
				return;
			}

			currentLength += charsPerTick;
			current = text.slice(0, currentLength);
		}, speed);
	}
</script>

{current}
