<script>
	import { API_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import Masonry from './Masonry.svelte';

	let { fetchedUser, user } = $props();

	let page = 1;
	let loading = false;
	let posts = $state([]);
	let total = $state(0);
	let hasNext = $state(true);
	let target = $state(null);

	async function fetchUserPosts(username) {
		if (loading || !hasNext) return;
		loading = true;

		try {
			const response = await fetch(`${API_URL}/users/${username}/posts`);
			const data = await response.json();

			if (response.ok) {
				posts = [...posts, ...data.items];
				total = data.total;
				hasNext = data.page < data.pages;
				page = page + 1;
			}
		} catch (error) {
			throw error;
		}
		loading = false;
	}

	$effect(() => {
		page = 1;
		hasNext = true;
		posts = [];
		fetchUserPosts(fetchedUser.username);
	});
</script>

{#if user && user.id === fetchedUser.id}
	<div class="flex">
		<a
			class="mb-4 flex items-center justify-center gap-1 border border-zinc-600 bg-zinc-700 p-1 px-2 text-sm hover:bg-zinc-600"
			href="/create"
		>
			<i class="material-symbols--add-2-rounded"></i>
			<div class="text-xs">New post</div>
		</a>
	</div>
{/if}

<Masonry items={posts}>
	{#each posts as post}
		<a href={`/post/${post.id}`}>
			<img src={post.thumbnail} alt="" />
		</a>
	{/each}
</Masonry>

{#if hasNext}
	<div bind:this={target}></div>
{/if}

<style>
	.material-symbols--add-2-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
