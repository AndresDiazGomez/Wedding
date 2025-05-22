import type { Track } from './Track';
import type { TrackVotes } from './TrackVotes';

export interface VotingResultsProps {
	entries: TrackVotes[];
	onVote: (track: Track) => void;
}
