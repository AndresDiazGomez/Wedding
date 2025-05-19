import type { Track } from './Track';
import type { VotingEntry } from './VotingEntry';

export interface VotingResultsProps {
	entries: VotingEntry[];
	onVote: (track: Track) => void;
}
