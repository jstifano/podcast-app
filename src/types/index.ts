import { ReactNode } from 'react';

export interface PodcastState {
  currentPodcast: Podcast | null
  podcasts: Podcast[];
  filteredPodcasts: Podcast[];
  loading: boolean;
  error: string | null;
  trace: any | null;
  searchTerm: string;
  fetchPodcasts: () => void;
  getPodcastDetailById: (id: string) => void;
  setSearchTerm: (term: string) => void;
};

export interface Podcast {
  id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  episodes: Episode[]
};

export interface PodcastContextProps {
  podcast: Podcast
};

export interface Episode {
  trackId: string;
  trackName: string;
  description: string;
  releaseDate: string;
  trackTimeMillis: string;
  episodeUrl?: string;
};

export interface FetchPodcast {
  podcasts: Podcast[],
  date: number
};

export interface PodcastSaved {
  detail: Podcast,
  date: number
};

export interface PodcastDetailStorage {
  [key: string]: PodcastSaved; // The key is a string and the value is a number representing milliseconds
};

export interface HeaderProps {
  loading: boolean
};

export interface LoadingHandlerProps {
  setLoading: (loading: boolean) => void;
};

export interface PodcastProviderProps {
  value: PodcastContextProps;
  children: ReactNode;
};