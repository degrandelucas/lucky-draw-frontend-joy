
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import ParticipantsForm from "@/components/ParticipantsForm";
import DrawButton from "@/components/DrawButton";
import WinnerDisplay from "@/components/WinnerDisplay";
import ParticipantsList from "@/components/ParticipantsList";
import DrawHistory from "@/components/DrawHistory";
import Confetti from "@/components/Confetti";

const Index = () => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [drawHistory, setDrawHistory] = useState<Array<{winner: string, date: Date}>>([]);

  const addParticipant = (name: string) => {
    if (participants.includes(name)) {
      toast({
        title: "Participante já adicionado",
        description: "Este nome já está na lista de participantes.",
        variant: "destructive",
      });
      return;
    }
    
    setParticipants([...participants, name]);
    toast({
      title: "Participante adicionado",
      description: `${name} foi adicionado ao sorteio.`,
    });
  };

  const removeParticipant = (name: string) => {
    setParticipants(participants.filter(p => p !== name));
    toast({
      title: "Participante removido",
      description: `${name} foi removido do sorteio.`,
    });
  };

  const handleDraw = () => {
    if (participants.length < 2) {
      toast({
        title: "Participantes insuficientes",
        description: "Você precisa adicionar pelo menos 2 participantes para realizar o sorteio.",
        variant: "destructive",
      });
      return;
    }

    setIsDrawing(true);
    setWinner(null);

    // Simular delay para efeito de sorteio
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * participants.length);
      const selectedWinner = participants[winnerIndex];
      setWinner(selectedWinner);
      setIsDrawing(false);
      setShowConfetti(true);
      
      // Adicionar ao histórico
      setDrawHistory([...drawHistory, { winner: selectedWinner, date: new Date() }]);
      
      toast({
        title: "Sorteio concluído!",
        description: `Parabéns! ${selectedWinner} é o vencedor!`,
      });
      
      // Esconder os confetes após alguns segundos
      setTimeout(() => setShowConfetti(false), 5000);
    }, 2000);
  };

  const clearDrawHistory = () => {
    setDrawHistory([]);
    toast({
      title: "Histórico limpo",
      description: "O histórico de sorteios foi apagado.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-4 md:p-8">
      {showConfetti && <Confetti />}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 mb-2">
            Sorteio Online
          </h1>
          <p className="text-gray-600 text-lg">
            Adicione participantes e faça um sorteio de forma rápida e divertida!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-lg border-purple-200">
            <CardHeader>
              <CardTitle>Adicionar Participantes</CardTitle>
              <CardDescription>
                Insira os nomes dos participantes do sorteio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ParticipantsForm onAddParticipant={addParticipant} />

              <Separator className="my-6" />

              <div className="flex flex-col items-center">
                <DrawButton 
                  onDraw={handleDraw} 
                  isDrawing={isDrawing} 
                  participantCount={participants.length}
                />
                
                <WinnerDisplay 
                  winner={winner} 
                  isDrawing={isDrawing} 
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg border-pink-200">
              <CardHeader className="pb-2">
                <CardTitle>Participantes</CardTitle>
                <CardDescription>
                  {participants.length} participantes no sorteio atual
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ParticipantsList 
                  participants={participants} 
                  onRemove={removeParticipant} 
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6 shadow-lg border-yellow-200">
          <CardHeader>
            <CardTitle>Histórico de Sorteios</CardTitle>
            <CardDescription>
              Veja os resultados de sorteios anteriores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DrawHistory history={drawHistory} />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={clearDrawHistory}
              disabled={drawHistory.length === 0}
            >
              Limpar Histórico
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
