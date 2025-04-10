
import { Button } from "@/components/ui/button";
import { TicketIcon, Loader2 } from "lucide-react";

interface DrawButtonProps {
  onDraw: () => void;
  isDrawing: boolean;
  participantCount: number;
}

const DrawButton = ({ onDraw, isDrawing, participantCount }: DrawButtonProps) => {
  const isDisabled = isDrawing || participantCount < 2;

  return (
    <Button
      onClick={onDraw}
      disabled={isDisabled}
      size="lg"
      className={`mt-6 text-lg font-medium px-8 py-6 h-auto transition-all duration-300 shadow-lg ${
        isDisabled 
          ? "opacity-75 cursor-not-allowed" 
          : "hover:scale-105 animate-pulse" 
      } bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500`}
    >
      {isDrawing ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sorteando...
        </>
      ) : (
        <>
          <TicketIcon className="mr-2 h-5 w-5" />
          Realizar Sorteio
        </>
      )}
    </Button>
  );
};

export default DrawButton;
