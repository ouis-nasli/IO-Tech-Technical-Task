import { create } from 'zustand';

interface IPostStoreState {
	sortKey: string;
	sortOrder: 'asc' | 'desc';
	setSortKey: (key: string) => void;
	setSortOrder: (order: 'asc' | 'desc') => void;
}

export const postStore = create<IPostStoreState>((set) => ({
	sortKey: 'id',
	sortOrder: 'asc',
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
