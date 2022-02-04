const axios = require('axios')
const {GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema} = require('graphql')


//Post Type
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLInt},
        title: { type: GraphQLString},
        body: { type: GraphQLString},
        userId: {type: GraphQLInt},
        user: { type: UserType,
                resolve: async (post) => {
                    const {data}= await axios.get('https://jsonplaceholder.typicode.com/users')
                    return data.find(user => user.id === post.userId)
                }
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: async (post) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/comments')
                return data.filter(comment => comment.postId === post.id)
            }
        }
    })

})

//User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt},
        name: { type: GraphQLString},
        username: { type: GraphQLString},
        email: { type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (user) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
                return data.filter(post => post.userId === user.id)
            }
        }
    })

})

//Comment Type
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: { type: GraphQLInt},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        body: { type: GraphQLString}
    })

})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (parent, args) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
                return data
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve: async (parent, args) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
                return data
            }
        },

        post: {
            type: PostType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
                return data.find(post => post.id === args.id)
            }
        },

        user: {
            type: UserType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
                return data.find(user => user.id === args.id)
            }
        }
    }
})

//Root Mutation
const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        createPost: {
            type: PostType,
            args: {
                userId: {type: new GraphQLNonNull(GraphQLInt)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                body: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                return axios.post('https://jsonplaceholder.typicode.com/posts', {
                    userId: args.userId,
                    title: args.title,
                    body: args.body
                }).then(res => res.data).then(msg => console.log(msg))
            }
        },
        
        deletePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                return axios.delete(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
            }
        },

        

    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})