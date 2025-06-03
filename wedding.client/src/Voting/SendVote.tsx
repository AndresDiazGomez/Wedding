import React, { useRef } from 'react';
import type { Track } from './Track';
import { sendVotes } from './api';
import SongItem from './SongItem';

export const SendVote: React.FC<{
	tracks: Track[];
	onVoteSent: () => void;
}> = ({ tracks, onVoteSent }) => {
	const currentlyPlayingAudioRef = useRef<HTMLAudioElement | null>(null);

	const handleSongPlay = (audio: HTMLAudioElement) => {
		if (
			currentlyPlayingAudioRef.current &&
			currentlyPlayingAudioRef.current !== audio
		) {
			currentlyPlayingAudioRef.current.pause();
		}
		currentlyPlayingAudioRef.current = audio;
	};

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
					onPlay={handleSongPlay}
					onVote={submitVotes}
				/>
			))}
		</>
	);
};

export default SendVote;
