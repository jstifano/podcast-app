import { FC } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Podcast } from '../types/index'

const PodcastDescriptionCard: FC<Podcast> = ({ 
  image,
  title,
  author,
  description
}) => {

  const { podcastId } = useParams<{ podcastId: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const goToPodcastDetail = () => {
    if(location.pathname !== `/podcast/${podcastId}`) {
      navigate(-1)
    }
  }

  return (
    <aside className="flex flex-col justify-center items-center w-1/4 bg-white shadow-xl border border-gray mr-5 cursor-pointer" onClick={goToPodcastDetail}>
      <img src={image} alt={title} className="h-40 mt-4 w-40" />
      <div className="flex flex-col mt-4 border-b border-t border-gray-300 w-10/12">
        <h2 className="text-xl font-bold mt-3">{title}</h2>
        <p className="text-gray-700 text-md mb-3">By {author}</p>
      </div>
      <div className="flex flex-col mx-5 mb-4">
        <p className="mt-3">Description: </p>
        <p className="mt-2 text-xs italic">{description}</p>
      </div>
    </aside>
  )
}

export default PodcastDescriptionCard