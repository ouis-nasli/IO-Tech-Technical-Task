import { FC, Fragment, ReactNode } from 'react';
import { postStore } from 'src/modules/post/store/postStore';

export interface ITableCell {
	title: string;
	key: string;
	node?: ReactNode;
	sortable?: boolean;
	minWidth?: string;
}

interface ITableHeaderProps {
	cells: ITableCell[];
	sortKey: string;
	sortOrder: 'asc' | 'desc';
	onSort: (key: string) => void;
}

const TableHeader: FC<ITableHeaderProps> = ({ cells }) => {
	const { sortKey, sortOrder, setSortKey } = postStore();
	const getSortIcon = (key: string) => {
		if (key !== sortKey) return null;
		return sortOrder === 'asc' ? '▲' : '▼';
	};

	return (
		<thead className='text-slate-50 uppercase '>
			<tr className='text-left bg-[#28323D]'>
				{cells.map((cell, index) => (
					<Fragment key={`${cell.title}-${index}`}>
						{cell.sortable !== false ? (
							<th
								className={`px-4 py-3 cursor-pointer hover:text-blue-300 ${
									cell.minWidth ? cell.minWidth : 'min-w-28'
								}  `}
								onClick={() => setSortKey(cell.key)}
							>
								{cell.title} {getSortIcon(cell.key)}
							</th>
						) : (
							<th className={`px-4 py-3 ${cell.minWidth ? cell.minWidth : 'min-w-28'} `}>{cell.title}</th>
						)}
					</Fragment>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
