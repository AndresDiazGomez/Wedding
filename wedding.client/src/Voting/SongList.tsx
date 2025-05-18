import SongItem from './SongItem';
import type { SongListProps } from './SongListProps';

export const SongList: React.FC<SongListProps> = ({
	tracks,
	selected,
	onToggle,
}) => (
	<ul>
		{tracks.map((track) => (
			<SongItem
				key={track.trackId}
				track={track}
				isSelected={selected.some((t) => t.trackId === track.trackId)}
				onToggle={onToggle}
			/>
		))}
	</ul>
);
