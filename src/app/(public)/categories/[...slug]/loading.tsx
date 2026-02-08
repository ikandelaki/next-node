export default function CategoryPageLoading() {
  const renderHeaderSection = () => {
    return (
      <header className="Section flex justify-center items-center gap-8 h-[272]">
        <div>
          <div className="skeleton h-9 w-15 md:w-30" />
          <div className="skeleton h-7 w-60 md:w-120 mt-2" />
        </div>
      </header>
    );
  };

  return <div>{renderHeaderSection()}</div>;
}
