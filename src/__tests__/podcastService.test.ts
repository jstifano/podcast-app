import { getPodcastDetail, getTopPodcasts } from '@services/podcastService';

describe('getTopPodcasts', () => {
  it('Return the podcast list', async () => {
    const result = await getTopPodcasts();
    
    expect(result).toHaveLength(100); // Make sure the array returned has 100 elements in the list
  });
});

describe('getPodcastDetails', () => {
  it('Return podcast details by ID', async () => {
    const result = await getPodcastDetail('1594930776');
    
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('id', 1594930776);
    expect(result).toHaveProperty('title', "takin' a walk");
    expect(result).toHaveProperty('author', "iHeartPodcasts");
    expect(result).toHaveProperty('image', 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/0b/04/5b/0b045b4f-4fd2-d331-94a7-669d8516e488/mza_10498558085321973209.jpg/600x600bb.jpg');
    expect(result).toHaveProperty('description', undefined);
  });

  it('Return null if the podcast ID does not exist', async () => {
    const result = await getPodcastDetail('non-existent-id');
    
    expect(result).toBeNull();
  });
});