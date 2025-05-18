import type { Track } from './Track';

export interface SongListProps {
	tracks: Track[];
	selected: Track[];
	onToggle: (track: Track) => void;
}
