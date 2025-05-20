import {
	HubConnectionBuilder,
	HubConnection,
	LogLevel,
	HttpTransportType,
} from '@microsoft/signalr';
import type { VotingEntry } from './VotingEntry';
import type { TrackVote } from './TrackVote';
import type { Dispatch, SetStateAction } from 'react';

let connection: HubConnection | null = null;

export function startVotingHubConnection(
	onUpdate: Dispatch<SetStateAction<VotingEntry[]>>,
) {
	if (
		connection &&
		(connection.state === 'Connected' || connection.state === 'Connecting')
	) {
		return;
	}

	connection = new HubConnectionBuilder()
		.withUrl(import.meta.env.VITE_ROUTE_HUB_URL, {
			skipNegotiation: true,
			transport: HttpTransportType.WebSockets,
		})
		.configureLogging(LogLevel.Warning)
		.withAutomaticReconnect()
		.build();

	connection.on('ReceiveVotesOnUpdate', (update: TrackVote) => {
		onUpdate((previous) => {
			const updated = [...previous];
			for (const track of update.tracks) {
				const idx = updated.findIndex(
					(entry) => entry.trackId === track.trackId,
				);
				if (idx !== -1) {
					const entry = updated[idx];
					// if (!entry.voters.includes(update.voterId)) {
					updated[idx] = {
						...entry,
						voters: [...entry.voters, update.voterId],
					};
					// }
				} else {
					updated.push({ ...track, voters: [update.voterId] });
				}
			}
			return updated;
		});
	});

	connection.on('OnTrackRemoved', (trackId: number) => {
		onUpdate((previous) => {
			const updated = previous.filter((entry) => entry.trackId !== trackId);
			return updated;
		});
	});

	connection.start().catch(console.error);
}

export function stopVotingHubConnection() {
	if (connection) {
		connection.stop();
		connection = null;
	}
}
