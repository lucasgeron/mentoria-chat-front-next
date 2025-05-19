'use client';

import { Button } from "@/components/ui/button";
import { Dialog,  DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCookie, setCookie } from "cookies-next"; 
export interface RememberAuthorDialogProps {
 author: string | null;
 open: boolean;
 onClose: () => void;
}

export const RememberAuthorDialog = ({author, open, onClose}: RememberAuthorDialogProps & { onClose: () => void }) => { 
  const skipDialogsCookie = getCookie("skipDialogs") || null;
  const parsedSkipDialogs = JSON.parse(skipDialogsCookie as string);

  const skipRememberAuthorDialog = parsedSkipDialogs?.includes('RememberAuthorDialog')

  const handleRememberAuthor = () => {
    setCookie("author", author, { path: "/" });
    onClose();
  };

  // Adicionar verificação para evitar execução automática
  const handleDontAskAgain = () => {
    setCookie("skipDialogs", JSON.stringify(['RememberAuthorDialog']), { path: "/" });
    onClose();
  };

  if(!open || skipRememberAuthorDialog) return null;
  
  return (
    <Dialog defaultOpen={true}>
      <DialogContent onEscapeKeyDown={onClose}>
        <DialogHeader>
          <DialogTitle>Remember your name?</DialogTitle>
          <DialogDescription>
              Would you like us to save your name for other rooms?
          </DialogDescription>
        </DialogHeader>
        
        {/* TODO: Fix this. 
            By some reason, the first onClick function is being triggered automatically
            We did this workaround to temporarily fix it. */}
        <Button className="cursor-default pointer-events-none bg-transparent h-0 m-0 p-0 focus-visible:border-none focus-visible:ring-0" onClick={() => {}} autoFocus/>
          
        <div className="flex justify-between w-full">
          <Button variant="destructive" onClick={handleDontAskAgain}>Don&apos;t ask Again</Button>
          <Button variant="default" onClick={handleRememberAuthor}>Remember</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}