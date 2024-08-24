import axios from 'axios';
import { Podcast, Episode} from '../types/index';

const BASE_URL = 'https://itunes.apple.com';
const API_ALL_ORIGINS = 'http://api.allorigins.win';

export const getTopPodcasts = async () => {
  const response = await axios.get(`${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
  return response.data.feed.entry.map((podcast: any) => ({
    id: podcast.id.attributes['im:id'],
    title: podcast.title.label,
    author: podcast['im:artist'].label,
    image: podcast['im:image'][2].label,
    description: podcast.summary.label,
  }));
}

export const getPodcastDetail = async (podcastId: string): Promise<Podcast | null> => {

  const response = await axios.get(
    `${API_ALL_ORIGINS}/get?url=${encodeURIComponent(`${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=2`)}`
  );

  if (response.data && response.data.status.http_code === 200 && response.statusText === 'OK') {
    const parsedResponse = JSON.parse(response.data.contents);
    let podcast = parsedResponse.results[0];
    
    const episodes = parsedResponse.results.slice(1).map((episode: Episode) => ({
      trackId: episode.trackId,
      trackName: episode.trackName,
      description: episode.description,
      releaseDate: episode.releaseDate,
      trackTimeMillis: episode.trackTimeMillis,
      episodeUrl: episode.episodeUrl
    }));

    return {
      id: podcast.collectionId,
      title: podcast.collectionName,
      author: podcast.artistName,
      image: podcast.artworkUrl600,
      description: podcast.description,
      episodes,
    };
  }
  return null;
}