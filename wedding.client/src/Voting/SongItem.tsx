import React from 'react';
import type { SongItemProps } from './SongItemProps';

const SongItem: React.FC<SongItemProps> = ({ track, isSelected, onToggle }) => {
	const handleToggle = () => onToggle(track);
	const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<li className='mb-2 flex items-center'>
			<div
				className='flex items-center cursor-pointer w-full'
				onClick={handleToggle}
			>
				<input
					type='checkbox'
					checked={isSelected}
					onChange={() => handleToggle}
					className='mr-2'
				/>
				<img
					src={track.artworkUrl100}
					alt={track.trackName}
					className='w-24 h-24 mr-2'
				/>
				<div className='flex flex-col'>
					<p className='font-semibold'>{track.trackName}</p>
					<p className='text-sm text-gray-600'>{track.artistName}</p>
					{track.previewUrl && (
						<audio controls className='mt-2' onClick={stopPropagation}>
							<source src={track.previewUrl} type='audio/mp4' />
							Your browser does not support the audio element.
						</audio>
					)}
				</div>
			</div>
		</li>
	);
};

export default SongItem;
