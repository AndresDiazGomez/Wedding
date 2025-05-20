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

	const target = import.meta.env.ASPNETCORE_HTTPS_PORT
		? `wss://localhost:${import.meta.env.ASPNETCORE_HTTPS_PORT}`
		: import.meta.env.ASPNETCORE_URLS
		? import.meta.env.ASPNETCORE_URLS.split(';')[0]
		: 'wss://localhost:7206';

	connection = new HubConnectionBuilder()
		.withUrl(`${target}/hubs/vote-feed`, {
			skipNegotiation: true,
			transport: HttpTransportType.WebSockets,
		})
		.configureLogging(LogLevel.Warning)
		.withAutomaticReconnect()
		.build();

	connection.on('ReceiveVotesOnUpdate', (update: TrackVote) => {
		onUpdate((previous) => {
			const updated = [...previous];
			console.log('Before Updated votes:', updated);
			for (const track of update.tracks) {
				const idx = updated.findIndex(
					(entry) => entry.trackId === track.trackId,
				);
				if (idx !== -1) {
					const entry = updated[idx];
					if (!entry.voters.includes(update.voterId)) {
						updated[idx] = {
							...entry,
							voters: [...entry.voters, update.voterId],
						};
					}
				} else {
					updated.push({ ...track, voters: [update.voterId] });
				}
			}
			console.log('After Updated votes:', updated);
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
