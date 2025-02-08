<script>
	import { API_URL } from '$lib/config';

	let { postId, user, onComment } = $props();
	let content = $state('');
	let textarea = $state(null);

	function autoResize(event) {
		const textarea = event.target;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleComment();
		}
	}

	async function handleComment() {
		if (!user) return;
		try {
			const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content }),
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				onComment?.(data);
				content = '';
				textarea.style.height = 'auto';
			}
		} catch (error) {
			throw error;
		}
	}
</script>

{#if user}
	<div class="p-2">
		<div class="flex w-full border border-zinc-600">
			<textarea
				class="max-h-64 w-full resize-none bg-zinc-800 p-2 text-sm outline-none"
				rows="1"
				placeholder="Add comment"
				oninput={autoResize}
				bind:value={content}
				bind:this={textarea}
				onkeydown={handleKeyDown}
			></textarea>

			<div class="mt-auto flex items-center justify-center gap-1 p-1">
				<button
					class="flex items-center justify-center rounded-full bg-zinc-600 p-2"
					aria-label="attach-button"
				>
					<!--TODO-->
					<i class="material-symbols--attach-file"></i>
				</button>
				<button
					class="flex items-center justify-center rounded-full bg-zinc-600 p-2"
					aria-label="comment-button"
					onclick={handleComment}
				>
					<i class="material-symbols--send-rounded"></i>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.material-symbols--send-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--attach-file {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M18 15.75q0 2.6-1.825 4.425T11.75 22t-4.425-1.825T5.5 15.75V6.5q0-1.875 1.313-3.187T10 2t3.188 1.313T14.5 6.5v8.75q0 1.15-.8 1.95t-1.95.8t-1.95-.8t-.8-1.95V6h2v9.25q0 .325.213.538t.537.212t.538-.213t.212-.537V6.5q-.025-1.05-.737-1.775T10 4t-1.775.725T7.5 6.5v9.25q-.025 1.775 1.225 3.013T11.75 20q1.75 0 2.975-1.237T16 15.75V6h2z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
