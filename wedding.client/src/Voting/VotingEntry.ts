import type { Track } from './Track';

export interface VotingEntry extends Track {
	voters: string[];
}
