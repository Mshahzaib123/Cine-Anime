import ColorPalette from "../components/color-palate";

export default function Home() {
  return (
    <div className="font-sans">
      <main className="w-full max-w-4xl mx-auto">
        <ColorPalette />
        <section className="h-screen flex items-center justify-center">
          <h1 data-animate='heading1' className="heading-h1">
            Animation Heading 1
          </h1>
        </section>
        <section className="h-screen flex items-center justify-center">
          <h2 data-animate='heading1' className="heading-h2">
            Animation Heading 1
          </h2>
        </section>
        <section className="h-screen flex items-center justify-center">
          <h2 data-animate='heading1' className="heading-h2">
            Animation Heading 1
          </h2>
        </section>
        <section className="h-screen flex items-center justify-center">
          <h2 data-animate='heading1' className="heading-h2">
            Animation Heading 1
          </h2>
        </section>
      </main>
    </div>
  );
}
