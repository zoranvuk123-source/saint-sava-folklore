const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Sveti Sava Oplenac</h3>
          <p className="text-sm opacity-90">Folklorna Grupa</p>
        </div>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} Sveti Sava Oplenac. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
