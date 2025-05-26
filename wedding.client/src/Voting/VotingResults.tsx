import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TrackVotes } from './TrackVotes';
import type { Track } from './Track';

interface VotingResultsProps {
	entries: TrackVotes[];
	onVote: (track: Track) => void;
}

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
			<motion.ul layout className='space-y-4'>
				<AnimatePresence>
					{merged.map(({ track }, index) => (
						<motion.li
							key={track.trackId}
							layout
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ type: 'spring', stiffness: 500, damping: 30 }}
							className={`flex-col px-4 py-2 mb-2 ${
								index === 0 ? 'bg-[#FFA500]' : ''
							}`}
						>
							<div className='flex items-center gap-4 overflow-hidden'>
								<span className='text-white text-base font-bold mr-4'>
									{index + 1}
								</span>
								{track.artworkUrl100 && (
									<img
										src={track.artworkUrl100}
										alt={track.trackName}
										className='w-14 h-14 aspect-square rounded-lg'
									/>
								)}
								<div className='flex-1 min-w-0'>
									<p className='truncate text-white text-base font-bold leading-tight'>
										{track.trackName}
									</p>
									<p className='truncate text-white text-sm font-normal leading-normal'>
										{track.artistName}
									</p>
								</div>
								<button
									onClick={() => onVote(track)}
									className='rounded-full h-10 px-4 bg-[#264532] text-white text-sm font-bold leading-normal tracking-[0.015em] border border-white'
								>
									Votar
								</button>
							</div>
						</motion.li>
					))}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
};

export default VotingResults;
