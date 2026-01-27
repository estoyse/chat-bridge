import { CopyIcon } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ChatMessages() {
  return (
    <div className='flex flex-col h-screen justify-start  w-full px-24 pt-4 max-w-4xl mx-auto'>
      <article className='w-3/4 text-left self-end bg-gray-200 p-4 rounded-lg'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
      </article>
      <article className='w-full text-left self-end p-4 rounded-lg mt-4'>
        <p className='p-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
        <div className='actions'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost'>
                <HugeiconsIcon icon={CopyIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </article>
    </div>
  );
}
