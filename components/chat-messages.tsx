import { CopyIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { useState, useRef, useEffect } from "react";
import { MarkdownRenderer } from "./markdownRenderer";

type Message = {
  role: "user" | "assistant";
  message: string;
};

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  const [isCopied, setIsCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className='flex flex-col flex-1 overflow-y-auto w-full md:px-24 px-8 pt-4 max-w-4xl mx-auto pb-32'>
      {messages.map((msg, index) => (
        <article
          key={index}
          className={`text-left p-4 rounded-lg mt-4 ${
            msg.role === "user" ? "max-w-3/4 self-end bg-gray-200" : "w-full"
          }`}
        >
          <MarkdownRenderer content={msg.message} />
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
      {isLoading && (
        <div className='flex justify-start mb-4 p-4 '>
          <div className='flex items-center justify-center space-x-1 rounded-lg mx-2'>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2 w-2 bg-gray-500 rounded-full animate-bounce'></div>
          </div>
          <span className=''>Thinking...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
