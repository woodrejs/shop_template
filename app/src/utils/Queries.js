import { gql } from "@apollo/client";

export const getProductsQuery = gql`
  query Products($limit: Int!) {
    products(limit: $limit) {
      _id
      name
      unit_amount
      category {
        name
      }
      images {
        url
      }
    }
  }
`;
export const getProductQuery = gql`
  query($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      unit_amount
      images {
        url
      }
    }
  }
`;
export const getProductInCartQuery = gql`
  query($id: ID!) {
    product(id: $id) {
      _id
      name
      images {
        url
      }
    }
  }
`;
