import React, { useEffect, useState } from 'react';
import type { VotingEntry } from './Voting/VotingEntry';
import { getVotes } from './Voting/api';
import {
	startVotingHubConnection,
	stopVotingHubConnection,
} from './Voting/votingHub';
import Dashboard from './Voting/Dashboard';

const App: React.FC = () => {
	const [results, setResults] = useState<VotingEntry[]>();

	useEffect(() => {
		getVotes().then(setResults!);
	}, []);

	useEffect(() => {
		startVotingHubConnection(setResults!);
		return () => stopVotingHubConnection();
	}, []);

	return <Dashboard entries={results} />;
};

export default App;
