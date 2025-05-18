import type { Track } from './Track';

export interface SongItemProps {
	track: Track;
	isSelected: boolean;
	onToggle: (track: Track) => void;
}
