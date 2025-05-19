import type { SelectedSongsProps } from './SelectedSongsProps';

export const SelectedSongs: React.FC<SelectedSongsProps> = ({
	selected,
	onRemove,
}) => (
	<div className='mt-6'>
		<h2 className='text-lg font-bold mb-2'>Canciones Seleccionadas</h2>
		{selected.length === 0 ? (
			<p className='text-gray-600'>No has seleccionado ninguna canción.</p>
		) : (
			<ul>
				{selected.map((track) => (
					<li key={track.trackId} className='mb-2 flex items-center'>
						<button
							onClick={() => onRemove(track)}
							className='text-red-500 mr-2 cursor-pointer'
						>
							✕
						</button>
						<img
							src={track.artworkUrl100}
							alt={track.trackName}
							className='w-24 h-24 mr-2'
						/>
						<div>
							<p className='font-semibold'>{track.trackName}</p>
							<p className='text-sm text-gray-600'>{track.artistName}</p>
						</div>
					</li>
				))}
			</ul>
		)}
	</div>
);
