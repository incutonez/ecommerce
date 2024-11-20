import { ElementType, useState } from "react";
import { IconFaceFive, IconFaceFour, IconFaceOne, IconFaceSix, IconFaceThree, IconFaceTwo } from "@/assets/icons.tsx";
import { BaseIcon } from "@/components/BaseIcon.tsx";

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
}

export function AvatarUser({ random, name, icon }: IAvatarUser) {
	const [index] = useState(random ? Math.floor(Math.random() * AvatarsRandom.length) : 0);
	icon ??= AvatarsRandom[index];
	const nameNode = name
		? (
			<span>
				{name}
			</span>
		)
		: "";
	return (
		<article className="flex items-center space-x-2">
			<section className="flex size-9 items-center justify-center rounded-full bg-gray-200">
				<BaseIcon as={icon} />
			</section>
			{nameNode}
		</article>
	);
}
