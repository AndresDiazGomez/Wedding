import type { Track } from './Track';

export interface VoteForTrackCommand {
	voterId: string;
	tracks: Track[];
}
