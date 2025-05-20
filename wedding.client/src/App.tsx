import React, { useEffect, useState } from 'react';
import type { VotingEntry } from './Voting/VotingEntry';
import { getVotes } from './Voting/api';
import Dashboard from './Voting/Dashboard';
import {
	startVotingHubConnection,
	stopVotingHubConnection,
} from './Voting/VotingHub';

const App: React.FC = () => {
	const [results, setResults] = useState<VotingEntry[]>([]);

	useEffect(() => {
		getVotes().then(setResults!);
	}, []);

	useEffect(() => {
		startVotingHubConnection(setResults);
		return () => stopVotingHubConnection();
	}, []);

	return <Dashboard entries={results} />;
};

export default App;
