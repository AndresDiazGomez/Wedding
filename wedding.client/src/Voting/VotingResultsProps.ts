import type { VotingEntry } from './VotingEntry';

export interface VotingResultsProps {
	entries: VotingEntry[] | undefined;
	onVote: (trackId: number) => void;
}
