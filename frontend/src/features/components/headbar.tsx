import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    user: {
        id: number;
        name: string;
        email: string;
        created_at: string;
    };
}

const Headbar = ({user}: Props) => {
    const path = usePathname();
    const onPage = path.slice(2);

    console.log(user)
  return (
    <div className="hidden md:flex  justify-center items-end gap-10 w-full h-full">
        <Link href={`/${user.id}/dashboard`} className={`text-[20px] font-black opacity-45 transition duration-200 ${onPage.startsWith("/dashboard") ? "opacity-100 bg-mauve-300 text-mauve-600 rounded-2xl p-1 px-5 scale-105" : ""}`}>Home</Link>
        <Link href={`/${user.id}/transactions`} className={`text-[20px] font-black opacity-45 transition duration-200 ${onPage.startsWith("/transactions") ? "opacity-100 bg-mauve-300 text-mauve-600 rounded-2xl p-1 px-5 " : ""}`}>Transactions</Link>
        <Link href={`/${user.id}/analytics`} className={`text-[20px] font-black opacity-45 transition duration-200 ${onPage.startsWith("/analytics") ? "opacity-100 bg-mauve-300 text-mauve-600 rounded-2xl p-1 px-5 " : ""}`}>Analytics</Link>
    </div>
  )
}

export default Headbar