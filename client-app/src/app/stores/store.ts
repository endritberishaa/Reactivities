import { createContext, useContext } from "react";
import activityStore from "./activityStore";
import commonStore from "./commonStore";
import modalStore from "./modalStore";
import UserStore from "./UserStore";

interface Store {
    activityStore: activityStore;
    userStore: UserStore;
    commonStore: commonStore;
    modalStore: modalStore;
}

export const store: Store = {
    activityStore: new activityStore(),
    userStore: new UserStore(),
    commonStore: new commonStore(),
    modalStore: new modalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}