import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { sendMessage } from "@/services/chat.service";

type ChatResponse = {
  message: string;
};

export function useChatMutation(
  options?: Omit<UseMutationOptions<ChatResponse, Error, string>, "mutationFn">
) {
  return useMutation({
    mutationFn: sendMessage,
    ...options,
  });
}
