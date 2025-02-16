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
	class="flex w-full items-center justify-between rounded-md p-1 px-2 hover:bg-zinc-700"
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
	<div
		class="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-600 {hasPost
			? 'bg-zinc-100'
			: ''}"
	>
		{#if hasPost}
			<div class="flex h-full w-full items-center justify-center text-zinc-950">
				<i class="material-symbols--check-rounded"></i>
			</div>
		{/if}
	</div>
</button>

<style>
	.material-symbols--check-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
