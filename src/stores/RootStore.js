import { makeAutoObservable } from "mobx";

class RootStore {
    testValue = 0

    constructor() {
        makeAutoObservable(this)
    }

    setValue = (value) => {
        this.testValue = value
    }
}
export default new RootStore()