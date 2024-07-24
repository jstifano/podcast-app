import { create } from 'zustand'
import { FetchPodcast, Podcast, PodcastDetailStorage, PodcastState } from '../types/index'
import { getTopPodcasts, getPodcastDetail } from '../services/podcastService'
import { 
  deleteFromStorage,
  setDataToLocalStorage, 
  isGreaterOrEqualThan24Hours, 
  retrieveDatafromLocalStorage 
} from '../utils/utilities'

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
      
      // Recuperamos los podcast y la fecha que llamamos la ultima vez al API
      let podcastsFromLocalStorage: FetchPodcast | null = retrieveDatafromLocalStorage('fetchPodcast')
      
      // Si existe la info y no han pasado mas de 24 horas desde la ultima vez, tomamos esa informacion del localStorage
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
        // Si existe algo en localStorage de los podcasts, lo limpiamos
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

        // Si existe algo en localStorage de los podcasts, lo limpiamos
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
          console.error('Get Podcast Detail API threw an error')
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