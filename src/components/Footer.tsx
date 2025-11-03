import { Mail, MapPin, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://svetisavaoplenac.ca/wp-content/uploads/2023/11/ChurchHallAllGrps-600x400.jpg"
          alt="Folklorna Grupa Group Photo"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/95 to-secondary/80" />
      </div>

      <div className="relative z-10 container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Sveti Sava Oplenac</h3>
            <p className="text-sm opacity-90 mb-4">Folklorna Grupa</p>
            <p className="text-sm opacity-75">
              Celebrating Serbian culture through traditional dance, music, and community since our establishment.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="mailto:saintsavaoplenac@gmail.com" 
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                saintsavaoplenac@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>St. Sava Serbian Orthodox Church<br />Mississauga, ON</span>
              </div>
            </div>
          </div>

          {/* Practice Times */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Practice Schedule</h4>
            <div className="flex items-start gap-2 text-sm opacity-90">
              <Calendar className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Every Thursday</p>
                <p className="opacity-75">5:30 PM - 9:00 PM</p>
                <p className="opacity-75 mt-2">New dancers welcome!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Sveti Sava Oplenac Folklorna Grupa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
