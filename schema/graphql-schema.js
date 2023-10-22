import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse, print } from 'graphql';
import checkPermission from '../utils/permission.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let types = '';

fs.readdirSync(__dirname).forEach((file) => {
  if (file.includes('.graphql')) {
    let fileContent = fs.readFileSync(path.join(__dirname, file), 'utf-8');

    const ast = parse(fileContent);

    for (const definition of ast.definitions) {
      if (definition.kind === "ObjectTypeDefinition" && (definition.name.value === "Query" || definition.name.value === "Mutation")) {
        for (const field of definition.fields) {
          const permission = checkPermission[definition.name.value][field.name.value];
          if (permission) {
            field.directives.push({
              kind: 'Directive',
              name: { kind: 'Name', value: 'hasPermission' },
              arguments: [{
                kind: 'Argument',
                name: { kind: 'Name', value: 'permission' },
                value: { kind: 'StringValue', value: permission }
              }]
            });
          }
        }
      }
    }

    fileContent = print(ast);
    types += `\n\n${fileContent}`;
  }
});

const typeDefs = types;

export default typeDefs;
