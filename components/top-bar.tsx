import Link from "next/link";
import { ModeToggle } from "./ui/theme-toggle";

export default function TopBar() {
  return (
    <div>
      <div className='flex items-center justify-between px-12 max-w-4xl mx-auto py-8'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='text-2xl font-bold'>
            ChatBridge
          </Link>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
