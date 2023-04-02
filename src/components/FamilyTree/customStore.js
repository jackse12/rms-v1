import createStore from "./createStore";


export default function customStore(initial_state) {
    const createStore = createStore(initial_state)

    return createStore
}
