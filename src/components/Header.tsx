import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-new.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  
  

  const getLanguageLabel = () => {
    switch (language) {
      case "sr-latin":
        return "SR";
      case "sr-cyrillic":
        return "СР";
      case "en":
        return "EN";
      default:
        return "SR";
    }
  };

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/history", label: t("nav.history") },
    { path: "/join", label: t("nav.join") },
    { path: "/groups", label: t("nav.groups") },
    { path: "/gallery", label: t("nav.gallery") },
    { path: "/community", label: t("nav.community") },
    { path: "/calendar", label: t("nav.calendar") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const storeUrl = "https://sveti-sava-folklore.printify.me/";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="Sveti Sava Oplenac"
            className="h-12 w-auto transition-opacity hover:opacity-80"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
          >
            {t("nav.store")}
          </a>
          
          {/* Desktop Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
              >
                <Languages className="w-4 h-4 mr-2" />
                <span className="font-semibold">{getLanguageLabel()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm z-[100]">
              <DropdownMenuItem 
                onClick={() => setLanguage("sr-latin")}
                className="cursor-pointer"
              >
                <span className="font-semibold">SR (Latin)</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("en")}
                className="cursor-pointer"
              >
                <span className="font-semibold">EN (English)</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage("sr-cyrillic")}
                className="cursor-pointer"
              >
                <span className="font-semibold">СР (Ћирилица)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              {t("nav.store")}
            </a>
            
            {/* Mobile Language Toggle */}
            <div className="pt-2 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-background/95 backdrop-blur-sm shadow-lg"
                  >
                    <Languages className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{getLanguageLabel()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-background/95 backdrop-blur-sm z-[100]">
                  <DropdownMenuItem 
                    onClick={() => {
                      setLanguage("sr-latin");
                      setIsOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="font-semibold">SR (Latin)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setLanguage("en");
                      setIsOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="font-semibold">EN (English)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setLanguage("sr-cyrillic");
                      setIsOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <span className="font-semibold">СР (Ћирилица)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
