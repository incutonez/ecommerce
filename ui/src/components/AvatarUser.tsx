import { ElementType, ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import { IconFaceFive, IconFaceFour, IconFaceOne, IconFaceSix, IconFaceThree, IconFaceTwo } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { RouteViewUser } from "@/routes.ts";

export const AvatarsRandom = [
	IconFaceOne,
	IconFaceTwo,
	IconFaceThree,
	IconFaceFour,
	IconFaceFive,
	IconFaceSix,
];

export interface IAvatarUser {
	random?: boolean;
	name?: string;
	icon?: ElementType;
	userId?: string;
}

export function AvatarUser({ random, name, icon, userId }: IAvatarUser) {
	const [index] = useState(random ? Math.floor(Math.random() * AvatarsRandom.length) : 0);
	icon ??= AvatarsRandom[index];
	let nameNode: ReactNode;
	if (name) {
		nameNode = (
			<span className="font-bold">
				{name}
			</span>
		);
	}
	if (userId) {
		nameNode = (
			<Link
				className="hover:text-sky-800"
				to={RouteViewUser}
				params={{
					userId,
				}}
			>
				{nameNode}
			</Link>
		);
	}
	return (
		<article className="flex items-center space-x-2">
			<section className="flex size-9 items-center justify-center rounded-full bg-gray-200">
				<BaseIcon as={icon} />
			</section>
			{nameNode}
		</article>
	);
}
