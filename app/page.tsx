"use client";
import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";
import { useChatMutation } from "@/hooks/useChatMutation";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  message: string;
};
export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutate: sendMessage, isPending } = useChatMutation({
    onSuccess: data => {
      if (data?.message) {
        setMessages(prev => [
          ...prev,
          { role: "assistant", message: data.message },
        ]);
      }
    },
  });

  const handleSendMessage = (message: string) => {
    setMessages(prev => [...prev, { role: "user", message: message }]);
    sendMessage(message);
  };

  return (
    <div className='flex flex-col h-screen bg-background'>
      <ChatMessages messages={messages} />
      <div className='fixed pb-6 left-0 right-0 bottom-0 bg-background'>
        <ChatForm sendMessage={handleSendMessage} isPending={isPending} />
      </div>
    </div>
  );
}
