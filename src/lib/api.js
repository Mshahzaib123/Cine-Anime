import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL, JIKAN_BASE_URL } from './api-config';

// TMDB Image Base URLs
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = '/w500';
export const BACKDROP_SIZE = '/original';

// Helper function to get full image URL
export const getImageUrl = (path, size = POSTER_SIZE) => {
  if (!path) return '/images/ratio-1-1-size-200-200.jpg'; // Fallback image
  return `${TMDB_IMAGE_BASE}${size}${path}`;
};

// Fetch trending content (movies, TV shows, or all)
export const fetchTrending = async (mediaType = 'all', timeWindow = 'week') => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    throw error;
  }
};

// Fetch popular content
export const fetchPopular = async (mediaType = 'movie', page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/popular`,
      {
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular:', error);
    throw error;
  }
};

// Fetch now playing / airing
export const fetchNowPlaying = async (mediaType = 'movie') => {
  try {
    const endpoint = mediaType === 'movie' ? 'now_playing' : 'on_the_air';
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/${endpoint}`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching now playing:', error);
    throw error;
  }
};

// Fetch details for specific content
export const fetchDetails = async (id, mediaType = 'movie') => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/${id}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: 'credits,videos,similar',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};

// Search content
export const searchContent = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/multi`,
      {
        params: {
          api_key: TMDB_API_KEY,
          query,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
};

// Fetch by genre
export const fetchByGenre = async (genreId, mediaType = 'movie', page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/discover/${mediaType}`,
      {
        params: {
          api_key: TMDB_API_KEY,
          with_genres: genreId,
          page,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching by genre:', error);
    throw error;
  }
};

// Fetch genres list
export const fetchGenres = async (mediaType = 'movie') => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/genre/${mediaType}/list`,
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Fetch anime from Jikan API (MyAnimeList)
export const fetchAnime = async (type = 'top', page = 1) => {
  try {
    const response = await axios.get(`${JIKAN_BASE_URL}/anime`, {
      params: {
        page,
        limit: 20,
        order_by: 'popularity',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
};

// Fetch top rated
export const fetchTopRated = async (mediaType = 'movie', page = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/${mediaType}/top_rated`,
      {
        params: {
          api_key: TMDB_API_KEY,
          page,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated:', error);
    throw error;
  }
};