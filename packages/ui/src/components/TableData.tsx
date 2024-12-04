import { ComponentProps, ReactNode, useRef, useState } from "react";
import { EnumSortType } from "@incutonez/ecommerce-spec";
import classNames from "classnames";
import { IconArrowDown } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { BasePagination } from "@/components/BasePagination.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ContextTableData, useTableDataContext } from "@/contexts.ts";
import { ContextPaginatedApi } from "@/hooks/api.ts";
import { ITableCell, ITableColumn, ITableColumnSort, ITableData } from "@/types/TableData.ts";
import { emptyFn, getValue, uniqueKey } from "@/utils.ts";

let tableCount = 1;

export function TableData<T>({ children, className, headerNodes, rowNodes, columns, data = [], clickRow = emptyFn, paginatedApi, loading }: ITableData<T>) {
	const [tableId] = useState(`table${tableCount++}`);
	let paginationNode: ReactNode;
	let loadingNode: ReactNode;
	const provider = {
		api: paginatedApi,
	};
	className = classNames("flex flex-col", className);

	function onClickRow(record: T, rowIdx: number) {
		clickRow({
			record,
			index: rowIdx,
		});
	}

	if (paginatedApi) {
		paginationNode = (
			<BasePagination	/>
		);
	}

	if (columns) {
		headerNodes = columns.map((column, colIdx) => {
			const colId = uniqueKey(tableId, `col${colIdx}`);
			return (
				<TableColumn
					key={colId}
					config={column}
				/>
			);
		});
		if (loading) {
			rowNodes = undefined;
			loadingNode = (
				<LoadingMask />
			);
		}
		else if (data) {
			rowNodes = data.map((record, rowIdx) => {
				const cellNodes: ReactNode[] = [];
				const rowId = uniqueKey(tableId, `row${rowIdx}`);
				columns.forEach(({ field, renderer, truncate, cellCls }, cellIdx) => {
					const colId = uniqueKey(rowId, `cell${cellIdx}`);
					let textNode: ReactNode;
					if (renderer) {
						textNode = renderer(record);
					}
					else if (field) {
						textNode = getValue(record, field);
					}
					cellNodes.push((
						<TableCell
							key={colId}
							truncate={truncate}
							className={cellCls}
						>
							{textNode}
						</TableCell>
					));
				});
				return (
					<TableRow
						key={rowId}
						onClick={() => onClickRow(record, rowIdx)}
					>
						{cellNodes}
					</TableRow>
				);
			});
		}
	}
	if (headerNodes) {
		headerNodes = (
			<TableHeader>
				{headerNodes}
			</TableHeader>
		);
	}
	if (rowNodes) {
		rowNodes = (
			<TableBody>
				{rowNodes}
			</TableBody>
		);
	}
	return (
		<ContextTableData.Provider value={provider}>
			<ContextPaginatedApi.Provider value={paginatedApi}>
				<article className={className}>
					<section className="flex-1 overflow-auto">
						<table className="w-full table-fixed border-separate border-spacing-0">
							{headerNodes}
							{rowNodes}
							{children}
						</table>
						{loadingNode}
					</section>
					{paginationNode}
				</article>
			</ContextPaginatedApi.Provider>
		</ContextTableData.Provider>
	);
}

/**
 * By adding a height of 1 to the row that contains the headers, we trick the table into using the minimum size of its
 * content.  Without this, the row would expand to whatever the percentage size it should take up, which gives us a bad
 * looking table if there's only 1 row of data.
 */
export function TableHeader({ children }: ComponentProps<"tr">) {
	return (
		<thead className="sticky top-0">
			<tr className="h-px border-b border-gray-300">
				{children}
			</tr>
		</thead>
	);
}

export function TableColumnSort({ direction }: ITableColumnSort) {
	if (direction === undefined) {
		return;
	}
	let left: ReactNode;
	let right: ReactNode;
	if (direction === EnumSortType.Asc) {
		left = <span>A</span>;
		right = <span>Z</span>;
	}
	else if (direction === EnumSortType.Desc) {
		left = <span>Z</span>;
		right = <span>A</span>;
	}
	return (
		<article className="flex items-start space-x-px text-xs">
			{left}
			<BaseIcon
				as={IconArrowDown}
				size="size-4"
			/>
			{right}
		</article>
	);
}

export function TableColumn({ children, config }: ITableColumn) {
	const sort = useRef<EnumSortType | undefined>();
	const { api } = useTableDataContext();

	function onClickColumn() {
		if (api && config.field) {
			if (sort.current === undefined) {
				sort.current = EnumSortType.Asc;
			}
			else if (sort.current === EnumSortType.Asc) {
				sort.current = EnumSortType.Desc;
			}
			else {
				sort.current = undefined;
			}
			if (sort.current === undefined) {
				api.setSorters([]);
			}
			else {
				api.setSorters([{
					field: config.field,
					direction: sort.current,
				}]);
			}
		}
	}

	/* Make sure we set the correct sort... this is if single sort is on, and another column was clicked to sort, then
	 * this column's sort will be erased, so we want to make sure we update it here */
	const found = api?.sorters.find((sorter) => sorter.field === config.field);
	if (found) {
		sort.current = found.direction;
	}
	else {
		sort.current = undefined;
	}

	return (
		<th
			className="min-w-max cursor-pointer border-b border-r border-gray-300 bg-gray-100 p-2 text-left text-sm font-bold uppercase last:border-r-0 hover:bg-blue-100"
			onClick={onClickColumn}
		>
			<div className="flex items-center justify-between">
				{config.title || children}
				<TableColumnSort direction={sort.current} />
			</div>
		</th>
	);
}

export function TableBody({ children }: ComponentProps<"tbody">) {
	return (
		<tbody>
			{children}
		</tbody>
	);
}

export function TableRow({ children, onClick }: ComponentProps<"tr">) {
	return (
		<tr
			className="cursor-pointer hover:bg-blue-100"
			onClick={onClick}
		>
			{children}
		</tr>
	);
}

export function TableCell({ children, text, truncate, className, ...attrs }: ITableCell) {
	className = classNames("border-r border-b border-gray-300 p-2 text-sm last:border-r-0", className);
	const wrapperCls = truncate ? "truncate" : "break-all";

	return (
		<td
			className={className}
			{...attrs}
		>
			<div className={wrapperCls}>
				{text || children}
			</div>
		</td>
	);
}
