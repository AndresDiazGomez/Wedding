import React from 'react';
import type { SongItemProps } from './SongItemProps';

const SongItem: React.FC<SongItemProps> = ({ track, isSelected, onToggle }) => {
	const handleToggle = () => onToggle(track);
	const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

	return (
		<li className='mb-2 flex items-center w-full'>
			<div
				className={`p-2 flex flex-col sm:flex-row items-center justify-center cursor-pointer w-full rounded transition-colors duration-200 overflow-hidden max-w-full sm:max-w-2xl mx-auto ${
					isSelected
						? 'bg-blue-100 border-2 border-blue-400'
						: 'bg-white border border-gray-200'
				}`}
				onClick={handleToggle}
			>
				<img
					src={track.artworkUrl100}
					alt={track.trackName}
					className='w-24 h-24 mr-0 sm:mr-2 mb-2 sm:mb-0 flex-shrink-0 object-cover rounded'
				/>
				<div className='flex flex-col w-full min-w-0'>
					<p className='font-semibold truncate'>{track.trackName}</p>
					<p className='text-sm text-gray-600 truncate'>{track.artistName}</p>
					{track.previewUrl && (
						<audio controls className='mt-2 w-full' onClick={stopPropagation}>
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
