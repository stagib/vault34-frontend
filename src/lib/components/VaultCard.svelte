<script>
	import { API_URL } from '$lib/config';

	let { vault, postId } = $props();
	let hasPost = $state(vault.has_post);

	async function saveToVault() {
		try {
			const response = await fetch(`${API_URL}/vaults/${vault.id}/posts/${postId}`, {
				method: 'POST',
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				hasPost = true;
			}
		} catch (error) {
			throw error;
		}
	}

	async function removeFromVault() {
		try {
			const response = await fetch(`${API_URL}/vaults/${vault.id}/posts/${postId}`, {
				method: 'DELETE',
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				hasPost = false;
			}
		} catch (error) {
			throw error;
		}
	}

	function handleClick() {
		if (hasPost) {
			removeFromVault();
		} else {
			saveToVault();
		}
	}
</script>

<button
	class="flex w-full items-center justify-between p-1 px-2 hover:bg-zinc-700"
	onclick={handleClick}
>
	<div class="flex items-center gap-2">
		<div class="h-10 w-10 bg-zinc-600">
			{#if vault.posts[0]}
				<img class="h-full w-full object-cover" src={vault.posts[0].thumbnail} alt="" />
			{/if}
		</div>
		<div class="flex flex-col text-start">
			<div class="text-sm font-semibold">{vault.title}</div>
			<div class="text-xs text-zinc-300">{vault.post_count} posts</div>
		</div>
	</div>
	<div class="h-4 w-4 border border-zinc-600" class:bg-zinc-600={hasPost}></div>
</button>
