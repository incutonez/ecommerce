import { useContext } from "react";
import { IconNext, IconPrevious } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox } from "@/components/FieldComboBox.tsx";
import { PaginationOptions } from "@/constants.ts";
import { ContextPaginatedApi } from "@/hooks/api.ts";
import { useSelection } from "@/hooks/common.ts";
import { IOption } from "@/types.ts";

export function BasePagination() {
	const [selection, setSelection] = useSelection(PaginationOptions[1]);
	const { previousPage, nextPage, setLimit, lastPage, previousDisabled, nextDisabled, page, start, end, total, loading } = useContext(ContextPaginatedApi)!;

	function onClickPrevious() {
		previousPage();
	}

	function onClickNext() {
		nextPage();
	}

	function onChangeLimit(found?: IOption) {
		setSelection(found);
		if (found) {
			setLimit(found.id);
		}
	}

	return (
		<section className="sticky bottom-0 flex items-center justify-between bg-slate-700 px-4 py-2">
			<FieldComboBox
				disabled={loading}
				options={PaginationOptions}
				selection={selection}
				setSelection={onChangeLimit}
			/>
			<div className="flex items-center text-amber-500">
				<BaseButton
					icon={IconPrevious}
					disabled={previousDisabled || loading}
					onClick={onClickPrevious}
				/>
				<p className="px-2 text-sm font-semibold">
					Page
					{" "}
					{page}
					{" "}
					of
					{" "}
					{lastPage}
				</p>
				<BaseButton
					icon={IconNext}
					disabled={nextDisabled || loading}
					iconAfter
					onClick={onClickNext}
				/>
			</div>
			<span className="text-sm font-semibold text-amber-500">
				{start}
				{" "}
				-
				{" "}
				{end}
				{" "}
				of
				{" "}
				{total}
			</span>
		</section>
	);
}
