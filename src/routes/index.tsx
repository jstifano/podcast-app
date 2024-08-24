import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/home/HomePage'
import PodcastDetailPage from '@pages/podcast-detail/PodcastDetailPage'
import EpisodeList from '@components/EpisodeList'
import EpisodeDetailPage from '@pages/episode-detail/EpisodeDetailPage'

const AppRoutes: FC = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetailPage />}>
          <Route index element={<EpisodeList />} />
          <Route path="episode/:episodeId" element={<EpisodeDetailPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;