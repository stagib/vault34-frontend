import { API_URL } from './config';

export function clickOutside(node, callback) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			callback?.();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export async function verifyToken(authToken) {
	if (!authToken) return null;

	try {
		const response = await fetch(`${API_URL}/verify-token`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Cookie: `auth_token=${authToken}` },
			credentials: 'include'
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		}

		return null;
	} catch (error) {
		return null;
	}
}

export function groupTags(tags) {
	const groupedTags = tags.reduce((acc, tag) => {
		return {
			...acc,
			[tag.type]: [...(acc[tag.type] || []), tag]
		};
	}, {});
	return groupedTags;
}

export function ungroupTags(tags) {
	return Object.values(tags).flat();
}
