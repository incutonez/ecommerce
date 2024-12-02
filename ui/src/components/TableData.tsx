import { ComponentProps, ReactNode, useState } from "react";
import classNames from "classnames";
import { emptyFn, getValue, uniqueKey } from "@/utils.ts";

let tableCount = 1;

export interface ITableColumnProp<T = never> {
	title?: string;
	field?: string;
	cellCls?: string;
	renderer?: (record: T) => ReactNode;
}

export interface IEventRowClick<T = never> {
	record: T;
	index: number;
}

export type ITableData<T = never> = ComponentProps<"table"> & {
	headerNodes?: ReactNode;
	rowNodes?: ReactNode;
	columns?: ITableColumnProp<T>[];
	data?: T[];
	clickRow?: (props: IEventRowClick<T>) => void;
}

export type ITableColumn = ComponentProps<"th"> & {
	title?: string;
}

export type ITableCell = ComponentProps<"td"> & {
	text?: string | number;
}

export function TableData<T>({ children, headerNodes, rowNodes, columns, data = [], clickRow = emptyFn }: ITableData<T>) {
	const [tableId] = useState(`table${tableCount++}`);

	function onClickRow(record: T, rowIdx: number) {
		clickRow({
			record,
			index: rowIdx,
		});
	}

	if (columns) {
		headerNodes = columns.map((column, colIdx) => {
			const colId = uniqueKey(tableId, `col${colIdx}`);
			return (
				<TableColumn
					key={colId}
					title={column.title}
				/>
			);
		});
		if (data) {
			rowNodes = data.map((record, rowIdx) => {
				const cellNodes: ReactNode[] = [];
				const rowId = uniqueKey(tableId, `row${rowIdx}`);
				columns.forEach(({ field, renderer, cellCls }, cellIdx) => {
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
		<table>
			{headerNodes}
			{rowNodes}
			{children}
		</table>
	);
}

export function TableHeader({ children }: ComponentProps<"tr">) {
	return (
		<thead>
			<tr className="border-b border-gray-300">
				{children}
			</tr>
		</thead>
	);
}

export function TableColumn({ children, title }: ITableColumn) {
	return (
		<th className="cursor-pointer border-r border-gray-300 bg-gray-100 p-2 text-left text-sm font-bold uppercase last:border-0 hover:bg-blue-100">
			{title || children}
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
			className="cursor-pointer border-b border-gray-300 hover:bg-blue-100"
			onClick={onClick}
		>
			{children}
		</tr>
	);
}

export function TableCell({ children, text, className, ...attrs }: ITableCell) {
	className = classNames("border-r border-gray-300 p-2 text-sm truncate last:border-0", className);
	return (
		<td
			className={className}
			{...attrs}
		>
			{text || children}
		</td>
	);
}
