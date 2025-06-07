import React, { useRef, useState, useEffect } from 'react';
import type { Track } from './Track';
import VoteIcon from './VoteIcon';
import { MusicDispatcher } from './MusicDispatcher';

// Create a shared dispatcher instance (if not already created elsewhere)
const musicDispatcher = new MusicDispatcher();
const ufoGreenColor = '#38e07b';
const strokeWidth = 1.5;

interface SongItemProps {
	track: Track;
	isEven: boolean;
	onVote: (track: Track) => void;
}

const SongItem: React.FC<SongItemProps> = ({ track, isEven, onVote }) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [animate, setAnimate] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	// const [volume, setVolume] = useState(1);

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

	useEffect(() => {
		// Subscribe to the dispatcher on mount
		const unsubscribe = musicDispatcher.subscribe(() => {
			if (audioRef.current && isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			}
		});
		return () => {
			unsubscribe();
		};
	}, [isPlaying]);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}
		if (isPlaying) {
			audio.pause();
		} else {
			musicDispatcher.playNewSong(); // Notify other components that a new song is being played
			audio.play();
		}
		setIsPlaying(!isPlaying);
	};

	const seek = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;
		if (audioRef.current) {
			audioRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const voteHandler = () => {
		if (animate) {
			return;
		}
		onVote(track);
		setAnimate(true);
	};

	// const setAudioVolume = (vol: number) => {
	// 	setVolume(vol);
	// 	if (audioRef.current) {
	// 		audioRef.current.volume = vol;
	// 	}
	// };

	// const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const vol = parseFloat(e.target.value);
	// 	setAudioVolume(vol);
	// };

	const progressPercent = duration ? (currentTime / duration) * 100 : 0;

	return (
		<>
			<div
				className={`flex flex-col px-4 py-2 mb-2 cursor-pointer ${
					isEven ? 'bg-[#b3b3b3]/15' : ''
				}`}
			>
				<div className='flex items-center gap-4 overflow-hidden'>
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
						onClick={togglePlay}
						className='flex-shrink-0 flex items-center justify-center text-[#122118]'
					>
						{isPlaying ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={strokeWidth}
								stroke={ufoGreenColor}
								className='size-8 ml-auto my-4'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.75 5.25v13.5m-7.5-13.5v13.5'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={strokeWidth}
								stroke={ufoGreenColor}
								className='size-8 ml-auto my-4'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
								/>
							</svg>
						)}
					</button>
					<VoteIcon
						strokeColor={ufoGreenColor}
						strokeWidth={strokeWidth}
						shouldFill={animate}
						onVote={voteHandler}
					/>
				</div>

				{/* Progress Bar */}
				<div
					className='relative h-2 bg-gray-700 rounded-full w-full cursor-pointer mt-2'
					onClick={seek}
				>
					<div
						className='absolute top-0 left-0 h-full rounded-full'
						style={{
							width: `${progressPercent}%`,
							backgroundColor: ufoGreenColor,
						}}
					/>
				</div>

				{/* Volume Control */}
				{/* <div className='flex flex-row items-center mt-1 w-full sm:w-[200px]'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24px'
						height='24px'
						fill='#FFFFFF'
						viewBox='0 0 24 24'
						onClick={() => setAudioVolume(0)}
					>
						<path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.06c1.5-.74 2.5-2.26 2.5-4.03zm2.5 0c0 2.53-1.61 4.71-4 5.42v2.02c3.31-.77 6-3.85 6-7.44s-2.69-6.67-6-7.44v2.02c2.39.71 4 2.89 4 5.42z' />
					</svg>
					<input
						type='range'
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={handleVolumeChange}
						className='w-full h-2 ms-2 accent-[#FFFFFF]'
					/>
				</div> */}

				<audio ref={audioRef} src={track.previewUrl} />
			</div>
		</>
	);
};

export default SongItem;
