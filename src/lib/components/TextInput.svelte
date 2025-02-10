<script>
	let {
		className,
		name = '',
		minLength = 0,
		maxLength = 50,
		required = false,
		placeholder = '',
		allowNumbers = false,
		allowSymbols = false,
		resize = false,
		rows = 1,
		onInput,
		onClick,
		onKeypress,
		value = $bindable('')
	} = $props();

	let error = '';

	function autoResize(event) {
		const textarea = event.target;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	function handleInput(event) {
		if (resize) autoResize(event);
		onInput?.();
	}

	export function getError() {
		return error;
	}

	export function getValue() {
		return value;
	}

	export function validInput() {
		if (!value) {
			if (required) {
				error = `${name}: Required`;
				return false;
			}
		}

		if (value.length < minLength) {
			error = `${name}: Minimum length of ${minLength}`;
			return false;
		}

		if (value.length > maxLength) {
			error = `${name}: Maximum length of ${maxLength}`;
			return false;
		}

		if (!allowNumbers) {
			if (/\d/.test(value)) {
				error = `${name}: Numbers not allowed`;
				return false;
			}
		}

		if (!allowSymbols) {
			if (/[^\w\s]/.test(value)) {
				error = `${name}: Symbols not allowed`;
				return false;
			}
		}

		error = '';
		return true;
	}
</script>

{#if resize}
	<textarea
		class={className}
		type="text"
		{placeholder}
		{rows}
		bind:value
		oninput={handleInput}
		onclick={() => onClick?.()}
		onkeypress={(e) => onKeypress?.(e)}
	></textarea>
{:else}
	<input
		class={className}
		type="text"
		{placeholder}
		bind:value
		oninput={handleInput}
		onclick={() => onClick?.()}
		onkeypress={(e) => onKeypress?.(e)}
	/>
{/if}
