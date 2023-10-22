import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { parse } from 'graphql';
import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/graphql-schema.js";



const mainFun = async () => {

  const app = express();
  app.use(cors());
  app.use(express.json());

  const getOperationPermission = (role, operationName, typeDefs) => {
    const parsedTypeDefs = parse(typeDefs);
    const permissionMapping = {};

    parsedTypeDefs.definitions.forEach(definition => {
      if (definition.kind === "ObjectTypeDefinition" && (definition.name.value === "Query" || definition.name.value === "Mutation")) {
        definition.fields.forEach(field => {
          const permissionDirective = field.directives.find(directive => directive.name.value === 'hasPermission');
          if (permissionDirective) {
            const permissionArg = permissionDirective.arguments.find(arg => arg.name.value === 'permission');
            const operation = `${definition.name.value}.${field.name.value}`;
            permissionMapping[operation] = permissionArg.value.value;
          }
        });
      }
    });

    // Form the correct operation name key for fetching from permissionMapping.
    const formattedOperationName = Object.keys(permissionMapping).find(key => key.toLowerCase().endsWith(operationName.toLowerCase()));

    // Check if the role has the required permission for the operation
    const requiredPermissions = permissionMapping[formattedOperationName];
    if (!requiredPermissions) {
        return { hasPermission: false, requiredPermissions: null };
    }

    const hasPermission = requiredPermissions.split("|").includes(role);

    return { hasPermission, requiredPermissions };
};



  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      console.log(req.headers)

      const operationName = req.body.operationName;

      // Retrieve the required permission for the operation
      const requiredPermission = getOperationPermission("admin" ,operationName, typeDefs);

    }
  })

  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );

}

mainFun();