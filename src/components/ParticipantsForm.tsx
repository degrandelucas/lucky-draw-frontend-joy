
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Users } from "lucide-react";

interface ParticipantsFormProps {
  onAddParticipant: (name: string) => void;
}

const ParticipantsForm = ({ onAddParticipant }: ParticipantsFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddParticipant(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="text-purple-500" />
        <h3 className="text-lg font-medium">Quem vai participar?</h3>
      </div>
      
      <div className="flex space-x-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do participante"
          className="flex-1 border-purple-200 focus:ring-purple-500"
        />
        <Button 
          type="submit" 
          disabled={!name.trim()}
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-md"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default ParticipantsForm;
