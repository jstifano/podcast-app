import { FC, createContext, useContext } from 'react';
import { PodcastContextProps, PodcastProviderProps } from '../types/index'

const PodcastContext = createContext<PodcastContextProps | undefined>(undefined);

export const usePodcast = (): PodcastContextProps => {
  const context = useContext(PodcastContext);
  if (!context) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context
}

export const PodcastProvider: FC<PodcastProviderProps> = ({ value, children }) => {
  return (
    <PodcastContext.Provider value={value}>
      {children}
    </PodcastContext.Provider>
  )
}