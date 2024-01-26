import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { sendTransaction } from './assets/suiservice';

function App() {
    const handleSendTransaction = async () => {
        const to = "0xf0e708980e6c1c65405ddd75ebe57bba61fc9dfd91b4ad55cf88be8df26e5472";
        const txUrl = await sendTransaction(to, 1000);
        console.log(`Transaction sent. Check out the TX here: ${txUrl}`);
    };

    return (
        <div className="App">
            <header className="App-header">
                <ConnectButton />
            </header>

            <ConnectedAccount />
            <button onClick={handleSendTransaction}>Send Transaction</button>
        </div>
    );
}

function ConnectedAccount() {
    const account = useCurrentAccount();

    if (!account) {
        return null;
    }

    return <div>Connected to {account.address}</div>;
}

export default App;
