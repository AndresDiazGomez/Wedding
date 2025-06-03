import React, { useRef, useState, useEffect } from 'react';
import type { Track } from './Track';

interface SongItemProps {
	track: Track;
	isEven: boolean;
	onPlay: (audio: HTMLAudioElement) => void;
	onVote: (track: Track) => void;
}

const ufoGreenColor = '#38e07b';
const strokeWidth = 1.5;

const SongItem: React.FC<SongItemProps> = ({
	track,
	isEven,
	onPlay,
	onVote,
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	// const [volume, setVolume] = useState(1);
	const [animate, setAnimate] = useState(false);

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

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) {
			return;
		}
		if (isPlaying) {
			audio.pause();
		} else {
			onPlay(audio);
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

	const voteHandler = () => {
		onVote(track);
		setAnimate(true);
	};

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
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill={animate ? ufoGreenColor : 'none'}
						viewBox='0 0 24 24'
						strokeWidth={strokeWidth}
						stroke={ufoGreenColor}
						className={`size-8 ml-auto my-4 ${
							animate ? 'animate-[shake_1s_ease-in-out]' : ''
						}`}
						onClick={voteHandler}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
						/>
					</svg>
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
