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
	<div class="flex h-screen flex-col px-2 pb-8 pt-14 sm:px-4 md:flex-row">
		<div
			class="flex max-h-full w-full max-w-full flex-col rounded-t-md bg-zinc-800 md:max-w-52 md:rounded-l-md md:rounded-r-none lg:max-w-64"
		>
			<div class="flex border-b border-zinc-600 px-4 py-4 pb-8">
				<div class="flex flex-col">
					<div class="mb-1 text-base font-semibold">{fetchedUser.username}</div>
					<div class="text-sm text-zinc-300">Joined {fetchedUser.time_since}</div>
				</div>

				<div class="ml-auto">
					<MoreButtonUser />
				</div>
			</div>

			<div class="my-4 flex flex-row justify-between px-4 md:flex-col">
				<button
					class="flex justify-between rounded-md px-2 py-1 md:py-2 {view === 'vaults'
						? 'bg-zinc-700 hover:bg-zinc-700'
						: 'hover:bg-zinc-600'}"
					onclick={() => (view = 'vaults')}
				>
					<div class="flex items-center gap-4">
						<div class="hidden items-center justify-center text-lg md:visible md:flex">
							<i class="material-symbols--shield-outline"></i>
						</div>
						<div class="font-semibold">Vaults</div>
					</div>
					<div class="hidden text-sm text-zinc-300 md:block">{fetchedUser.vault_count}</div>
				</button>

				<button
					class="flex justify-between rounded-md px-2 py-1 md:py-2 {view === 'posts'
						? 'bg-zinc-700 hover:bg-zinc-700'
						: 'hover:bg-zinc-600'}"
					onclick={() => (view = 'posts')}
				>
					<div class="flex items-center gap-4">
						<div class="hidden items-center justify-center text-lg md:visible md:flex">
							<i class="material-symbols--lab-profile-outline"></i>
						</div>
						<div class="font-semibold">Posts</div>
					</div>
					<div class="hidden text-sm text-zinc-300 md:block">{fetchedUser.post_count}</div>
				</button>

				<button
					class="flex justify-between rounded-md px-2 py-1 md:py-2 {view === 'likedPosts'
						? 'bg-zinc-700 hover:bg-zinc-700'
						: 'hover:bg-zinc-600'}"
					onclick={() => (view = 'likedPosts')}
				>
					<div class="flex items-center gap-4">
						<div class="hidden items-center justify-center text-lg md:visible md:flex">
							<i class="material-symbols--thumb-up-outline-rounded"></i>
						</div>
						<div class="font-semibold">Liked Posts</div>
					</div>
					<div class="hidden text-sm text-zinc-300 md:block">{fetchedUser.liked_posts}</div>
				</button>

				<button
					class="flex justify-between rounded-md px-2 py-1 md:py-2 {view === 'comments'
						? 'bg-zinc-700 hover:bg-zinc-700'
						: 'hover:bg-zinc-600'}"
					onclick={() => (view = 'comments')}
				>
					<div class="flex items-center gap-4">
						<div class="hidden items-center justify-center text-lg md:visible md:flex">
							<i class="material-symbols--mode-comment-outline-rounded"></i>
						</div>
						<div class="font-semibold">Comments</div>
					</div>
					<div class="hidden text-sm text-zinc-300 md:block">{fetchedUser.comment_count}</div>
				</button>
			</div>
		</div>

		<div
			class="w-full rounded-b-md bg-zinc-900 px-2 py-4 sm:overflow-y-auto sm:px-4 md:max-h-full md:rounded-l-none md:rounded-r-md"
		>
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

<style>
	.material-symbols--shield-outline {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
	.material-symbols--mode-comment-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v15.575q0 .675-.612.938T20.3 20.3L18 18zm14.85-2L20 17.125V4H4v12zM4 16V4z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--lab-profile-outline {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8 12v-2h8v2zm0-4V6h8v2zm-2 6h7.5q.725 0 1.35.313t1.05.887l2.1 2.75V4H6zm0 6h11.05l-2.725-3.575q-.15-.2-.362-.312T13.5 16H6zm12 2H6q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22M6 20V4zm0-4v-2z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--thumb-up-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M21 8q.8 0 1.4.6T23 10v2q0 .175-.05.375t-.1.375l-3 7.05q-.225.5-.75.85T18 21H7V8l6-5.95q.375-.375.888-.437t.987.187t.7.7t.1.925L14.55 8zM9 8.85V19h9l3-7v-2h-9l1.35-5.5zM4 21q-.825 0-1.412-.587T2 19v-9q0-.825.588-1.412T4 8h3v2H4v9h3v2zm5-2V8.85z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
