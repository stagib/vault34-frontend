<script>
	import { onMount } from 'svelte';

	let { content, button, onOpen, onClose } = $props();
	let showModal = $state(false);

	export function openModal() {
		showModal = true;
		document.body.style.overflow = 'hidden';
		onOpen?.();
	}

	export function closeModal() {
		showModal = false;
		document.body.style.overflow = '';
		onClose?.();
	}

	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if button}
	<button onclick={openModal}>{@render button()}</button>
{/if}

{#if showModal}
	<div class="fixed left-0 top-0 z-50 h-full w-full">
		{@render content()}
	</div>
{/if}
