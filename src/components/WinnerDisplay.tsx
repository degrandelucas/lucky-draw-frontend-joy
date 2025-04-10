
import { Award, Sparkles } from "lucide-react";

interface WinnerDisplayProps {
  winner: string | null;
  isDrawing: boolean;
}

const WinnerDisplay = ({ winner, isDrawing }: WinnerDisplayProps) => {
  if (isDrawing) {
    return (
      <div className="mt-8 text-center animate-pulse">
        <p className="text-lg text-purple-600">Selecionando um vencedor...</p>
      </div>
    );
  }

  if (!winner) {
    return null;
  }

  return (
    <div className="mt-8 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center rounded-full bg-yellow-100 p-3 mb-4">
        <Award className="h-8 w-8 text-yellow-600" />
      </div>
      <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
          {winner}
        </span>
        <Sparkles className="h-5 w-5 text-yellow-500" />
      </h3>
      <p className="text-gray-600">É o grande vencedor!</p>
    </div>
  );
};

export default WinnerDisplay;
