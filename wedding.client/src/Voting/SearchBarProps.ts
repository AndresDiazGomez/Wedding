import type { FormEvent, Dispatch, SetStateAction } from 'react';

export interface SearchBarProps {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
	onSearch: (e: FormEvent<HTMLFormElement>) => void;
}
