<script>
	import MoreButtonUser from './MoreButtonUser.svelte';
	let { vault } = $props();
</script>

<div class="flex w-full flex-col">
	<a class="flex h-48 gap-1" href="/">
		<div class="h-full w-3/5 bg-zinc-400">
			{#if vault.posts[0]}
				<img class="h-full w-full object-cover" src={vault.posts[0].thumbnail} alt="" />
			{/if}
		</div>

		<div class="flex flex-1 flex-col gap-1">
			<div class="flex-1 overflow-hidden bg-zinc-400">
				{#if vault.posts[1]}
					<img class="h-full w-full object-cover" src={vault.posts[1].thumbnail} alt="" />
				{/if}
			</div>
			<div class="flex-1 overflow-hidden bg-zinc-400">
				{#if vault.posts[2]}
					<img class="h-full w-full object-cover" src={vault.posts[2].thumbnail} alt="" />
				{/if}
			</div>
		</div>
	</a>
	<div class="flex">
		<a class="flex w-full flex-col" href="/">
			<div class="font-semibold">{vault.title}</div>
			<div class="text-sm text-zinc-300">{vault.post_count} posts</div>
		</a>

		<div class="mt-2">
			<MoreButtonUser />
		</div>
	</div>
</div>
