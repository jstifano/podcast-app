import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FetchPodcast } from '../../types/index';
import { getTopPodcasts } from '@services/podcastService';

import HomePage from './HomePage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@services/podcastService', () => ({
  getTopPodcasts: jest.fn(),
}));

const mockPodcastsData = [
  {
    id: '1',
    title: 'React',
    author: 'Zywoo',
    image: 'https://placehold.co/600x400',
    description: 'Podcast description',
  },
] as FetchPodcast['podcasts'];

describe('HomePage', () => {
  describe('Render home page and filter podcasts by', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('title', async () => {
      (getTopPodcasts as jest.Mock).mockResolvedValueOnce(mockPodcastsData);

      render(<HomePage />);
  
      const input = screen.getByPlaceholderText(/filter podcasts.../i);
  
      userEvent.type(input, mockPodcastsData[0].title);
  
      await waitFor(() =>
        screen.getByText(new RegExp(`author: ${mockPodcastsData[0].author}`, 'i'))
      );
    });
  
    it('author', async () => {
      (getTopPodcasts as jest.Mock).mockResolvedValueOnce(mockPodcastsData);

      render(<HomePage />);
  
      const input = screen.getByPlaceholderText(/filter podcasts.../i);
  
      userEvent.type(input, mockPodcastsData[0].author);
  
      await waitFor(() =>
        screen.getByText(new RegExp(`author: ${mockPodcastsData[0].author}`, 'i'))
      );
    });
  })

});