/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IConnection, createConnection } from 'vscode-languageserver';
import { formatError } from '../utils/runner';
import { startServer } from '../cssServer';
import { getNodeFSRequestService } from './nodeFs';

// Create a connection for the server.
const connection: IConnection = createConnection();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

process.on('unhandledRejection', (e: any) => {
	connection.console.error(formatError(`Unhandled exception`, e));
});

startServer(connection, { file: getNodeFSRequestService() });
