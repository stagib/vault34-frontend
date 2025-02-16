<script>
	let { tag } = $props();
</script>

<div class="flex items-center gap-2 rounded-full bg-zinc-700 px-3 py-1 hover:bg-zinc-600">
	<div class="text-xs">{tag.name}</div>
	<div class="text-xs text-zinc-400">{tag.count}</div>
</div>
