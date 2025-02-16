<script>
	import MoreButtonVault from './MoreButtonVault.svelte';
	let { vault, user } = $props();
</script>

<div class="flex aspect-[16/9] w-full flex-col">
	<a class="relative flex h-full gap-1" href={`/vault/${vault.id}`}>
		{#if vault.privacy === 'private'}
			<div class="absolute left-2 top-2">
				<div
					class="flex items-center justify-center rounded-full border border-zinc-600 bg-zinc-700 p-2"
				>
					<i class="material-symbols--lock"></i>
				</div>
			</div>
		{/if}

		<div class="h-full w-3/5 bg-zinc-800">
			{#if vault.posts[0]}
				<img class="h-full w-full object-cover" src={vault.posts[0].thumbnail} alt="" />
			{/if}
		</div>

		<div class="flex flex-1 flex-col gap-1">
			<div class="flex-1 overflow-hidden bg-zinc-800">
				{#if vault.posts[1]}
					<img class="h-full w-full object-cover" src={vault.posts[1].thumbnail} alt="" />
				{/if}
			</div>
			<div class="flex-1 overflow-hidden bg-zinc-800">
				{#if vault.posts[2]}
					<img class="h-full w-full object-cover" src={vault.posts[2].thumbnail} alt="" />
				{/if}
			</div>
		</div>
	</a>
	<div class="mt-1 flex">
		<a class="flex w-full flex-col" href={`/vault/${vault.id}`}>
			<div class="font-semibold">{vault.title}</div>
			<div class="text-sm text-zinc-300">{vault.post_count} posts</div>
		</a>
		{#if user && user.id === vault.user.id}
			<div class="mt-1">
				<MoreButtonVault {user} {vault} />
			</div>
		{/if}
	</div>
</div>

<style>
	.material-symbols--lock {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
</style>
