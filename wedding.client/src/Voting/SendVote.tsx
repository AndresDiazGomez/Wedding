import React, { useState } from 'react';

import type { Track } from './Track';
// import { SelectedSongs } from './SelectedSongs';
import { SongList } from './SongList';
// import { sendVotes } from './api';

export const SendVote: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
	const [selected, setSelected] = useState<Track[]>([]);

	const toggleSelect = (track: Track) => {
		setSelected((prev) =>
			prev.some((t) => t.trackId === track.trackId)
				? prev.filter((t) => t.trackId !== track.trackId)
				: [...prev, track],
		);
	};

	// const removeSelected = (track: Track) => {
	// 	setSelected((prev) => prev.filter((t) => t.trackId !== track.trackId));
	// };

	// const submitVotes = async () => {
	// 	if (selected.length === 0) return;
	// 	try {
	// 		await sendVotes(selected);
	// 		setSelected([]);
	// 	} catch {
	// 		alert('Error al enviar votos');
	// 	}
	// };

	// const getSubmitSection = () => {
	// 	if (selected.length === 0) {
	// 		return <p className='text-gray-500'>No has seleccionado canciones</p>;
	// 	}
	// 	return (
	// 		<>
	// 			<SelectedSongs selected={selected} onRemove={removeSelected} />
	// 			<button
	// 				onClick={submitVotes}
	// 				className='mt-4 w-full p-2 bg-green-500 text-white rounded cursor-pointer'
	// 			>
	// 				Votar
	// 			</button>
	// 		</>
	// 	);
	// };

	return (
		<>
			<h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
				Resultados de la búsqueda
			</h2>
			<SongList tracks={tracks} selected={selected} onToggle={toggleSelect} />
			{/*getSubmitSection()*/}
		</>
	);
};

export default SendVote;
