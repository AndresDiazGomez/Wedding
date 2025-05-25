import React, { useRef, useState, useEffect } from 'react';
import type { SongItemProps } from './SongItemProps';

const SongItem: React.FC<SongItemProps> = ({ track, isSelected, onToggle }) => {
	const handleToggle = () => onToggle(track);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const onLoaded = () => setDuration(audio.duration);
		const onTimeUpdate = () => setCurrentTime(audio.currentTime);
		const onEnded = () => {
			setIsPlaying(false);
			setCurrentTime(0);
		};

		audio.addEventListener('loadedmetadata', onLoaded);
		audio.addEventListener('timeupdate', onTimeUpdate);
		audio.addEventListener('ended', onEnded);

		return () => {
			audio.removeEventListener('loadedmetadata', onLoaded);
			audio.removeEventListener('timeupdate', onTimeUpdate);
			audio.removeEventListener('ended', onEnded);
		};
	}, []);

	const togglePlay = (e: React.MouseEvent) => {
		e.stopPropagation();
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		setIsPlaying(!isPlaying);
	};

	const seek = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		const vol = parseFloat(e.target.value);
		setVolume(vol);
		if (audioRef.current) audioRef.current.volume = vol;
	};

	const progressPercent = duration ? (currentTime / duration) * 100 : 0;

	return (
		<>
			<div
				className={`flex flex-col rounded-lg px-4 py-2 mb-2 cursor-pointer ${
					isSelected ? 'bg-[#FFA500]' : ''
				}`}
				onClick={handleToggle}
			>
				<div className='flex items-center gap-4 overflow-hidden'>
					{track.artworkUrl100 && (
						<img
							src={track.artworkUrl100}
							alt={track.trackName}
							className='flex-shrink-0 w-14 h-14 aspect-square rounded-lg'
						/>
					)}
					<div className='flex-1 min-w-0'>
						<p className='truncate whitespace-nowrap text-white text-base font-bold leading-tight'>
							{track.trackName}
						</p>
						<p className='truncate whitespace-nowrap text-white text-sm font-normal leading-normal'>
							{track.artistName}
						</p>
					</div>
					<button
						onClick={togglePlay}
						className='flex-shrink-0 flex items-center justify-center rounded-full w-10 h-10 bg-[#38e07b] text-[#122118]'
					>
						{isPlaying ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24px'
								height='24px'
								fill='currentColor'
								viewBox='0 0 256 256'
							>
								<path d='M200,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm0,176H160V48h40ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Zm0,176H56V48H96Z' />
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24px'
								height='24px'
								fill='currentColor'
								viewBox='0 0 256 256'
							>
								<path d='M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z' />
							</svg>
						)}
					</button>
				</div>

				{/* Progress Bar */}
				<div
					className='relative h-2 bg-gray-700 rounded-full w-full cursor-pointer mt-2'
					onClick={seek}
				>
					<div
						className='absolute top-0 left-0 h-full rounded-full'
						style={{ width: `${progressPercent}%`, backgroundColor: '#38e07b' }}
					/>
				</div>

				{/* Volume Control */}
				<input
					type='range'
					min={0}
					max={1}
					step={0.01}
					value={volume}
					onChange={handleVolumeChange}
					className='w-full h-2 mt-2 accent-[#FFFFFF]'
				/>

				<audio ref={audioRef} src={track.previewUrl} />
			</div>
		</>
	);
};

export default SongItem;
