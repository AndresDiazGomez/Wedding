import type { SelectedSongsProps } from './SelectedSongsProps';

export const SelectedSongs: React.FC<SelectedSongsProps> = ({
	selected,
	onRemove,
}) => (
	<div>
		<h2 className='text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>
			Canciones Seleccionadas
		</h2>
		<ul className='px-4'>
			{selected.map((track) => (
				<li
					key={track.trackId}
					className='flex items-center gap-4 mt-1 overflow-hidden'
				>
					{track.artworkUrl100 && (
						<img
							src={track.artworkUrl100}
							alt={track.trackName}
							className='w-14 h-14 aspect-square rounded-lg'
						/>
					)}
					<div className='flex-1 min-w-0'>
						<p className='truncate text-white text-base font-bold leading-tight'>
							{track.trackName}
						</p>
						<p className='truncate text-white text-sm font-normal leading-normal'>
							{track.artistName}
						</p>
					</div>
					<button
						onClick={() => onRemove(track)}
						className='text-white mr-2 cursor-pointer'
					>
						✕
					</button>
				</li>
			))}
		</ul>
	</div>
);
