import { FC, useEffect, useState } from 'react'
import usePodcastStore from '../store/usePodcastStore'
import { Outlet, useParams } from 'react-router-dom'
import { Podcast, PodcastDetailStorage, FetchPodcast } from '../types/index'
import { retrieveDatafromLocalStorage } from '../utils/utilities'
import PodcastDescriptionCard from '../components/PodcastDescriptionCard'
import { PodcastProvider } from '../contexts/PodcastContext'

const PodcastDetailPage: FC = () => {
  
  const { podcastId } = useParams<{ podcastId: string }>()
  const { podcasts, fetchPodcasts, getPodcastDetailById } = usePodcastStore()
  const [newPodcast, setNewPodcast] = useState<Podcast>({
    id: '',
    image: '',
    title: '',
    author: '',
    episodes: [], 
    description: ''
  })

  const getDescription = async () => {
    let allPodcastsFromStorage: (FetchPodcast | null) = retrieveDatafromLocalStorage('fetchPodcast')

    if (podcasts.length === 0 && !allPodcastsFromStorage) {
      await fetchPodcasts()
      allPodcastsFromStorage = retrieveDatafromLocalStorage('fetchPodcast')
    }

    if (podcastId) {
      let podcastFromStorage: (PodcastDetailStorage | null) = retrieveDatafromLocalStorage('podcastDetail')
      
      if (!podcastFromStorage) {
        await getPodcastDetailById(podcastId)
        podcastFromStorage = retrieveDatafromLocalStorage('podcastDetail')
        
        if (podcastFromStorage) {
          await setNewPodcast(podcastFromStorage[podcastId].detail)
        }
      } else {
       await setNewPodcast(podcastFromStorage[podcastId].detail)
      } 

      if (!newPodcast.id) {
        const podcastWithDescription = allPodcastsFromStorage?.podcasts.find(pc => pc.id === podcastId)
        if (podcastFromStorage && podcastWithDescription) {
          const detail: Podcast = podcastFromStorage[podcastId].detail
          setNewPodcast({
            ...detail, 
            description: podcastWithDescription? podcastWithDescription.description : ''
          })
        }
      }
    }
  }

  useEffect(() => {
    getDescription()
  }, [fetchPodcasts])

  return (
    newPodcast && newPodcast.description ? (
      <PodcastProvider value={{ podcast: newPodcast }}>
        <div className="flex container mx-auto p-4">
          <PodcastDescriptionCard 
            id={newPodcast?.id} 
            title={newPodcast?.title}
            image={newPodcast?.image}
            author={newPodcast?.author}
            description={newPodcast?.description}
            episodes={newPodcast?.episodes}
          />
          <main className="w-3/4 float-left">
            <Outlet />
          </main>
        </div>
      </PodcastProvider>
    ) : null
  )
};

export default PodcastDetailPage;