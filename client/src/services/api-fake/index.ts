import axios from 'axios';

const API_FAKE = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL_FAKE || process.env.STORYBOOK_API_URL_FAKE}`,
  headers: { 'Content-Type': 'application/json' },
});

export default API_FAKE;
