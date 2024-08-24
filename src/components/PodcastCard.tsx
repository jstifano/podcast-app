import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import usePodcastStore from '@store/usePodcastStore'
import { Podcast } from '../types/index'

interface PodcastCardProps {
  podcast: Podcast
}

const PodcastCard: FC<PodcastCardProps> = ({ podcast }) => {
  const { getPodcastDetailById } = usePodcastStore()
  const navigate = useNavigate()

  const goToPodcastDetailPage = async () => {
    await getPodcastDetailById(podcast.id)
    navigate(`podcast/${podcast.id}`)
  }

  const getAuthor = (author: string) => {
    const text = author.split('-')
    if(author.split('-').length > 1) {
      return text[0]
    }
    return text
  }

  return (
    <div 
      style={{'height': '-webkit-fill-available'}}
      className="flex flex-col transform transition duration-300 hover:scale-105 relative w-full mb-28 cursor-pointer"
      onClick={goToPodcastDetailPage}
    >
      <div className="z-[2]">
        <img src={podcast.image} alt={podcast.title} className="w-40 h-40 rounded-full mx-auto object-cover border border-black-100 mb-2"/>
        <h3 className="text-sm font-bold mb-1 text-center">{podcast.title.split('-')[0].toUpperCase()}</h3>
        <p className="text-gray-600 text-center text-xs">Author: {getAuthor(podcast.author)}</p>
      </div>

      <div className="absolute flex flex-col justify-end items-center bg-white shadow-lg p-4 h-40 top-24 border border-gray-200 z-[1] w-full"/>
    </div>
  )
}

export default PodcastCard;