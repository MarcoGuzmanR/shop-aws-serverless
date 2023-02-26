import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import products from '@mock/products.json';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = products.find(product => product.id === event.pathParameters.productId);

  if (!product) {
    return {
      statusCode: '404',
      message: `The product with the ID ${ product.id } does not exist`,
    };
  }

  return formatJSONResponse({
    product
  });
};

export const main = middyfy(getProductById);
