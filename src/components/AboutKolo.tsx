import serbianPattern from "@/assets/serbian-pattern.png";

const AboutKolo = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://svetisavaoplenac.ca/wp-content/uploads/2023/11/Carassauga-May-2023-600x400.jpg"
          alt="Kolo dance background"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/80 via-background/95 to-background" />
      </div>

      {/* Decorative Patterns */}
      <div className="absolute top-10 right-10 opacity-5 w-64 h-64 animate-spin" style={{ animationDuration: "60s" }}>
        <img src={serbianPattern} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5 w-48 h-48 animate-spin" style={{ animationDuration: "45s", animationDirection: "reverse" }}>
        <img src={serbianPattern} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What is <span className="text-primary">Kolo?</span>
          </h2>
          <p className="text-lg text-muted-foreground italic">
            UNESCO Intangible Cultural Heritage of Humanity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Icon */}
          <div className="flex justify-center animate-fade-in">
            <div className="relative">
              <img 
                src={serbianPattern} 
                alt="Serbian Traditional Pattern" 
                className="w-80 h-80 drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                <strong className="text-primary">Kolo</strong> is a collective and very popular traditional folk dance in Serbia where a group of people — usually several dozen, at the very least three — hold each other by the hands or around the waist dancing, ideally in a circle, hence the name.
              </p>
              
              <p className="text-lg leading-relaxed">
                Kolo is connected with beliefs and rituals of the Serbs, like the <em>Koledo</em> (winter solstice) and the old <em>Kolo</em> (wheel, ring) ritual celebrating the new year with solar symbolism. The water used in these ceremonies bathes <em>"Božić"</em> (young god) — in Serbian, <em>"Bog"</em> means god and <em>"ić"</em> means small, young.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                "Kolo dance represents a powerful symbol of Serbian national identity and mutual connectivity. The ring symbolizes the closed Universum, and our art includes round forms and music vibrations in the same form."
                <footer className="text-sm mt-2">— Blagoje Misic</footer>
              </blockquote>

              <p className="text-lg leading-relaxed">
                The kolo dance is performed from the Balkans to the Baltic Sea, from the East through Dniester. It has always symbolized the nation's unity on common ideals and wishes — a continual and unbreakable line which makes unity and collective spirit of our people.
              </p>

              <div className="bg-secondary/10 rounded-lg p-6 mt-6">
                <h3 className="font-bold text-xl mb-3 text-secondary">Dance Characteristics</h3>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Rhythms: <strong>2/8, 7/8, or 9/8</strong> depending on regional variations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Instruments: Accordion, frula, tamburica, or harmonica</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Almost no movement above the waist — the art is in the footwork</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Simple to learn, but virtuosity comes from ornamental elements and syncopation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutKolo;
