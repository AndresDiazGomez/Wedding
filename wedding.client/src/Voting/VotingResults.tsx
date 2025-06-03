import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TrackVotes } from './TrackVotes';
import type { Track } from './Track';
import VotingResultItem from './VotingResultItem'; // Import the new component

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
								index === 0 ? 'bg-[#38e07b]' : ''
							}`}
						>
							<VotingResultItem
								key={track.trackId}
								track={track}
								position={index + 1}
								onVote={onVote}
							/>
						</motion.li>
					))}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
};

export default VotingResults;
