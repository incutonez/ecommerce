import { useContext } from "react";
import { IconNext, IconPrevious } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox, IOption } from "@/components/FieldComboBox.tsx";
import { ContextPaginatedApi } from "@/hooks/api.ts";

const options: IOption[] = [{
	id: 10,
	name: "10",
}, {
	id: 20,
	name: "20",
}, {
	id: 50,
	name: "50",
}, {
	id: 100,
	name: "100",
}];

export function BasePagination() {
	const { previousPage, nextPage, setLimit, lastPage, previousDisabled, nextDisabled, page, start, end, total, loading } = useContext(ContextPaginatedApi)!;

	function onClickPrevious() {
		previousPage();
	}

	function onClickNext() {
		nextPage();
	}

	function onChangeLimit(found?: IOption) {
		if (found) {
			setLimit(found.id);
		}
	}

	return (
		<section className="sticky bottom-0 flex items-center justify-between bg-slate-700 px-4 py-2">
			<FieldComboBox
				disabled={loading}
				options={options}
				onSelectionChange={onChangeLimit}
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
