interface KbdProps {
  shortCut: React.ReactNode;
}

const Kbd: React.FC<KbdProps> = ({ shortCut }) => {
  return (
    <kbd className="ml-2 rounded border px-1.5 py-0.5 text-xs font-semibold border-gray-400 text-gray-400">
      {shortCut}
    </kbd>
  );
};

export default Kbd;
