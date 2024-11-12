import { FC, Fragment, ReactNode } from 'react';

interface ITableHeaderProps {
	cells: { title: string; node?: ReactNode }[];
}

const TableHeader: FC<ITableHeaderProps> = ({ cells }) => {
	return (
		<thead className='text-slate-50 uppercase'>
			<tr className='text-left bg-[#28323D]'>
				{cells.map((cell, index) => (
					<Fragment key={`${cell.title}-${index}`}>
						{cell.node ? cell.node : <th className='px-4 py-3'>{cell.title}</th>}
					</Fragment>
				))}
			</tr>
		</thead>
	);
};

export default TableHeader;
