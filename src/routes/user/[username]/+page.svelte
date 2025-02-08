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
	let view = $state('vaults');
</script>

{#if fetchedUser}
	<div class="flex h-screen gap-4 px-4 pb-10 pt-14">
		<div class="flex max-h-full w-full max-w-xs flex-col border border-zinc-600 bg-zinc-800">
			<div class="flex border-b border-zinc-600 px-4 py-4 pb-8">
				<div class="flex flex-col">
					<div class="mb-1 text-base font-semibold">{fetchedUser.username}</div>
					<div class="text-sm text-zinc-300">Joined {fetchedUser.time_since}</div>
				</div>

				<div class="ml-auto">
					<MoreButtonUser />
				</div>
			</div>

			<div class="mt-4 flex flex-col px-4">
				<button
					class="flex justify-between p-2 hover:bg-zinc-700"
					class:bg-zinc-700={view === 'vaults'}
					onclick={() => (view = 'vaults')}
				>
					<div class="font-semibold">Vaults</div>
					<div class="text-sm text-zinc-300">{fetchedUser.vault_count}</div>
				</button>

				<button
					class="flex justify-between p-2 hover:bg-zinc-700"
					class:bg-zinc-700={view === 'posts'}
					onclick={() => (view = 'posts')}
				>
					<div class="font-semibold">Posts</div>
					<div class="text-sm text-zinc-300">{fetchedUser.post_count}</div>
				</button>

				<button
					class="flex justify-between p-2 hover:bg-zinc-700"
					class:bg-zinc-700={view === 'likedPosts'}
					onclick={() => (view = 'likedPosts')}
				>
					<div class="font-semibold">Liked Posts</div>
					<div class="text-sm text-zinc-300">{fetchedUser.liked_posts}</div>
				</button>

				<button
					class="flex justify-between p-2 hover:bg-zinc-700"
					class:bg-zinc-700={view === 'comments'}
					onclick={() => (view = 'comments')}
				>
					<div class="font-semibold">Comments</div>
					<div class="text-sm text-zinc-300">{fetchedUser.comment_count}</div>
				</button>
			</div>
		</div>

		<div class="max-h-full w-full overflow-y-auto">
			{#if view === 'vaults'}
				<VaultFetcher {fetchedUser} {user} />
			{:else if view === 'posts'}
				<UserPostFetcher {fetchedUser} {user} />
			{:else if view === 'likedPosts'}
				<UserLikedPostFetcher {fetchedUser} />
			{:else if view === 'comments'}
				<UserCommentFetcher {fetchedUser} {user} />
			{/if}
		</div>
	</div>
{/if}
