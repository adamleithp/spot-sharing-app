import gql from 'graphql-tag'

export const SPOTS_QUERY = gql`
  query ItemsQuery {
    spots {
      id
      title
      content
    }
  }
`

export const SPOT = gql`
  mutation getSpot(
    $id: ID!,
  ) {
    getSpot(input: {
      id: $id,
    }) {
      id
      title
      content
    }
  }
`

export const SPOT_ADD = gql`
  mutation createSpot(
    $title: String!,
    $content: String!
  ) {
    createSpot(input: {
      title: $title,
      content: $content,
    }) {
      id
    }
  }
`

export const SPOT_REMOVE = gql`
  mutation removeSpot(
    $id: ID!,
  ) {
    removeSpot(input: {
      id: $id,
    }) {
      id
    }
  }
`
