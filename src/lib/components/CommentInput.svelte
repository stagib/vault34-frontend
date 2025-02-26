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
		<div class="flex w-full rounded-md border border-zinc-600">
			<textarea
				class="max-h-64 w-full resize-none rounded-md bg-zinc-800 p-2 text-sm outline-none"
				rows="1"
				placeholder="Add comment"
				oninput={autoResize}
				bind:value={content}
				bind:this={textarea}
				onkeydown={handleKeyDown}
			></textarea>

			<div class="mt-auto flex items-center justify-center gap-1 p-1">
				<!-- <button
					class="flex items-center justify-center rounded-full bg-zinc-600 p-2 hover:bg-zinc-500"
					aria-label="attach-button"
				>
					<i class="material-symbols--add-link"></i>
				</button> -->
				<button
					class="flex items-center justify-center rounded-full bg-zinc-600 p-2 hover:bg-zinc-500"
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

	/* 	.material-symbols--add-link {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M17 20v-3h-3v-2h3v-3h2v3h3v2h-3v3zm-6-3H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h4zm-3-4v-2h8v2zm14-1h-2q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.538 1.463T22 12'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	} */
</style>
