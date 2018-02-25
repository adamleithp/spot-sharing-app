const { GraphQLServer } = require('graphql-yoga')
const shortid = require('shortid')

const fakeSpots = [
  {
    title: 'Montreal',
    id: 753,
    content: 'zaasd!',
    cordinates: {
      lat: -34.397, lng: 150.644,
    }
  },
  {
    title: 'Dubai',
    id: 2341,
    content: 'teasdsast!',
    cordinates: {
      lat: -34.307, lng: 150.644,
    }
  },
  {
    title: 'Test place number 3',
    id: 12321,
    content: 'tezxzcxst!',
    cordinates: {
      lat: -34.207, lng: 150.444,
    }
  },
]

// const processAdd = async spotObj => {
//   console.log('processAdd spotObj', spotObj);
//   // const { stream, filename, mimetype, encoding } = await upload
//
//   // const { id, path } = await storeUpload({ stream, filename })
//   // return recordFile({ id, filename, mimetype, encoding, path })
// }


const typeDefs = `
  input GetSpotInput {
    id: ID!
  }

  input SpotInput {
    title: String!
    content: String!
  }

  input SpotDeleteInput {
    id: ID!
  }

  type Query {
    spots: [Spot!]!
  }

  type Spot {
    id: ID!
    title: String
    content: String
  }

  type Mutation {
    getSpot(input: GetSpotInput): Spot
    createSpot(input: SpotInput): Spot
    removeSpot(input: SpotDeleteInput): Spot
  }
`



// const spots = []
let idCount = 0;

const resolvers = {
  Query: {
    spots: () => fakeSpots,
  },
  Mutation: {
    getSpot: (parent, args) => {
      const spot = {
        id: args.input.id,
      }

      let index = fakeSpots.findIndex(x => x.id == spot.id);
      return fakeSpots[index]
    },

    createSpot: (parent, args) => {
      const spot = {
        id: `spot_${shortid.generate()}`,
        title: args.input.title,
        content: args.input.content,
        published: false,
      }

      fakeSpots.push(spot)
      return spot
    },

    removeSpot: (parent, args) => {
      const spot = {
        id: args.input.id
      }

      let index = fakeSpots.findIndex(x => x.id == spot.id);

      fakeSpots.splice(index, 1);
      return spot
    },
  },
}


//
//
// mutation {
//   createSpot(
//     title: "graphql-yoga is awesome",
//     content: "It really is!"
//   ) {
//     name
//   }
// }
//

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))
