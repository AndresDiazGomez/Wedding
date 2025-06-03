import React, {
	type FormEvent,
	type Dispatch,
	type SetStateAction,
} from 'react';

interface SearchBarProps {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	onSearch: (e: FormEvent<HTMLFormElement>) => void;
	onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	query,
	setQuery,
	onSearch,
	onClear,
}) => {
	const handleClear = () => {
		setQuery('');
		if (onClear) {
			onClear();
		}
	};

	return (
		<div className='flex flex-col justify-center py-5'>
			<form onSubmit={onSearch} className='px-4'>
				<label className='flex flex-col min-w-40 h-12 w-full'>
					<div className='flex w-full flex-1 items-stretch rounded-xl h-full'>
						<div
							className='text-[#96c5a9] flex border-none bg-[#264532] items-center justify-center pl-4 rounded-l-xl border-r-0'
							data-icon='MagnifyingGlass'
							data-size='24px'
							data-weight='regular'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
								/>
							</svg>
						</div>
						<input
							type='text'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Busca por canción o artista'
							className='flex w-full text-white focus:outline-0 focus:ring-0 border-none bg-[#264532] focus:border-none h-full placeholder:text-[#96c5a9] pl-2 text-base font-normal leading-normal'
						/>
						{query && (
							<button
								type='button'
								onClick={handleClear}
								className='text-[#96c5a9] flex border-none bg-[#264532] items-center justify-center pr-4 rounded-r-xl border-l-0 cursor-pointer'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M6 18 18 6M6 6l12 12'
									/>
								</svg>
							</button>
						)}
					</div>
				</label>
			</form>
		</div>
	);
};
