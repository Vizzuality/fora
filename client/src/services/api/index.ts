import axios from 'axios';
import Jsona from 'jsona';
import qs from 'query-string';

const dataFormatter = new Jsona();

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || process.env.STORYBOOK_API_URL}`,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: (data) => {
    try {
      const parsedData = JSON.parse(data);
      return {
        data: dataFormatter.deserialize(parsedData),
        meta: parsedData.meta,
      };
    } catch (error) {
      return data;
    }
  },
  paramsSerializer: (prms) => {
    return qs.stringify(prms, { arrayFormat: 'comma' });
  },
});

export default API;
