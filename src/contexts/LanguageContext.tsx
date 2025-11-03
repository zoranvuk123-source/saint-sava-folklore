import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "sr-latin" | "en" | "sr-cyrillic";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  "sr-latin": {
    // Hero
    "hero.celebrate": "Proslavite",
    "hero.serbian.culture": "Srpsku Kulturu",
    "hero.subtitle": "Istražite žive tradicije Sv. Sava Oplenac Folklorne Grupe kroz igru, muziku i zajednicu",
    "hero.explore": "Istražite Galeriju",
    "hero.photos": "Pogledajte Fotografije",
    
    // Cultural Showcase
    "showcase.title": "Naš",
    "showcase.cultural": "Kulturni Identitet",
    "showcase.subtitle": "Proslavljamo srpsko nasleđe kroz igru, muziku i tradiciju",
    "showcase.dance.together": "Zajedno zaigrajmo veselo",
    "showcase.dance.together.en": "Let's Dance Together Joyfully",
    "showcase.tradition": "Tradicija se gradi",
    "showcase.tradition.en": "Tradition is Being Built",
    "showcase.strength": "Snažno se igra i pjeva",
    "showcase.strength.en": "Dancing and Singing with Strength",
    "showcase.kolo": "Igramo kolo",
    "showcase.kolo.en": "We Dance the Kolo",
    
    // About Kolo
    "kolo.title": "Šta je",
    "kolo.kolo": "Kolo?",
    "kolo.unesco": "UNESCO Nematerijalno Kulturno Nasleđe Čovečanstva",
    "kolo.intro": "je kolektivna i veoma popularna veoma stara narodna igra u Srbiji gde grupa ljudi — obično nekoliko desetina, najmanje troje — drže jedni druge za ruke ili oko pojasa igraju, idealno u krugu, otuda i ime.",
    "kolo.connected": "Kolo je povezano sa brojnim verovanjima i ritualima Srba, kao što je Koledo (zimski solsticij) i stari Kolo (točak, prsten) ritual proslavljanja nove godine sa sunčanom simbolikom. Voda koja se koristi u ovim ceremonijama kupa \"Božića\" (mladog boga) — na srpskom, \"Bog\" znači bog a \"ić\" znači mali, mlad.",
    "kolo.quote": "\"Kolo predstavlja moćan simbol srpskog nacionalnog identiteta i međusobne povezanosti. Krug simbolizuje zatvoreni Univerzum, a naša umetnost uključuje okrugle forme i muzičke vibracije u istoj formi.\"",
    "kolo.quote.author": "— Blagoje Misić",
    "kolo.balkans": "Kolo se igra od Balkana do Baltičkog mora, sa istoka kroz Dnjestar. Uvek je simbolizovao jedinstvo nacije na zajedničkim idealima i željama — kontinuiranu i nerazbojiru liniju koja čini jedinstvo i kolektivni duh našeg naroda.",
    "kolo.characteristics": "Karakteristike Igre",
    "kolo.rhythms": "Ritmovi: 2/8, 7/8, ili 9/8 u zavisnosti od regionalnih varijacija",
    "kolo.instruments": "Instrumenti: Harmonika, frula, tamburica ili usna harmonika",
    "kolo.movement": "Skoro bez pokreta iznad pojasa — umetnost je u koraku",
    "kolo.simple": "Jednostavno za učenje, ali virtuoznost dolazi od ornamentalnih elemenata i sinkopacije",
    
    // Join Us
    "join.title": "Pridružite Se Našoj",
    "join.group": "Foklornoj Grupi",
    "join.subtitle": "Uvek primamo nove igrače, od početnika do odraslih. Svi su dobrodošli da se pridruže našoj porodici!",
    "join.all.welcome": "Svi nivoi veština su dobrodošli",
    "join.location.title": "Mesto Vežbi",
    "join.location.church": "Srpska Pravoslavna Crkva Sv. Sava",
    "join.location.description": "Vežbe se održavaju nedeljno u crkvi. Sastanak sa Otcem Zlatiborom kao što je navedeno za svaku grupu.",
    "join.group3": "Grupa 3",
    "join.group2": "Grupa 2",
    "join.group1": "Grupa 1",
    "join.recreational": "Rekreativna",
    "join.ages.3to7": "Uzrast 3 do 7",
    "join.ages.8to12": "Uzrast 8 do 12",
    "join.ages.13plus": "Uzrast 13+",
    "join.ages.all": "Svi Uzrasti",
    "join.group3.time": "Nedeljne vežbe od 5:30 do 6:30 uveče",
    "join.group3.note": "Posle vežbe sastanak sa Otcem Zlatiborom u crkvi.",
    "join.group2.time": "Nedeljne vežbe od 6:30 do 7:30 uveče",
    "join.group2.note": "Sa horeografom + nastupi po rasporedu. Sastanak sa Otcem Zlatiborom pre vežbe u 6 uveče.",
    "join.group1.time": "Nedeljne vežbe od 7:30 do 9 uveče",
    "join.group1.note": "+ nastupi po rasporedu. Sastanak sa Otcem Zlatiborom u 7 uveče pre vežbe.",
    "join.recreational.time": "Uskoro",
    "join.recreational.note": "Nadamo se da će doći u budućnosti. Biće otvoreno za sve uzraste! Slobodno nas kontaktirajte.",
    "join.ready.title": "Spremni da Igrate?",
    "join.ready.subtitle": "Bez obzira da li ste potpuni početnik ili imate iskustva, dobrodošli ste da se pridružite našoj zajednici srpskog narodnog plesa. Doživite radost tradicionalne igre, muzike i kulture!",
    "join.contact": "Kontaktirajte Nas",
    "join.watch": "Pogledajte Naše Nastupe",
    
    // Videos
    "videos.title": "Nastupi",
    "videos.performances": "Video Zapisi",
    "videos.subtitle": "Doživite naše zadivljujuće nastupe koji prikazuju tradicionalne srpske igre i kulturne proslave",
    "videos.dance": "Igra",
    "videos.festival": "Karasauga Festival",
    
    // Photos
    "photos.title": "Foto",
    "photos.gallery": "Galerija",
    "photos.subtitle": "Snimci trenutaka sa naših nastupa, festivala i društvenih okupljanja",
    "photos.all": "Sve",
    "photos.performance": "Nastup",
    "photos.costumes": "Nošnje",
    "photos.community": "Zajednica",
    "photos.behind": "Iza Scene",
    
    // Footer
    "footer.about": "Proslavljamo srpsku kulturu kroz tradicionalnu igru, muziku i zajednicu od našeg osnivanja.",
    "footer.contact": "Kontaktirajte Nas",
    "footer.schedule": "Raspored Vežbi",
    "footer.thursday": "Svakog Četvrtka",
    "footer.time": "5:30 uveče - 9:00 uveče",
    "footer.new.dancers": "Novi igrači dobrodošli!",
    "footer.rights": "© 2025 Sveti Sava Oplenac Folklorna Grupa. Sva Prava Zadržana.",
  },
  "sr-cyrillic": {
    // Hero
    "hero.celebrate": "Прославите",
    "hero.serbian.culture": "Српску Културу",
    "hero.subtitle": "Истражите живе традиције Св. Сава Опленац Фолклорне Групе кроз игру, музику и заједницу",
    "hero.explore": "Истражите Галерију",
    "hero.photos": "Погледајте Фотографије",
    
    // Cultural Showcase
    "showcase.title": "Наш",
    "showcase.cultural": "Културни Идентитет",
    "showcase.subtitle": "Прослављамо српско наслеђе кроз игру, музику и традицију",
    "showcase.dance.together": "Заједно заиграјмо весело",
    "showcase.dance.together.en": "Let's Dance Together Joyfully",
    "showcase.tradition": "Традиција се гради",
    "showcase.tradition.en": "Tradition is Being Built",
    "showcase.strength": "Снажно се игра и пјева",
    "showcase.strength.en": "Dancing and Singing with Strength",
    "showcase.kolo": "Играмо коло",
    "showcase.kolo.en": "We Dance the Kolo",
    
    // About Kolo
    "kolo.title": "Шта је",
    "kolo.kolo": "Коло?",
    "kolo.unesco": "УНЕСЦО Нематеријално Културно Наслеђе Човечанства",
    "kolo.intro": "је колективна и веома популарна веома стара народна игра у Србији где група људи — обично неколико десетина, најмање троје — држе једни друге за руке или око појаса играјући, идеално у кругу, отуда и име.",
    "kolo.connected": "Коло је повезано са бројним веровањима и ритуалима Срба, као што је Коледо (зимски солстициј) и стари Коло (точак, прстен) ритуал прослављања нове године са сунчаном симболиком. Вода која се користи у овим церемонијама купа \"Божића\" (младог бога) — на српском, \"Бог\" значи бог а \"ић\" значи мали, млад.",
    "kolo.quote": "\"Коло представља моћан симбол српског националног идентитета и међусобне повезаности. Круг симболизује затворени Универзум, а наша уметност укључује округле форме и музичке вибрације у истој форми.\"",
    "kolo.quote.author": "— Благоје Мисић",
    "kolo.balkans": "Коло се игра од Балкана до Балтичког мора, са истока кроз Дњестар. Увек је симболизовао јединство нације на заједничким идеалима и жељама — континуирану и неразбојиву линију која чини јединство и колективни дух нашег народа.",
    "kolo.characteristics": "Карактеристике Игре",
    "kolo.rhythms": "Ритмови: 2/8, 7/8, или 9/8 у зависности од регионалних варијација",
    "kolo.instruments": "Инструменти: Хармоника, фрула, тамбурица или усна хармоника",
    "kolo.movement": "Скоро без покрета изнад појаса — уметност је у кораку",
    "kolo.simple": "Једноставно за учење, али виртуозност долази од орнаменталних елемената и синкопације",
    
    // Join Us
    "join.title": "Придружите Се Нашој",
    "join.group": "Фолкорној Групи",
    "join.subtitle": "Увек примамо нове играче, од почетника до одраслих. Сви су добродошли да се придруже нашој породици!",
    "join.all.welcome": "Сви нивои вештина су добродошли",
    "join.location.title": "Место Вежби",
    "join.location.church": "Српска Православна Црква Св. Сава",
    "join.location.description": "Вежбе се одржавају недељно у цркви. Састанак са Отцем Златибором као што је наведено за сваку групу.",
    "join.group3": "Група 3",
    "join.group2": "Група 2",
    "join.group1": "Група 1",
    "join.recreational": "Рекреативна",
    "join.ages.3to7": "Узраст 3 до 7",
    "join.ages.8to12": "Узраст 8 до 12",
    "join.ages.13plus": "Узраст 13+",
    "join.ages.all": "Сви Узрасти",
    "join.group3.time": "Недељне вежбе од 5:30 до 6:30 увече",
    "join.group3.note": "После вежбе састанак са Отцем Златибором у цркви.",
    "join.group2.time": "Недељне вежбе од 6:30 до 7:30 увече",
    "join.group2.note": "Са хореографом + наступи по распореду. Састанак са Отцем Златибором пре вежбе у 6 увече.",
    "join.group1.time": "Недељне вежбе од 7:30 до 9 увече",
    "join.group1.note": "+ наступи по распореду. Састанак са Отцем Златибором у 7 увече пре вежбе.",
    "join.recreational.time": "Ускоро",
    "join.recreational.note": "Надамо се да ће доћи у будућности. Биће отворено за све узрасте! Слободно нас контактирајте.",
    "join.ready.title": "Спремни да Играте?",
    "join.ready.subtitle": "Без обзира да ли сте потпуни почетник или имате искуства, добродошли сте да се придружите нашој заједници српског народног плеса. Доживите радост традиционалне игре, музике и културе!",
    "join.contact": "Контактирајте Нас",
    "join.watch": "Погледајте Наше Наступе",
    
    // Videos
    "videos.title": "Наступи",
    "videos.performances": "Видео Записи",
    "videos.subtitle": "Доживите наше задивљујуће наступе који приказују традиционалне српске игре и културне прославе",
    "videos.dance": "Игра",
    "videos.festival": "Карасауга Фестивал",
    
    // Photos
    "photos.title": "Фото",
    "photos.gallery": "Галерија",
    "photos.subtitle": "Снимци тренутака са наших наступа, фестивала и друштвених окупљања",
    "photos.all": "Све",
    "photos.performance": "Наступ",
    "photos.costumes": "Ношње",
    "photos.community": "Заједница",
    "photos.behind": "Иза Сцене",
    
    // Footer
    "footer.about": "Прослављамо српску културу кроз традиционалну игру, музику и заједницу од нашег оснивања.",
    "footer.contact": "Контактирајте Нас",
    "footer.schedule": "Распored Вежби",
    "footer.thursday": "Сваког Четвртка",
    "footer.time": "5:30 увече - 9:00 увече",
    "footer.new.dancers": "Нови играчи добродошли!",
    "footer.rights": "© 2025 Свети Сава Опленац Фолкорна Група. Сва Права Задржана.",
  },
  en: {
    // Hero
    "hero.celebrate": "Celebrate",
    "hero.serbian.culture": "Serbian Culture",
    "hero.subtitle": "Explore the vibrant traditions of Sv Sava Oplenac Folklorna Grupa through dance, music, and community",
    "hero.explore": "Explore Gallery",
    "hero.photos": "View Photos",
    
    // Cultural Showcase
    "showcase.title": "Our",
    "showcase.cultural": "Cultural Identity",
    "showcase.subtitle": "Celebrating Serbian heritage through dance, music, and tradition",
    "showcase.dance.together": "Together Let's Dance Joyfully",
    "showcase.dance.together.en": "Заједно заиграјмо весело",
    "showcase.tradition": "Tradition is Being Built",
    "showcase.tradition.en": "Традиција се гради",
    "showcase.strength": "Dancing and Singing with Strength",
    "showcase.strength.en": "Снажно се игра и пјева",
    "showcase.kolo": "We Dance the Kolo",
    "showcase.kolo.en": "Играмо коло",
    
    // About Kolo
    "kolo.title": "What is",
    "kolo.kolo": "Kolo?",
    "kolo.unesco": "UNESCO Intangible Cultural Heritage of Humanity",
    "kolo.intro": "is a collective and very popular traditional folk dance in Serbia where a group of people — usually several dozen, at the very least three — hold each other by the hands or around the waist dancing, ideally in a circle, hence the name.",
    "kolo.connected": "Kolo is connected with beliefs and rituals of the Serbs, like the Koledo (winter solstice) and the old Kolo (wheel, ring) ritual celebrating the new year with solar symbolism. The water used in these ceremonies bathes \"Božić\" (young god) — in Serbian, \"Bog\" means god and \"ić\" means small, young.",
    "kolo.quote": "\"Kolo dance represents a powerful symbol of Serbian national identity and mutual connectivity. The ring symbolizes the closed Universum, and our art includes round forms and music vibrations in the same form.\"",
    "kolo.quote.author": "— Blagoje Misic",
    "kolo.balkans": "The kolo dance is performed from the Balkans to the Baltic Sea, from the East through Dniester. It has always symbolized the nation's unity on common ideals and wishes — a continual and unbreakable line which makes unity and collective spirit of our people.",
    "kolo.characteristics": "Dance Characteristics",
    "kolo.rhythms": "Rhythms: 2/8, 7/8, or 9/8 depending on regional variations",
    "kolo.instruments": "Instruments: Accordion, frula, tamburica, or harmonica",
    "kolo.movement": "Almost no movement above the waist — the art is in the footwork",
    "kolo.simple": "Simple to learn, but virtuosity comes from ornamental elements and syncopation",
    
    // Join Us
    "join.title": "Join Our",
    "join.group": "Folklorna Grupa",
    "join.subtitle": "We are always accepting new dancers, from beginners to adults. All are welcome to join our family!",
    "join.all.welcome": "All skill levels welcome",
    "join.location.title": "Practice Location",
    "join.location.church": "St. Sava Serbian Orthodox Church",
    "join.location.description": "Practices held weekly at the church. Meet with Otac Zlatibor as noted for each group.",
    "join.group3": "Group 3",
    "join.group2": "Group 2",
    "join.group1": "Group 1",
    "join.recreational": "Recreational",
    "join.ages.3to7": "Ages 3 to 7",
    "join.ages.8to12": "Ages 8 to 12",
    "join.ages.13plus": "Ages 13+",
    "join.ages.all": "All Ages",
    "join.group3.time": "Weekly practices from 5:30 until 6:30 PM",
    "join.group3.note": "After practice meet with Otac Zlatibor in the church.",
    "join.group2.time": "Weekly practices from 6:30 until 7:30 PM",
    "join.group2.note": "With choreographer + performances as scheduled. Meet Otac Zlatibor before practice at 6 PM.",
    "join.group1.time": "Weekly practices from 7:30 until 9 PM",
    "join.group1.note": "+ performances as scheduled. Meet Otac Zlatibor at 7 PM before your practice.",
    "join.recreational.time": "Coming Soon",
    "join.recreational.note": "Hoping to come in the future. Will be open to all ages! Please feel free to contact us.",
    "join.ready.title": "Ready to Dance?",
    "join.ready.subtitle": "Whether you're a complete beginner or have experience, we welcome you to join our Serbian folk dance community. Come experience the joy of traditional dance, music, and culture!",
    "join.contact": "Contact Us to Join",
    "join.watch": "Watch Our Performances",
    
    // Videos
    "videos.title": "Performance",
    "videos.performances": "Videos",
    "videos.subtitle": "Experience our captivating performances showcasing traditional Serbian dances and cultural celebrations",
    "videos.dance": "Dance",
    "videos.festival": "Carassauga Festival",
    
    // Photos
    "photos.title": "Photo",
    "photos.gallery": "Gallery",
    "photos.subtitle": "Capturing moments from our performances, festivals, and community gatherings",
    "photos.all": "All",
    "photos.performance": "Performance",
    "photos.costumes": "Costumes",
    "photos.community": "Community",
    "photos.behind": "Behind the Scenes",
    
    // Footer
    "footer.about": "Celebrating Serbian culture through traditional dance, music, and community since our establishment.",
    "footer.contact": "Contact Us",
    "footer.schedule": "Practice Schedule",
    "footer.thursday": "Every Thursday",
    "footer.time": "5:30 PM - 9:00 PM",
    "footer.new.dancers": "New dancers welcome!",
    "footer.rights": "© 2025 Sveti Sava Oplenac Folklorna Grupa. All Rights Reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "sr-latin"; // Serbian Latin as default
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
