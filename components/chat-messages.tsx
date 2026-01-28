import { CopyIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  message: string;
};

type ChatMessagesProps = {
  messages: Message[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className='flex flex-col h-screen justify-start w-full md:px-24 px-8 pt-4 max-w-4xl mx-auto scroll-pb-36'>
      {messages.map((msg, index) => (
        <article
          key={index}
          className={`text-left p-4 rounded-lg mt-4 ${
            msg.role === "user" ? "max-w-3/4 self-end bg-gray-200" : "w-full"
          }`}
        >
          <p className={msg.role === "user" ? "" : "p-2"}>{msg.message}</p>
          {msg.role === "assistant" && (
            <div className='actions'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    onClick={() => handleCopy(msg.message)}
                  >
                    <HugeiconsIcon icon={isCopied ? Tick02Icon : CopyIcon} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>{isCopied ? "Copied!" : "Copy"}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
