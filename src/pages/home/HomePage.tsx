import { FC , useEffect} from 'react'
import PodcastCard from '@components/PodcastCard'
import usePodcastStore from '@store/usePodcastStore';

const HomePage: FC = () => {

  const { filteredPodcasts, error, searchTerm, fetchPodcasts, setSearchTerm } = usePodcastStore();

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  if (error) return <p>Error: {error}</p>

  return (
    <div className="flex flex-col container mx-auto p-4">
      <div className="flex justify-end mb-16 gap-4 items-center">
        <div className="flex items-center w-auto h-6 bg-sky-700 text-md font-bold text-white px-2 py-1 rounded-lg">
          {filteredPodcasts.length > 0 ? filteredPodcasts.length : 0}
        </div>
        <input
          type="text"
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;