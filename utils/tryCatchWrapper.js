import { ApolloError } from 'apollo-server-express';


const tryCatchWrapper =
  (executable) =>
  async (...args) => {
    try {
      return executable(...args);
    } catch (error) {
      console.log(error);
      throw new ApolloError(error?.message, 400);
    }
  };

export default tryCatchWrapper;
