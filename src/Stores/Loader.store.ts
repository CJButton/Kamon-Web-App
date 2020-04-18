import create from 'zustand'

export const [useLoaderStore] = create(set => ({
  loader: false,
  loaderOn: () => set({ loader: true }),
  loaderOff: () => set({ loader: false }),
}));
