import { useQuery } from 'react-query';
import { setWithExpiry } from './setToLocalStorage';

const API_BASE_URI = "https://api.vimeo.com";
const ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;

export function useFetchVideosByCategory(category: string) {
  const { data, isLoading, isError } = useQuery(['videos', category], async () => {
    const videos = localStorage.getItem('videos');
    const videosJSON = videos && JSON.parse(videos)
    if (videosJSON?.expiry && new Date().getTime() < videosJSON.expiry) { // Check if JSON is present and 'fresh' in local storage
        return videosJSON.value // Use cached response
    } else {
        const response = await fetch(`${API_BASE_URI}/categories/${category}/videos?per_page=24`, {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        
        const json = await response.json()
        setWithExpiry('videos', json) // Cache actual response in local storage
        return json;
    }
  });

  return { data, fetching: isLoading, error: isError ? 'Error fetching data' : null };
}
