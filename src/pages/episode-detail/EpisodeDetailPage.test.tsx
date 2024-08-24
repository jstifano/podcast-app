import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import EpisodeDetailPage from './EpisodeDetailPage';
import * as helpers from '@utils/helpers';
import { usePodcast } from '@contexts/PodcastContext'; 

// Mock del contexto usePodcast
jest.mock('@contexts/PodcastContext');

// Mock del helper formatTextToHtml
jest.mock('@utils/helpers', () => ({
  ...jest.requireActual('@utils/helpers'),
  formatTextToHtml: jest.fn((text) => text),
}));

const mockPodcast = {
  podcast: {
    episodes: [
      {
        trackId: 1,
        trackName: 'Episode 1',
        description: 'Description of Episode 1',
        episodeUrl: 'https://example.com/episode1.mp3',
      },
      {
        trackId: 2,
        trackName: 'Episode 2',
        description: 'Description of Episode 2',
        episodeUrl: 'https://example.com/episode2.mp3',
      },
    ],
  },
}

describe('EpisodeDetailPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render the episode details when episode is found', () => {
    (usePodcast as jest.Mock).mockReturnValueOnce(mockPodcast);
    
    // Arrange
    const episodeId = '1';

    // Act
    render(
      <MemoryRouter initialEntries={[`/episode/${episodeId}`]}>
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Description of Episode 1')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Episode 1');
    expect(screen.getByRole('audio')).toBeInTheDocument();
    expect(screen.getByRole('audio').querySelector('source')?.getAttribute('src')).toBe('https://example.com/episode1.mp3');
  });

  it('should not render anything when episode is not found', () => {
    (usePodcast as jest.Mock).mockReturnValueOnce(mockPodcast);

    // Arrange
    const episodeId = '3'; // ID que no existe en el mock

    // Act
    const { container } = render(
      <MemoryRouter initialEntries={[`/episode/${episodeId}`]}>
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(container.firstChild).toBeNull();
  });

  it('should correctly format the episode description using formatTextToHtml', () => {
    (usePodcast as jest.Mock).mockReturnValueOnce(mockPodcast);

    // Arrange
    const episodeId = '2';
    const formattedDescription = '<p>Formatted Description of Episode 2</p>';
    (helpers.formatTextToHtml as jest.Mock).mockReturnValue(formattedDescription);

    // Act
    render(
      <MemoryRouter initialEntries={[`/episode/${episodeId}`]}>
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(helpers.formatTextToHtml).toHaveBeenCalledWith('Description of Episode 2');
    expect(screen.getByText('Formatted Description of Episode 2')).toBeInTheDocument();
  });

  it('should render audio element with the correct source URL', () => {
    (usePodcast as jest.Mock).mockReturnValueOnce(mockPodcast);

    // Arrange
    const episodeId = '2';

    // Act
    render(
      <MemoryRouter initialEntries={[`/episode/${episodeId}`]}>
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    const audioElement = screen.getByRole('audio');
    expect(audioElement).toBeInTheDocument();
    const sourceElement = audioElement.querySelector('source');
    expect(sourceElement).toHaveAttribute('src', 'https://example.com/episode2.mp3');
    expect(sourceElement).toHaveAttribute('type', 'audio/mpeg');
  });

  it('should render correct heading and description even with an empty description', () => {
    (usePodcast as jest.Mock).mockReturnValueOnce(mockPodcast);

    // Arrange
    const episodeId = '2';
    mockPodcast.podcast.episodes[1].description = '';

    // Act
    render(
      <MemoryRouter initialEntries={[`/episode/${episodeId}`]}>
        <Routes>
          <Route path="/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
    expect(screen.queryByText('Formatted Description of Episode 2')).not.toBeInTheDocument();
  });
});