import { Card2 } from "@repo/ui/Card2";


export const P2pTransfer = ({ transactionsSent, transactionsReceived }: { transactionsSent: { timeStamp?: Date, amount: number, name?: string }[], transactionsReceived: { timeStamp?: Date, amount: number, name?: string }[] }) => {
  if (!transactionsSent.length && !transactionsReceived.length) {
    return (
      <div className="text-center pb-8 pt-8 text-2xl">
        No Recent transactions
      </div>
    );
  }

  return (
    <Card2 title={"Recent Transactions"}>
      <div className="pt-2 mt-5">
        <h3 className="text-lg font-semibold"></h3>
        {transactionsSent.length ? (
          transactionsSent.map(t => (
            <div key={t.name} className="flex justify-between items-center mb-4">
              <div className="text-left font-semibold">{t.name || "Unknown"}</div>
              <div className="text-right mr-60">Rs {t.amount / 100}</div>
              
             

            </div>
             
          )
       

        )
        
        ) : (
          <div></div>
        )}
  <div className="border"></div>
        

        <h3 className="text-lg font-semibold"></h3>
        {transactionsReceived.length ? (
          transactionsReceived.map(t => (
            <div key={t.name} className="flex justify-between items-center mb-4">
              <div className="text-left font-semibold">{t.name || "Unknown"}</div>
              <div className="text-right mr-60">Rs {t.amount / 100}</div>
            </div>
          ))
        ) : (
          <div></div>
        )}

        <div className="border"></div>
      </div>
    </Card2>
  );
};