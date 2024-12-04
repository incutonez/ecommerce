import { useMemo, useRef, useState } from "react";
import { IconLogin } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog } from "@/components/BaseDialog.tsx";
import { FieldText } from "@/components/FieldText.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { UserStore, useUserStore } from "@/stores/User.ts";

export function LogIn() {
	const { loading } = useUserStore();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);
	const disableLogin = useMemo(() => !(username && inputRef.current?.validity.valid && password), [username, password, inputRef]);
	const footerSlot = (
		<BaseButton
			text="Log In"
			onClick={onClickLogIn}
			icon={IconLogin}
			disabled={disableLogin}
		/>
	);

	if (loading) {
		return <LoadingMask />;
	}

	async function onClickLogIn() {
		if (disableLogin) {
			return;
		}
		await UserStore.login(username, password);
	}

	return (
		<article className="size-full bg-slate-700">
			<BaseDialog
				show={show}
				closable={false}
				setShow={setShow}
				title="User Login"
				size="size-fit"
				bodyCls="space-y-2 m-2"
				footerSlot={footerSlot}
			>
				<FieldText
					inputRef={inputRef}
					setValue={setUsername}
					value={username}
					label="Email"
					align="left"
					separator=":"
					onEnter={onClickLogIn}
					inputAttrs={{
						type: "email",
					}}
					labelAttrs={{
						className: "w-24",
					}}
				/>
				<FieldText
					setValue={setPassword}
					value={password}
					label="Password"
					align="left"
					separator=":"
					onEnter={onClickLogIn}
					inputAttrs={{
						type: "password",
					}}
					labelAttrs={{
						className: "w-24",
					}}
				/>
			</BaseDialog>
		</article>
	);
}
