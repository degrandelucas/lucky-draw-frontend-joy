
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, X } from "lucide-react";

interface ParticipantsListProps {
  participants: string[];
  onRemove: (name: string) => void;
}

const ParticipantsList = ({ participants, onRemove }: ParticipantsListProps) => {
  if (participants.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Nenhum participante adicionado ainda.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-2">
        {participants.map((participant, index) => (
          <div
            key={`${participant}-${index}`}
            className="flex items-center justify-between p-3 rounded-md bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <User className="h-4 w-4 text-purple-500 mr-2" />
              <span className="font-medium">{participant}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onRemove(participant)}
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ParticipantsList;
