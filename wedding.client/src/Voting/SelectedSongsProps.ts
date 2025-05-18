import type { Track } from './Track';

export interface SelectedSongsProps {
	selected: Track[];
	onRemove: (track: Track) => void;
}
