import React from 'react';
import type { Track } from './Track';
import { sendVotes } from './api';
import SongItem from './SongItem';

export const SendVote: React.FC<{
	tracks: Track[];
	onVoteSent: () => void;
}> = ({ tracks, onVoteSent }) => {
	const submitVotes = async (track: Track) => {
		if (!track) return;
		try {
			await sendVotes([track]);
			onVoteSent();
		} catch {
			alert('Error al enviar votos');
		}
	};

	return (
		<>
			<h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
				Resultados de la búsqueda
			</h2>
			{tracks.map((track, index) => (
				<SongItem
					key={track.trackId}
					track={track}
					isEven={index % 2 === 0}
					onVote={submitVotes}
				/>
			))}
		</>
	);
};

export default SendVote;
