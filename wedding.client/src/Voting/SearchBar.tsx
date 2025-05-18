import React from 'react';
import type { SearchBarProps } from './SearchBarProps';

export const SearchBar: React.FC<SearchBarProps> = ({
	query,
	setQuery,
	onSearch,
}) => (
	<form onSubmit={onSearch} className='mb-4 flex'>
		<input
			type='text'
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			placeholder='Buscar canción...'
			className='flex-grow p-2 border rounded-l'
		/>
		<button type='submit' className='p-2 bg-blue-500 text-white rounded-r'>
			Buscar
		</button>
	</form>
);
