"use client";

import { useEffect } from "react";
import ConversationList from "../conversationList";
import { Card, CardContent } from "../ui/card";
import { useFormStore } from "@/lib/store/formStore";
import { Skeleton } from "../ui/skeleton";

export default function ConversationsListCard() {
  const formStore = useFormStore();
  const { conversations, formId, isLoading } = formStore;
  const emptyConversations = conversations.length === 0;

  useEffect(() => {
    if (formId) {
      formStore.fetchConversations();
    }
  }, [formId]);

  if (isLoading || !formId) {
    return <LoadingUI />;
  }

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="pt-6">
        <ConversationList conversations={conversations} formId={formId} />
        {emptyConversations ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm">No Conversations</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

const LoadingUI = () => {
  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardContent className="pt-6">
        <div className="grid gap-2">
          <Skeleton className="w-[64px] h-5" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-[64px] h-5" />

          <Skeleton className="w-full h-10" />
          <Skeleton className="w-[64px] h-5" />

          <Skeleton className="w-full h-10" />
          <br />
          <Skeleton className="w-full h-[40px] bg-primary" />
        </div>
      </CardContent>
    </Card>
  );
};
