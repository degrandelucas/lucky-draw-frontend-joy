
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";

interface DrawHistoryProps {
  history: Array<{ winner: string; date: Date }>;
}

const DrawHistory = ({ history }: DrawHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum sorteio realizado ainda.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg border border-yellow-100 shadow-sm"
          >
            <div className="flex-shrink-0 mr-4">
              <div className="p-2 bg-yellow-50 rounded-full">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.winner}</p>
              <p className="text-sm text-gray-500">
                {item.date.toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default DrawHistory;
