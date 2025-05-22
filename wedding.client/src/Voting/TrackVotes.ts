import type { Track } from './Track';

export interface TrackVotes extends Track {
	voters: string[];
}
