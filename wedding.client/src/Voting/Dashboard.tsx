import React, { useEffect, useState } from 'react';
import SendVote from './SendVote';
import VotingResults from './VotingResults';
import type { VotingEntry } from './VotingEntry';
import { getVotes } from './api';

const Dashboard: React.FC = () => {
	const [results, setResults] = useState<VotingEntry[]>();

	useEffect(() => {
		getVotes().then(setResults!);
	}, []);

	const onVoteHandler = (trackId: number): void => {
		console.error(`No se encontró la canción con ID: ${trackId}`);
		//const entry = results.find((entry) => entry.trackId === trackId);
		//if (!entry) {
		//	return;
		//}
		//results.find((entry) => entry.trackId === trackId)!.votes++;
		//setResults([...results]);
	};

	return (
		<div className='mx-auto p-2'>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Vota por tu canción preferida
			</h1>
			<div className='flex flex-col md:flex-row gap-6'>
				<div className='w-full md:w-1/2'>
					<SendVote />
				</div>
				<div className='w-full md:w-1/2 bg-white rounded shadow p-4 mb-4 md:mb-0'>
					<VotingResults entries={results} onVote={onVoteHandler} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
