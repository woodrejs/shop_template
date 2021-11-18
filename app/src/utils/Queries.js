import { gql } from "@apollo/client";

export const getProductsQuery = gql`
  query($limit: Int!) {
    products(limit: $limit) {
      _id
      name
      unit_amount
      categories {
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
export const getCategoriesQuery = gql`
  query {
    categories {
      name
      _id
    }
  }
`;
/*
export const getCategoryQuery = gql`
  query($id: ID!) {
    category(id: $id) {
      name
      products {
        name
      }
    }
  }
`;
*/
