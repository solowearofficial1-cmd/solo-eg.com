export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 pt-20 pb-24">
      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tight">WHO ARE WE ?</h1>
        <div className="h-[1px] w-32 bg-foreground mx-auto" />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32 items-center">
        <div>
          <h2 className="text-3xl font-serif mb-8 italic">The Essence of SOLO</h2>
          <p className="text-lg font-light leading-relaxed text-muted-foreground mb-6">
            Founded in 2026, SOLO was born from a simple yet profound realization: in a world of constant noise, true elegance lies in the quiet. 
          </p>
          <p className="text-lg font-light leading-relaxed text-muted-foreground">
            We don't just create clothing; we curate an aesthetic of intentionality. Our pieces are designed for those who find power in simplicity and quality in every thread.
          </p>
        </div>
        <div className="aspect-[4/5] bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic font-serif">
            Brand Image Placeholder
          </div>
        </div>
      </section>

      <section className="glass p-16 md:p-24 mb-32 rounded-3xl shadow-xl border border-white/50">
        <h2 className="text-sm uppercase tracking-[0.4em] font-bold mb-12 text-center">OUR VALUES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">Integrity</h3>
            <p className="text-sm font-light text-muted-foreground">Sourcing only the finest, most ethical materials for every collection.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">Precision</h3>
            <p className="text-sm font-light text-muted-foreground">Every stitch, cut, and finish is executed with meticulous attention to detail.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">Timelessness</h3>
            <p className="text-sm font-light text-muted-foreground">Designs that transcend seasons and trends, built to last a lifetime.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-serif mb-8">Join the Movement</h2>
        <p className="text-xl font-light italic mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed">
          "Simplicity is the ultimate sophistication."
        </p>
        <div className="h-[1px] w-12 bg-foreground/20 mx-auto" />
      </section>
    </div>
  );
}
