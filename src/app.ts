// import express, { Request, Response, Application, NextFunction } from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { routerUsers, routerGroups, routerAuth } from './api';
// import { sequelize } from './data-access';
// import { groupSchema, userSchema, userGroupSchema } from './data-models';
// import { notFoundMessage, startServerMessage, statusCode } from './constants';
// import { Logger } from '../config';
// import { checkTokenAccess, morganMiddleware } from './middlewares';

// const app: Application = express();
// const port: number | string = process.env.PORT ?? 5000;

// // Logger
// app.use(morganMiddleware);

// // Body parser
// app.use(bodyParser.json());

// // CORS
// app.use(cors());

// // Routes
// app.use('/api/auth', routerAuth);
// app.use('/api/users', checkTokenAccess, routerUsers);
// app.use('/api/groups', checkTokenAccess, routerGroups);

// // Error Handling
// app.use((req: Request, res: Response): void => {
//   res.status(statusCode.NOT_FOUND).json({
//     message: notFoundMessage,
//   });
// });

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   Logger.error(
//     `Method: ${req.method} / Arguments: ${JSON.stringify(req.query)} / Error: ${
//       err.message
//     }`,
//   );

//   res.status(statusCode.INTERNAL_SERVER_ERROR).json({
//     message: err.message,
//     stack: err.stack,
//   });
// });

// process
//   .on('unhandledRejection', (reason, p) => {
//     Logger.error(`${reason} Unhandled Rejection at Promise ${p}`);
//   })
//   .on('uncaughtException', err => {
//     Logger.error(`${err} Uncaught Exception thrown`);
//     process.exit(1);
//   });

// const startServer = async () => {
//   await sequelize.authenticate();
//   await userSchema.sync();
//   await groupSchema.sync();
//   await userGroupSchema.sync();
// };

// startServer()
//   .then(() => {
//     userSchema.belongsToMany(groupSchema, {
//       through: userGroupSchema,
//       foreignKey: 'userId',
//     });

//     groupSchema.belongsToMany(userSchema, {
//       through: userGroupSchema,
//       foreignKey: 'groupId',
//     });

//     app.listen(port, () => {
//       Logger.debug(startServerMessage(port, process.env.HOST_NAME));
//     });
//   })
//   .catch(err => Logger.error(err));

// function getUniqSubstrings(symbols: string[]): Set<string> {
//   let substring = '';
//   const uniqSubstrings = new Set<string>();

//   symbols.forEach((symbol, idx) => {
//     if (!substring.includes(symbol)) {
//       substring += symbol;

//       if (idx === symbols.length - 1) {
//         uniqSubstrings.add(substring);
//       }
//     } else {
//       uniqSubstrings.add(substring);
//       substring = symbol;
//     }
//   });

//   return uniqSubstrings;
// }

// function lengthOfLongestSubstring(s: string): number {
//   const symbols = Array.from(s);

//   const allUniqSubstring = new Set(
//     symbols.flatMap((_, idx) =>
//       Array.from(getUniqSubstrings(symbols.slice(idx))),
//     ),
//   );

//   return allUniqSubstring.size
//     ? Math.max(...Array.from(allUniqSubstring).map(item => item.length))
//     : 0;
// }
function lengthOfLongestSubstring(s: string): number {
  let currentSubstring = '';
  let longestSubstring = '';

  Array.from(s).forEach(symbol => {
    const idx = currentSubstring.indexOf(symbol);

    if (idx > -1) {
      if (currentSubstring.length > longestSubstring.length) {
        longestSubstring = currentSubstring;
      }

      currentSubstring = currentSubstring.slice(idx + 1) + symbol;
    } else {
      currentSubstring += symbol;
    }
  });

  return Math.max(currentSubstring.length, longestSubstring.length);
}
