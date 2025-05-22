import React, { useEffect, useState } from 'react';
import type { TrackVotes } from './Voting/TrackVotes';
import { getVotes } from './Voting/api';
import Dashboard from './Voting/Dashboard';
import {
	startVotingHubConnection,
	stopVotingHubConnection,
} from './Voting/VotingHub';

const App: React.FC = () => {
	const [results, setResults] = useState<TrackVotes[]>([]);

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
