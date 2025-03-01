<script>
	import { clickOutside } from '$lib/utils';

	let { disableScroll, button, content } = $props();
	let showDropdown = $state(false);

	function toggleDropdown(e) {
		e.stopPropagation();
		e.preventDefault();
		showDropdown = !showDropdown;
		if (disableScroll) {
			document.body.style.overflow = showDropdown ? 'hidden' : '';
		}
	}

	function closeDropdown() {
		showDropdown = false;
		if (disableScroll) {
			document.body.style.overflow = '';
		}
	}
</script>

<button class="relative" onclick={toggleDropdown} use:clickOutside={closeDropdown}>
	{@render button()}

	{#if showDropdown}
		{@render content()}
	{/if}
</button>
