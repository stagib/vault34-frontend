<script>
	let { tag } = $props();
</script>

<div class="flex items-center gap-2 rounded-xl bg-zinc-700 px-2 py-0.5">
	<div class="text-sm">{tag.name}</div>
	<div class="text-sm text-zinc-400">{tag.count}</div>
</div>
