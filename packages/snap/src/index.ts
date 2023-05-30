import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { initializeChains } from './chains';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of the method (boolean).
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'init':
      // Ensure user confirms initializing wallets
      let confirmation = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text('Would you like to initialize Cosmos within your Metamask?'),
          ]),
        },
      });
      let res;
      if (confirmation) {
        res = initializeChains();
      }
      return res
    default:
      throw new Error('Method not found.');
  }
};
