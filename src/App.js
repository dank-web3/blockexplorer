import { Alchemy, Network } from "alchemy-sdk";
import { useMemo, useState } from "react";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState();
  const [transactions, setTransactions] = useState();

  useMemo(() => {
    const getBlockNumber = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(blockNumber);
    };

    getBlockNumber();
  }, []);

  useMemo(() => {
    if (!blockNumber) return;
    const getBlock = async () => {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber);
      setBlock(block);
    };

    getBlock();
  }, [blockNumber]);

  useMemo(() => {
    if (!block) return;
    setTransactions(block.transactions);
  }, [block]);

  return (
    <div className="App" style={{ textAlign: "left" }}>
      {blockNumber && <p>Block Number: {blockNumber}</p>}
      {block && <p>Block Hash: {block.hash}</p>}
      <div>
        {transactions &&
          transactions.map((transaction, index) => {
            if (!transaction) return;
            return (
              <div
                key={index}
                style={{ border: "2px solid black", marginTop: "1rem" }}
              >
                <p>Hash: {transaction.hash}</p>
                <p>From: {transaction.from}</p>
                <p>To: {transaction.to}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
