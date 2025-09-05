import React, { useState } from 'react';
import type { TrackVotes } from './TrackVotes';
import type { Track } from './Track';
import VoteIcon from './VoteIcon';

interface VotingResultItemProps {
	track: TrackVotes;
	position: number;
	onVote: (track: Track) => void;
}

const VotingResultItem: React.FC<VotingResultItemProps> = ({
	track,
	position,
	onVote,
}) => {
	const [animate, setAnimate] = useState(false);

	const voteHandler = () => {
		// TODO
		if (animate) {
			return;
		}
		onVote(track);
		setAnimate(true);
	};

	return (
		<div className='flex items-center gap-4 overflow-hidden'>
			<span className='text-white text-base font-bold mr-4'>{position}</span>
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
			<VoteIcon
				strokeColor='#ffffff'
				strokeWidth={1.5}
				shouldFill={animate}
				onVote={voteHandler}
			/>
		</div>
	);
};

export default VotingResultItem;
