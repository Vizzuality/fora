import axios from 'axios';
// import Jsona from 'jsona';

// const dataFormatter = new Jsona();

const FUNDERS = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || process.env.STORYBOOK_API_URL}/posts`,
  headers: { 'Content-Type': 'application/json' },
  // transformResponse: (data) => {
  //   try {
  //     const parsedData = JSON.parse(data);
  //     return {
  //       data: dataFormatter.deserialize(parsedData),
  //       meta: parsedData.meta,
  //     };
  //   } catch (error) {
  //     return data;
  //   }
  // },
});

export default FUNDERS;
