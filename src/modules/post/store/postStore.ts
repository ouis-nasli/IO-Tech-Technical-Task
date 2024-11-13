import { create } from 'zustand';

interface IPostStoreState {
	search: string;
	sortKey: string;
	sortOrder: 'asc' | 'desc';
	setSearch: (search: string) => void;
	setSortKey: (key: string) => void;
	setSortOrder: (order: 'asc' | 'desc') => void;
}

export const postStore = create<IPostStoreState>((set) => ({
	search: '',
	sortKey: 'id',
	sortOrder: 'asc',
	setSearch: (search) => set({ search }),
	setSortKey: (key) =>
		set((state) => ({
			sortKey: key,
			sortOrder: state.sortKey === key && state.sortOrder === 'asc' ? 'desc' : 'asc',
		})),
	setSortOrder: () =>
		set((state) => ({
			sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
		})),
}));
