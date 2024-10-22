import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransfer } from "../../../components/P2pTransfer";


async function p2pTransactions() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        // Handle case where user is not logged in
        return [];
    }
    console.log(session.user.id);

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
   
    let user = txns;

    console.log(user[0]);
    let name = await prisma.user.findMany({ where: { id: user[0]?.toUserId } });
    console.log(name[0]);
   
    return txns.map((t) => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        // Ensure name is a string or undefined, not null
        name: name && name[0]?.name ? name[0].name : undefined
    }));
}

async function p2pReTransactions() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
        // Handle case where user is not logged in
        return [];
    }
    console.log(session.user.id);

    const txns2 = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
   
    let user2 = txns2;

    console.log(user2[0]);
    let name2 = await prisma.user.findMany({ where: { id: user2[0]?.fromUserId } });
    console.log(name2[0]);

    return txns2.map((t) => ({
        timeStamp: t.timestamp,
        amount: t.amount,
        // Ensure name is a string or undefined, not null
        name: name2 && name2[0]?.name ? name2[0].name : undefined
    }));
}

export default async function() {
    const res = await p2pTransactions();
    const res2 = await p2pReTransactions();
    console.log(res2);

    let ans = [res, res2];
    console.log(ans);

    return (
        <div>
            <P2pTransfer transactionsSent={res} transactionsReceived={res2}></P2pTransfer>
        </div>
    );
}