import ChatForm from "@/components/chat-form";
import ChatMessages from "@/components/chat-messages";

export default function Page() {
  return (
    <div className='flex h-screen items-end justify-center bg-background'>
      <ChatMessages />
      <div className='bottom-container fixed pb-6 left-0 right-0 bg-background'>
        <ChatForm />
      </div>
    </div>
  );
}
