import type { Track } from './Track';
import type { VotingEntry } from './VotingEntry';

export async function getVotes(): Promise<VotingEntry[]> {
	const response = await fetch('api/votes');
	if (response.ok) {
		return await response.json();
	}
	return [];
}

export async function sendVotes(tracks: Track[]): Promise<void> {
	const response = await fetch('api/votes', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(tracks),
	});
	if (!response.ok) {
		throw new Error('Error al enviar los votos');
	}
}
