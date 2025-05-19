import {
	HubConnectionBuilder,
	HubConnection,
	LogLevel,
	HttpTransportType,
} from '@microsoft/signalr';
import type { VotingEntry } from './VotingEntry';

let connection: HubConnection | null = null;

export function startVotingHubConnection(
	onUpdate: (entries: VotingEntry[]) => void,
) {
	if (connection) return;
	connection = new HubConnectionBuilder()
		.withUrl('wss://localhost:7206/hubs/vote-feed', {
			skipNegotiation: true,
			transport: HttpTransportType.WebSockets,
		})
		.configureLogging(LogLevel.Warning)
		.withAutomaticReconnect()
		.build();

	connection.on('ReceiveVotesOnUpdate', (entries: VotingEntry[]) => {
		console.log('Received votes update:', entries);
		onUpdate(entries);
	});

	connection.start().catch(console.error);
}

export function stopVotingHubConnection() {
	if (connection) {
		connection.stop();
		connection = null;
	}
}
