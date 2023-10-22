// import { SchemaDirectiveVisitor } from '@graphql-tools/schema';

// import { defaultFieldResolver } from 'graphql';

// class HasPermissionDirective extends SchemaDirectiveVisitor {
//     visitFieldDefinition(field) {
//         const { resolve = defaultFieldResolver } = field;
//         const requiredPermission = this.args.permission;

//         field.resolve = async function (...args) {
//             const [, , context] = args;

//             // Here you can check if the user in the context has the required permission.
//             // This is a simple example; you might have a more complex roles/permissions setup.
//             if (!context.user.permissions.includes(requiredPermission)) {
//                 throw new Error("You don't have permissions to perform this action.");
//             }

//             return resolve.apply(this, args);
//         };
//     }
// }


// export default HasPermissionDirective;