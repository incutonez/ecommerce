import { useSyncExternalStore } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { ProfileEntity } from "@incutonez/ecommerce-api/dist/models/profile.entity.ts";
import { AuthAPI, configuration } from "@/apiConfig.ts";
import { BaseStore } from "@/stores/BaseStore.ts";
import { CartTotalStore } from "@/stores/CartTotal.ts";

interface IUser {
	token: ProfileEntity;
	expired: boolean;
}

class User extends BaseStore<IUser> {
	snapshot = {} as IUser;

	async load() {
		this.abort();
		const { data } = await AuthAPI.getAccessToken({
			signal: this.apiController.signal,
		});
		const token = decodeToken<ProfileEntity>(data.accessToken);
		const expired = isExpired(data.accessToken);
		// Set this on the global configuration so all API calls get access to it
		configuration.baseOptions.headers.Authorization = `Bearer: ${data.accessToken}`;
		await CartTotalStore.loadCartCount();
		this.setSnapshot({
			token: token!,
			expired,
		});
	}
}

export const UserStore = new User();

export function useUserStore() {
	return useSyncExternalStore(UserStore.subscribe, UserStore.getSnapshot);
}
