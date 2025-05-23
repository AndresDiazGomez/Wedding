import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VotingResultsProps } from './VotingResultsProps';
import type { TrackVotes } from './TrackVotes';

const VotingResults: React.FC<VotingResultsProps> = ({
	entries = [],
	onVote,
}) => {
	const merged = entries
		.map((e) => {
			return { votes: e.voters?.length ?? 0, track: e as TrackVotes };
		})
		.filter((item) => item !== null) as { votes: number; track: TrackVotes }[];

	merged.sort((a, b) => b.votes - a.votes);

	return (
		<div>
			<h2 className='text-xl font-bold mb-4'>Resultados de Votación</h2>
			<motion.ul layout className='space-y-4'>
				<AnimatePresence>
					{merged.map(({ track, votes }, index) => (
						<motion.li
							key={track.trackId}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
							className={`flex items-center ${
								index === 0 ? 'bg-green-100' : 'bg-white'
							} p-4 rounded shadow`}
						>
							<span className='w-6 text-lg font-bold mr-4'>{index + 1}</span>
							<img
								src={track.artworkUrl100}
								alt={track.trackName}
								className='w-24 h-24 mr-4'
							/>
							<div className='flex-grow'>
								<p className='font-semibold'>{track.trackName}</p>
								<p className='text-sm text-gray-600'>{track.artistName}</p>
								<p className='text-sm'>Votos: {votes}</p>
								{track.previewUrl && (
									<audio controls className='mt-2 w-full'>
										<source src={track.previewUrl} type='audio/mp4' />
										Your browser does not support the audio element.
									</audio>
								)}
							</div>
							<button
								onClick={() => onVote(track)}
								className='ml-4 p-2 bg-blue-500 text-white rounded cursor-pointer'
							>
								Votar
							</button>
						</motion.li>
					))}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
};

export default VotingResults;
