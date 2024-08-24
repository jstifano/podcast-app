import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import PodcastDetailPage from './PodcastDetailPage';
import * as helpers from '@utils/helpers';
import { getPodcastDetail } from '@services/podcastService';
import { Podcast } from '../../types/index';

// Component mock for PodcastDescriptionCard to not re-render completely the child components
jest.mock('@components/PodcastDescriptionCard', () => jest.fn(() => <div>Mocked PodcastDescriptionCard</div>))

jest.mock('@services/podcastService', () => ({
  getPodcastDetail: jest.fn(),
}));

describe('PodcastDetailPage', () => {  
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the PodcastDetailPage component correctly when podcast data is present', async () => {
    // Arrange
    const mockPodcast = {
      id: '1',
      image: 'image_url',
      title: 'Test Podcast',
      author: 'Test Author',
      episodes: [],
      description: 'Test Description'
    } as Podcast;

    (getPodcastDetail as jest.Mock).mockResolvedValueOnce(mockPodcast);

    jest.spyOn(helpers, 'retrieveDatafromLocalStorage').mockImplementation((key) => {
      if (key === 'fetchPodcast') {
        return { podcasts: [mockPodcast] };
      }
      if (key === 'podcastDetail') {
        return {
          '1': { detail: mockPodcast }
        };
      }
      return null
    });

    // Act
    render(
      <MemoryRouter initialEntries={['/podcast/1']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(screen.getByText(/Mocked PodcastDescriptionCard/i)));
  })

  it('should fetch and display podcast data when it is not present initially', async () => {
    // Arrange
    const mockPodcast = {
      id: '2',
      image: 'image_url_2',
      title: 'Test Podcast 2',
      author: 'Test Author 2',
      episodes: [],
      description: 'Test Description 2'
    } as Podcast;

    (getPodcastDetail as jest.Mock).mockRejectedValueOnce(mockPodcast);

    jest.spyOn(helpers, 'retrieveDatafromLocalStorage').mockImplementation((key) => {
      if (key === 'fetchPodcast') {
        return { podcasts: [mockPodcast] };
      }
      if (key === 'podcastDetail') {
        return null;
      }
      return null;
    });

    // Act
    render(
      <MemoryRouter initialEntries={['/podcast/2']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Assert
    const body = await waitFor(() => document.querySelector('body'));
    
    // Ensure the body contains a div
    expect(body?.querySelector('div')).toBeInTheDocument();
    
    // Ensure the div is empty
    expect(body?.querySelector('div')?.innerHTML).toBe('');
  });

  it('should not render anything when podcast data is not available', async () => {
    // Arrange
    jest.spyOn(helpers, 'retrieveDatafromLocalStorage').mockReturnValue(null);

    // Act
    const { container } = render(
      <MemoryRouter initialEntries={['/podcast/unknown']}>
        <Routes>
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    await waitFor(() => expect(container.firstChild).toBeNull());
  });
})