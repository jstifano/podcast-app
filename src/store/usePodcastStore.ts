import { create } from 'zustand'
import { FetchPodcast, Podcast, PodcastDetailStorage, PodcastState } from '../types/index'
import { getTopPodcasts, getPodcastDetail } from '@services/podcastService'
import { 
  deleteFromStorage,
  setDataToLocalStorage, 
  isGreaterOrEqualThan24Hours, 
  retrieveDatafromLocalStorage 
} from '@utils/helpers'

// Creación de la tienda de Zustand
const usePodcastStore = create<PodcastState>((set) => ({
  currentPodcast: null,
  podcasts: [],
  filteredPodcasts: [],
  loading: true,
  error: null,
  trace: null,
  searchTerm: '',
  fetchPodcasts: async () => {
    try {
      set({ loading: true })
      
      // Recover the podcast and date that we call last time to the API
      let podcastsFromLocalStorage: FetchPodcast | null = retrieveDatafromLocalStorage('fetchPodcast')
      
      // If the info exists and has not elapsed more than 24 hours since the last time, we take that information from localStorage
      if (
        podcastsFromLocalStorage && 
        !isGreaterOrEqualThan24Hours(podcastsFromLocalStorage ? podcastsFromLocalStorage.date : null)
      ) {
        set({
          podcasts: podcastsFromLocalStorage.podcasts,
          filteredPodcasts: podcastsFromLocalStorage.podcasts,
          loading: false,
          error: null,
        })
      } else {
        // If something exists in localStorage about the podcast, we'll clean up
        if (podcastsFromLocalStorage) {
          deleteFromStorage('fetchPodcast')
        }

        const podcasts = await getTopPodcasts();
        
        setDataToLocalStorage('fetchPodcast', {
          podcasts: podcasts,
          date: new Date().getTime()
        })

        set({
          podcasts,
          filteredPodcasts: podcasts,
          loading: false,
          error: null,
        });
      }
    } catch (err: any) {
      set({
        loading: false,
        error: err.message,
        trace: err.stack
      })
    }
  },
  getPodcastDetailById: async (id: string) => {
    try {
      set({ loading: true })
      let podcastDetailFromStorage: PodcastDetailStorage | null = retrieveDatafromLocalStorage('podcastDetail')
      
      if (
        podcastDetailFromStorage &&
        podcastDetailFromStorage[id] &&
        !isGreaterOrEqualThan24Hours(podcastDetailFromStorage ? podcastDetailFromStorage[id].date : null)
      ) {
        set({
          currentPodcast: podcastDetailFromStorage[id].detail,
          loading: false,
          error: null,
        })
      } else {

        let copyOfLocalStorage = { ...podcastDetailFromStorage }
        delete copyOfLocalStorage[id]

        // If something exists in localStorage about the podcast, we'll clean up
        if (podcastDetailFromStorage) {
          deleteFromStorage('podcastDetail')
        }

        const detailFromApi: (Podcast | null) = await getPodcastDetail(id);
        
        if (detailFromApi) {
          copyOfLocalStorage[id] = {
            detail: detailFromApi,
            date: new Date().getTime()
          }

          setDataToLocalStorage('podcastDetail', copyOfLocalStorage)
  
          set({
            currentPodcast: detailFromApi,
            loading: false,
            error: null,
          });
        } else {
          throw new Error('An error has ocurred with Podcast Detail API')
        }
      }
    } catch (err: any) {
      set({
        loading: false,
        error: err.message,
        trace: err.stack
      })
    }
  },
  setSearchTerm: (term: string) => {
    set((state) => {
      const filtered = state.podcasts.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(term.toLowerCase()) ||
          podcast.author.toLowerCase().includes(term.toLowerCase())
      );
      return {
        searchTerm: term,
        filteredPodcasts: filtered,
      }
    })
  },
}))

export default usePodcastStore