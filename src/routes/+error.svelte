<script>
	import { page } from '$app/state';
</script>

<div class="mx-4 pb-4 pt-14">
	<div class="flex w-full flex-col">
		<div class="rounded-md border border-red-600 bg-red-400 px-4 py-1">
			<div class="flex items-center gap-2">
				<div class="break-words font-bold text-red-950">
					{page.error.code}
				</div>

				<div class="break-words font-semibold text-red-950">
					{page.error.message}
				</div>
			</div>
		</div>
	</div>
</div>
