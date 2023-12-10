import { derived, get, writable } from 'svelte/store';
import type { Reviewer } from './Models/Reviewer';

export const reviewerStore = writable<Reviewer[]>([]);

export const reviewerCount = derived(reviewerStore, ($reviewerStore) => {
	return $reviewerStore.length;
});

/**
 * Add a reviewer to the store.
 * @param r Reviewer to add
 * @returns Index of the added reviewer
 */
export function addReviewer(r: Reviewer): number {
	const current = get(reviewerStore);
	const newIndex = current.length;
	current.push(r);

	reviewerStore.set(current);

	return newIndex;
}

export function updateReviewer(index: number, data: Partial<Reviewer>) {
	reviewerStore.update((v) => {
		const current = v[index];
		if (!current) return v;
		Object.assign(current, data);
		return v;
	});
}
