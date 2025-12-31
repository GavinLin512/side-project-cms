import { MessageSquare } from 'lucide-react';

const AIShoppingAssistant = () => {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-8 bg-accent p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity z-99"
      aria-label="Open chat"
    >
      <MessageSquare className="text-accent-foreground" size={28} />
    </button>
  );
};

export default AIShoppingAssistant;
