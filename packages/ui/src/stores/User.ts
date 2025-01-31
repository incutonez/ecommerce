import { useSyncExternalStore } from "react";
import { ProfileEntity } from "@incutonez/ecommerce-spec";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { AuthAPI, configuration } from "@/apiConfig.ts";
import { BaseStore } from "@/stores/BaseStore.ts";

interface IUser {
	token?: ProfileEntity;
	loading?: boolean;
}

const cookies = new Cookies(null, {
	path: "/",
});

class User extends BaseStore<IUser> {
	snapshot = {} as IUser;

	constructor() {
		super();
		const accessToken = cookies.get("accessToken");
		if (accessToken) {
			this.processAccessToken(accessToken, false);
			this.load();
		}
	}

	processAccessToken(accessToken = cookies.get<string | undefined>("accessToken"), setToken = true) {
		if (!accessToken) {
			return;
		}
		const token = jwtDecode<ProfileEntity>(accessToken);
		cookies.set("accessToken", accessToken);
		// Set this on the global configuration so all API calls get access to it
		configuration.baseOptions.headers.Authorization = `Bearer: ${accessToken}`;
		if (setToken) {
			this.setSnapshot({
				token: token!,
			});
		}
	}

	async login(username: string, password: string) {
		this.abort();
		const { data } = await AuthAPI.login({
			username,
			password,
		}, {
			signal: this.apiController.signal,
		});
		this.processAccessToken(data.accessToken);
	}

	async load() {
		this.abort();
		try {
			this.setSnapshot({
				loading: true,
			});
			await AuthAPI.getProfile({
				signal: this.apiController.signal,
			});
			this.processAccessToken();
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch (ex) {
			this.setSnapshot({});
			console.error("Login failed");
		}
	}
}

export const UserStore = new User();

export function useUserStore() {
	return useSyncExternalStore(UserStore.subscribe, UserStore.getSnapshot);
}
