import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import wallet from "./dev-wallet.json";

const client = new SuiClient({ url: getFullnodeUrl("devnet") });

const privateKeyArray = wallet.privateKey.split(',').map(num => parseInt(num, 10));
const privateKeyBytes = new Uint8Array(privateKeyArray);
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

export async function sendTransaction(to, amount) {
    try {
        const txb = new TransactionBlock();
        let [coin] = txb.splitCoins(txb.gas, [amount]);
        txb.transferObjects([coin, txb.gas], to);
        let txid = await client.signAndExecuteTransactionBlock({ signer: keypair, transactionBlock: txb });
        return `https://suiexplorer.com/txblock/${txid.digest}?network=devnet`;
    } catch (error) {
        console.error(`Error in sending transaction: ${error}`);
        throw error;
    }
}

