<script>
	import MoreButtonUser from '$lib/components/MoreButtonUser.svelte';
	import UserCommentFetcher from '$lib/components/UserCommentFetcher.svelte';
	import UserLikedPostFetcher from '$lib/components/UserLikedPostFetcher.svelte';
	import UserPostFetcher from '$lib/components/UserPostFetcher.svelte';
	import Vault from '$lib/components/Vault.svelte';
	import VaultFetcher from '$lib/components/VaultFetcher.svelte';

	let { data } = $props();
	let user = $derived(data.user);
	let fetchedUser = $derived(data.fetchedUser);
	let view = $derived(data.view || 'vaults');
</script>

<div class="flex h-screen flex-col px-2 pb-4 pt-14 sm:items-center sm:px-4">
	<div class="mb-4 mt-4 flex px-4 sm:mb-8">
		<div class="flex flex-col">
			<div class="mb-1 text-base font-semibold">{fetchedUser.username}</div>
			<div class="text-xs text-zinc-400">Joined {fetchedUser.time_since}</div>
		</div>

		<div class="ml-auto sm:ml-14">
			<MoreButtonUser />
		</div>
	</div>

	<div class="mb-4 flex">
		<a
			class="flex items-center justify-between gap-2 px-4 py-1 text-xs sm:text-sm {view === 'vaults'
				? 'border-b border-zinc-50 text-zinc-50'
				: 'rounded-md text-zinc-400  hover:bg-zinc-800'}"
			href={`/user/${fetchedUser.username}?view=vaults`}
		>
			<div class="text-nowrap font-semibold">Vaults</div>
			<div class="text-zinc-400">{fetchedUser.vault_count}</div>
		</a>

		<a
			class="text- items-centerxs flex justify-between gap-2 px-4 py-1 text-xs sm:text-sm {view ===
			'posts'
				? 'border-b border-zinc-50 text-zinc-50'
				: 'rounded-md border-transparent text-zinc-400 hover:bg-zinc-800'}"
			href={`/user/${fetchedUser.username}?view=posts`}
		>
			<div class="text-nowrap font-semibold">Post</div>
			<div class="text-zinc-400">{fetchedUser.post_count}</div>
		</a>

		<a
			class="items-centerext-sm flex justify-between gap-2 px-4 py-1 text-xs sm:text-sm {view ===
			'likedPosts'
				? 'border-b border-zinc-50 text-zinc-50'
				: 'rounded-md border-transparent text-zinc-400 hover:bg-zinc-800'}"
			href={`/user/${fetchedUser.username}?view=likedPosts`}
		>
			<div class="text-nowrap font-semibold">Liked posts</div>
			<div class="text-zinc-400">{fetchedUser.liked_posts}</div>
		</a>

		<!-- 		<a
			class="flex justify-between gap-2 px-4 py-1 text-sm {view === 'comments'
				? 'border-b border-zinc-50 text-zinc-50'
				: 'rounded-md border-transparent text-zinc-400 hover:bg-zinc-800'}"
			href={`/user/${fetchedUser.username}?view=comments`}
		>
			<div class="flex items-center gap-4">
				<div class="text-nowrap font-semibold">Comments</div>
			</div>
			<div class="text-sm text-zinc-400">{fetchedUser.comment_count}</div>
		</a> -->
	</div>

	<div class="h-full w-full overflow-y-auto">
		{#if view === 'vaults'}
			<VaultFetcher {fetchedUser} {user} />
		{:else if view === 'posts'}
			<UserPostFetcher {fetchedUser} {user} />
		{:else if view === 'likedPosts'}
			<UserLikedPostFetcher {fetchedUser} />
			<!-- {:else if view === 'comments'}
			<UserCommentFetcher {fetchedUser} {user} /> -->
		{/if}
	</div>
</div>
