import React, { useEffect, useState, type FormEvent } from 'react';
import type { TrackVotes } from './Voting/TrackVotes';
import { getVotes, sendVotes } from './Voting/api';
import {
	startVotingHubConnection,
	stopVotingHubConnection,
} from './Voting/VotingHub';
import { SearchBar } from './Voting/SearchBar';
import type { Track } from './Voting/Track';
import SendVote from './Voting/SendVote';
import VotingResults from './Voting/VotingResults';

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

	const onVoteHandler = async (track: Track): Promise<void> => {
		if (!track) return;
		try {
			await sendVotes([track]);
		} catch {
			alert('Error al enviar el voto');
		}
	};

	return (
		<div className='flex flex-col w-full min-h-screen bg-[#141f18]'>
			<SearchBar
				query={query}
				setQuery={setQuery}
				onSearch={handleSearch}
				onClear={() => setTracks([])}
			/>
			{loading && (
				<p className='truncate text-white text-base font-bold leading-tight'>
					Cargando...
				</p>
			)}
			{error && <p className='text-red-500'>{error}</p>}
			{tracks.length > 0 && <SendVote tracks={tracks} onVoteSent={() => {}} />}
			<h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
				Canciones más votadas
			</h2>
			<VotingResults entries={results} onVote={onVoteHandler} />
		</div>
	);
};

export default App;
