const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="w-full text-5xl flex flex-row items-start font-serif tracking-wider mb-10 pt-36">
      <span className="block">{title}</span>
    </h2>
  );
};

export default SectionTitle;
