const graphql = require('graphql');
let Books = require('../Data');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;



// create a model type e.g book / author
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        }
    })
});



// create a root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args)
            {
                //return book by id
                let objIndex = Books.findIndex(obj => obj.id == args.id);
                return Books[objIndex];
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args)
            {
                // return all books
                return Books;
            }
        }

    }
});

//create mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        CreateBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                author: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args)
            {

                let book = {
                    id: args.id,
                    title: args.title,
                    author: args.author
                };

                Books = [...Books, book];
                return book;
            }
        },
        UpdateBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                title: {
                    type: GraphQLString
                },
                author: {
                    type: GraphQLString
                }
            },
            resolve(parent, args)
            {

                let objIndex = Books.findIndex(obj => obj.id == args.id);

                Books[objIndex] = {
                    id: args.id,
                    title: args.title || Books[objIndex].title,
                    author: args.author || Books[objIndex].author
                }




                return Books[objIndex];

            }
        },
        DeleteBook: {
            type: BookType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args)
            {

                for (let i = 0; i < Books.length; i++) {
                    if (Books[i].id == args.id) {
                        let removedItem = Books.splice(i, 1);
                        return removedItem[0];
                    }
                }

            }
        },

    }
});


// export graphql as GraphSchema
exports.GraphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,

})

// export updated Books data as Data
exports.Data = Books;