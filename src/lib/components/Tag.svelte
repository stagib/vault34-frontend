<script>
	let { tag } = $props();
</script>

<div class="flex items-center gap-2 bg-zinc-700 px-2 py-1">
	<div class="text-xs">{tag.name}</div>
	<div class="text-xs text-zinc-400">{tag.count}</div>
</div>
