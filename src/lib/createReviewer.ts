import { get } from 'svelte/store';
import type { Reviewer } from './Models/Reviewer';
import { addChatResponse } from './conversationStore';
import { addReviewer, reviewerCount, updateReviewer } from './reviewerStore';

export async function createReviewer(prompt: string) {
	const id = get(reviewerCount);
	const index = addReviewer({ id });

	const reviewer = await getReviewer(prompt);
	updateReviewer(index, reviewer);

	getReview(prompt, reviewer).then((review) => {
		updateReviewer(index, { review });
	});

	getReviewerPhoto(reviewer).then((imageUrl) => {
		updateReviewer(index, { imageUrl });
	});
}

async function getReviewer(prompt: string): Promise<Reviewer> {
	const response = await fetch('/api/reviewer', {
		method: 'POST',
		body: JSON.stringify({ prompt }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		console.log('Sadness all around.');
		throw new Error('Could not get Reviewer');
	} else {
		const data = await response.json();
		if (!data.reviewer) {
			console.warn('Output did not include reviewer:', data);
			throw new Error('Could not get Reviewer');
		}

		const reviewer = data.reviewer as Reviewer;
		addChatResponse(`${reviewer.name}. Working as ${reviewer.role} at ${reviewer.company}.`);
		return reviewer;
	}
}

async function getReviewerPhoto(reviewer: Reviewer) {
	const response = await fetch('/api/reviewer-avatar', {
		method: 'POST',
		body: JSON.stringify({ description: reviewer.physicalDescription, gender: reviewer.gender }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		console.log('Sadness all around.');
	} else {
		const data = await response.json();
		return data.image;
	}
}

async function getReview(prompt: string, reviewer: Reviewer): Promise<string> {
	// Send the GET request
	const response = await fetch('/api/review', {
		method: 'POST',
		body: JSON.stringify({ product: prompt, reviewer }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		console.log('Sadness all around.');
		throw new Error('Could not get review');
	} else {
		const data = await response.json();
		return data.review;
	}
}
