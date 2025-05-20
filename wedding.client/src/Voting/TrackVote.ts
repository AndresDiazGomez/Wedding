import type { Track } from './Track';

export interface TrackVote {
	voterId: string;
	tracks: Track[];
}
