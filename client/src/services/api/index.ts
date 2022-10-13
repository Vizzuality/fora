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
    const parsedParams = Object.keys(prms).reduce((acc, key) => {
      // Convert key to snake_case
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

      return {
        ...acc,
        [snakeKey]: prms[key],
      };
    }, {});
    return qs.stringify(parsedParams, { arrayFormat: 'comma' });
  },
});

export default API;
