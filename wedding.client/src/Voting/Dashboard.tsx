import React from 'react';
import SendVote from './SendVote';
import VotingResults from './VotingResults';
import type { TrackVotes } from './TrackVotes';
import { sendVotes } from './api';
import type { Track } from './Track';

const Dashboard: React.FC<{ entries: TrackVotes[] | undefined }> = ({
	entries = [],
}) => {
	const onVoteHandler = async (track: Track): Promise<void> => {
		if (!track) return;
		try {
			await sendVotes([track]);
		} catch {
			alert('Error al enviar el voto');
		}
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
					<VotingResults entries={entries} onVote={onVoteHandler} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
