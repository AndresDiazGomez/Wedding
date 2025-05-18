import React, { useState, type FormEvent } from 'react';

import type { Track } from './Track';
import { SearchBar } from './SearchBar';
import { SelectedSongs } from './SelectedSongs';
import { SongList } from './SongList';

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
				)}&media=music&limit=5`,
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
		const ids: number[] = selected.map((t) => t.trackId);
		try {
			await fetch('https://api.tu-servidor.com/votos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ trackIds: ids }),
			});
			alert('Votos enviados con éxito');
			setSelected([]);
		} catch {
			alert('Error al enviar votos');
		}
	};

	return (
		<>
			<SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
			{loading && <p>Cargando...</p>}
			{error && <p className='text-red-500'>{error}</p>}
			<SongList tracks={tracks} selected={selected} onToggle={toggleSelect} />
			<SelectedSongs selected={selected} onRemove={removeSelected} />
			<button
				onClick={submitVotes}
				className='mt-4 w-full p-2 bg-green-500 text-white rounded'
			>
				Enviar Votos
			</button>
		</>
	);
};

export default SendVote;
