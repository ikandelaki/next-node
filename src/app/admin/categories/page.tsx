export default function CategoryPage() {
  return (
    <div>
      <section className="Section">
        <h1>Categories</h1>
      </section>
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8">
        <section className="Section">Category list</section>
        <section className="Section col-[2/-1]">Category form</section>
      </main>
    </div>
  );
}
