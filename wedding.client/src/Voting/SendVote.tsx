import React, { useState, type FormEvent } from 'react';

import type { Track } from './Track';
import { SearchBar } from './SearchBar';
import { SelectedSongs } from './SelectedSongs';
import { SongList } from './SongList';
import { sendVotes } from './api';

export const SendVote: React.FC = () => {
	const [query, setQuery] = useState<string>('');
	const [tracks, setTracks] = useState<Track[]>([]);
	const [selected, setSelected] = useState<Track[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!query) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(
				`https://itunes.apple.com/search?term=${encodeURIComponent(
					query,
				)}&media=music&limit=10`,
			);
			const data: { results: Track[] } = await res.json();
			setTracks(data.results);
		} catch {
			setError('Error al buscar canciones');
		} finally {
			setLoading(false);
		}
	};

	const toggleSelect = (track: Track) => {
		setSelected((prev) =>
			prev.some((t) => t.trackId === track.trackId)
				? prev.filter((t) => t.trackId !== track.trackId)
				: [...prev, track],
		);
	};

	const removeSelected = (track: Track) => {
		setSelected((prev) => prev.filter((t) => t.trackId !== track.trackId));
	};

	const submitVotes = async () => {
		if (selected.length === 0) return;
		try {
			await sendVotes(selected);
			alert('Votos enviados con éxito');
			setSelected([]);
		} catch {
			alert('Error al enviar votos');
		}
	};

	const getSubmitSection = () => {
		if (selected.length === 0) {
			return <p className='text-gray-500'>No has seleccionado canciones</p>;
		}
		return (
			<>
				<SelectedSongs selected={selected} onRemove={removeSelected} />
				<button
					onClick={submitVotes}
					className='mt-4 w-full p-2 bg-green-500 text-white rounded cursor-pointer'
				>
					Enviar Votos
				</button>
			</>
		);
	};

	return (
		<>
			<SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
			{loading && <p>Cargando...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			<SongList tracks={tracks} selected={selected} onToggle={toggleSelect} />
			{getSubmitSection()}
		</>
	);
};

export default SendVote;
