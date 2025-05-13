import { createContext, useContext } from "react";
import { Message as MessageT } from "@/types/Message";

const MessageVariantContext = createContext<MessageT["source"] | undefined>(undefined);

export const useMessageVariant = () => {
  const context = useContext(MessageVariantContext);
  if (context === undefined) {
    throw new Error("useMessageVariant must be used within a Message");
  }
  return context;
};

export const MessageProvider = ({ source, children }: { source: MessageT["source"]; children: React.ReactNode }) => {
  return (
    <MessageVariantContext.Provider value={source}>{children}</MessageVariantContext.Provider>
  );
};