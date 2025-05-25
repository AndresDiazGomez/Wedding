import React, { useEffect, useState, type FormEvent } from 'react';
import type { TrackVotes } from './Voting/TrackVotes';
import { getVotes } from './Voting/api';
import {
	startVotingHubConnection,
	stopVotingHubConnection,
} from './Voting/VotingHub';
import { SearchBar } from './Voting/SearchBar';
import type { Track } from './Voting/Track';
import SendVote from './Voting/SendVote';

const App: React.FC = () => {
	const [results, setResults] = useState<TrackVotes[]>([]);
	const [query, setQuery] = useState<string>('');
	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getVotes().then(setResults!);
	}, []);

	useEffect(() => {
		startVotingHubConnection(setResults);
		return () => stopVotingHubConnection();
	}, []);

	const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!query) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(
				`https://itunes.apple.com/search?term=${encodeURIComponent(
					query,
				)}&media=music&limit=6`,
			);
			const data: { results: Track[] } = await res.json();
			setTracks(data.results);
		} catch {
			setError('Error al buscar canciones');
		} finally {
			setLoading(false);
		}
	};

	const showResults = () => {
		if (tracks.length === 0) {
			return <></>;
		}
		return (
			<>
				<div className='flex px-4 py-3 justify-end'>
					<button
						onClick={() => setTracks([])}
						className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em]'
					>
						<span className='truncate'>Borrar resultados</span>
					</button>
				</div>
				<SendVote tracks={tracks} />
			</>
		);
	};

	console.log('results', results);

	return (
		<div className='relative flex size-full min-h-screen flex-col bg-[#141f18] overflow-x-hidden'>
			<div className='flex grow flex-col'>
				<div className='flex flex-1 justify-center py-5'>
					<div className='flex flex-col flex-1'>
						<SearchBar
							query={query}
							setQuery={setQuery}
							onSearch={handleSearch}
						/>

						{loading && <p>Cargando...</p>}
						{error && <p className='text-red-500'>{error}</p>}
						{showResults()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
