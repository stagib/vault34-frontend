<script>
	import { API_URL } from '$lib/config';
	import MoreButtonComment from './MoreButtonComment.svelte';

	let { comment, postId, user } = $props();

	let likes = $state(comment.likes);
	let dislikes = $state(comment.dislikes);
	let userReaction = $state(comment.user_reaction);

	async function reactToComment(type) {
		if (type === userReaction) {
			type = 'none';
		}

		try {
			const response = await fetch(`${API_URL}/posts/${postId}/comments/${comment.id}/reactions`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type }),
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				likes = data.likes;
				dislikes = data.dislikes;
				userReaction = data.type;
			}
		} catch (error) {
			throw error;
		}
	}
</script>

<div class="mb-6">
	<div class="flex items-center gap-1 pl-1">
		<a class="text-sm font-semibold" href={`/user/${comment.user.username}`}
			>{comment.user.username}</a
		>
		<div class="text-xs text-zinc-300">{comment.time_since}</div>
	</div>
	<div class="mb-3 break-words pl-1 text-sm">{comment.content}</div>

	<div class="flex gap-1 pl-1">
		<div class="text group relative flex bg-zinc-700">
			<button
				class="flex items-center justify-center border-r border-zinc-600 p-1 px-2 text-base hover:bg-zinc-600"
				aria-label="like-button"
				onclick={() => reactToComment('like')}
			>
				{#if userReaction === 'like'}
					<i class="material-symbols--thumb-up-rounded"></i>
				{:else}
					<i class="material-symbols--thumb-up-outline-rounded"></i>
				{/if}
				{#if likes}
					<div class="ml-2 text-xs">{likes}</div>
				{/if}
			</button>

			<button
				class="flex items-center justify-center p-1 px-2 text-base hover:bg-zinc-600"
				aria-label="dislike-button"
				onclick={() => reactToComment('dislike')}
			>
				{#if userReaction === 'dislike'}
					<i class="material-symbols--thumb-down-rounded"></i>
				{:else}
					<i class="material-symbols--thumb-down-outline-rounded"></i>
				{/if}
				{#if dislikes}
					<div class="ml-2 text-xs">{dislikes}</div>
				{/if}
			</button>
		</div>

		<MoreButtonComment {user} {comment} />
	</div>
</div>

<style>
	.material-symbols--thumb-down-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.037-.375t.113-.375l3-7.05q.225-.5.75-.85T6 3h8q.825 0 1.413.587T16 5v10.175q0 .4-.162.763t-.438.637l-5.425 5.4q-.375.35-.887.425t-.988-.175t-.687-.7t-.088-.925L8.45 16zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16t-1.412-.587T18 14V5q0-.825.588-1.412T20 3'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--thumb-down-outline-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M3 16q-.8 0-1.4-.6T1 14v-2q0-.175.05-.375t.1-.375l3-7.05q.225-.5.75-.85T6 3h11v13l-6 5.95q-.375.375-.888.438t-.987-.188t-.7-.7t-.1-.925L9.45 16zm12-.85V5H6l-3 7v2h9l-1.35 5.5zM20 3q.825 0 1.413.588T22 5v9q0 .825-.587 1.413T20 16h-3v-2h3V5h-3V3zm-5 2v10.15z'/%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}

	.material-symbols--thumb-up-rounded {
		display: inline-block;
		width: 1em;
		height: 1em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M21 8q.8 0 1.4.6T23 10v2q0 .175-.038.375t-.112.375l-3 7.05q-.225.5-.75.85T18 21h-8q-.825 0-1.412-.587T8 19V8.825q0-.4.163-.762t.437-.638l5.425-5.4q.375-.35.888-.425t.987.175t.688.7t.087.925L15.55 8zM4 21q-.825 0-1.412-.587T2 19v-9q0-.825.588-1.412T4 8t1.413.588T6 10v9q0 .825-.587 1.413T4 21'/%3E%3C/svg%3E");
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
