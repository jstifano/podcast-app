import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { usePodcast } from '@contexts/PodcastContext'
import { formatTextToHtml } from '@utils/helpers'

const EpisodeDetailPage: FC = () => {
  
  const { episodeId } = useParams<{ episodeId: string }>();
  const data = usePodcast();
  const episode = data.podcast.episodes.find(ep => ep.trackId.toString() === episodeId);

  return (
    episode ? 
      <>
        <h2 className="text-2xl font-bold mb-4">{episode?.trackName}</h2>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: formatTextToHtml(episode.description) }} />
        <audio controls className="w-full mt-4" role="audio">
          <source src={episode.episodeUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </>
    : null
  )
}

export default EpisodeDetailPage

