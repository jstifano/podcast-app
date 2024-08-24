import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Episode } from '../types/index'
import { convertMillisecondsToDuration } from '@utils/helpers'
import { usePodcast } from '@contexts/PodcastContext'

const EpisodeList: FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>()
  const data = usePodcast()

  return (
    <>
      <div className="flex justify-start items-center bg-white shadow-xl border border-gray mb-5 p-3">
        <h2 className="text-2xl font-bold">Episodes: { data.podcast.episodes.length }</h2>
      </div>
      <div className="px-4 pt-6 bg-white border border-gray-200 shadow-xl">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-black-600 font-bold">Title</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-black-600 font-bold">Date</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-black-600 font-bold">Duration</th>
            </tr>
          </thead>
          <tbody>
            {
              data.podcast.episodes.map((episode: Episode, idx: number) => (
                <tr key={`episode-${episode.trackId}`} className={(idx === 0 || idx%2 === 0) ? 'bg-gray-100' : ''}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`} className="text-blue-500 hover:underline">
                      {episode.trackName}
                    </Link>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(episode.releaseDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{convertMillisecondsToDuration(episode.trackTimeMillis)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default EpisodeList
