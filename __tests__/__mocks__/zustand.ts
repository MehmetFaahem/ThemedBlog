const storeResetFns = new Set<() => void>();

const createMockStore = (createState: any) => {
  const store = {
    getState: () => store.state,
    setState: (partial: any) => {
      const nextState =
        typeof partial === "function" ? partial(store.state) : partial;
      store.state = { ...store.state, ...nextState };
      store.listeners.forEach((listener) => listener(store.state));
    },
    subscribe: (listener: (state: any) => void) => {
      store.listeners.add(listener);
      return () => store.listeners.delete(listener);
    },
    listeners: new Set<(state: any) => void>(),
    state: {},
  };

  store.state = createState((partial: any) => store.setState(partial));

  const resetFn = () => {
    store.state = createState((partial: any) => store.setState(partial));
  };

  storeResetFns.add(resetFn);

  return store;
};

// Reset all stores after each test run
afterEach(() => {
  storeResetFns.forEach((resetFn) => resetFn());
});

module.exports = {
  create: () => createMockStore,
};
