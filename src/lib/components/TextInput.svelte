<script>
	let {
		className,
		minLength = 0,
		maxLength = 50,
		required = false,
		placeholder = '',
		allowNumbers = false,
		allowSymbols = false,
		resize = false,
		rows = 1,
		value = $bindable(''),
		error = $bindable('')
	} = $props();

	function autoResize(event) {
		const textarea = event.target;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	function validateInput() {
		if (!value) {
			if (required) {
				error = 'Required';
				return;
			}
		}

		if (value.length < minLength) {
			error = `Minimum length of ${minLength}`;
			return;
		}

		if (value.length > maxLength) {
			error = `Maximum length of ${maxLength}`;
			return;
		}

		if (!allowNumbers) {
			if (/\d/.test(value)) {
				error = 'Numbers not allowed';
				return;
			}
		}

		if (!allowSymbols) {
			if (/[^\w\s]/.test(value)) {
				error = 'Symbols not allowed';
				return;
			}
		}

		error = '';
	}

	function handleInput(event) {
		if (resize) autoResize(event);
		validateInput();
	}
</script>

<textarea class={className} type="text" {placeholder} {rows} bind:value oninput={handleInput}
></textarea>
