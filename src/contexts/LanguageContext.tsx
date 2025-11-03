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
    
    // History
    "history.back": "Nazad na Početnu",
    "history.title": "Naša Istorija",
    "history.intro.p1": "Priča o Sv. Sava Oplenac Folklornom Ansamblu započela je kada je naša Matična Crkva, Sv. Sava i hol crkve izgrađen na uglu ulica Gerrad i River u Torontu. Hol crkve je izgrađen i posvećen 5. septembra 1954. godine od strane tadašnjeg Vladike Nikolaja Velimirovića Ohridskog i Žičkog, koji je kanonizovan u svetitelje 24. maja 2003. godine od strane Svetog Sinoda Srpske Pravoslavne Crkve. Crkva je završena i posvećena 22. maja 1955. godine. Ovo je bio monumentalan trenutak za srpsku zajednicu u Torontu i za narednih 7 decenija.",
    "history.intro.p2": "Život oko Crkve je počeo da cveta kada su bivši članovi Omladinskog Kluba Šumadija osnovali Hor Srpske Pravoslavne Crkve Sv. Sava 22. februara 1955. godine. Prvi dirigent bila je Betty Labash Kovach, koja je vodila hor 20 godina.",
    "history.intro.p3": "Crkva Sv. Sava je formirala versku školu 1956. godine, koja je imala četiri razreda i 84 učenika do 1965. godine.",
    "history.groups.intro": "U narednim godinama, tri juniorske grupe su stvorene sve pod okriljem Hora Sv. Sava:",
    "history.groups.choir": "Juniorski Hor Sv. Sava je stvoren 1961. godine sa 40 mladih glasova, pod vođstvom Mirjane Dragašević.",
    "history.groups.tamburica": "Do 1962. Juniorska Tamburica Grupa Sv. Sava je formirana sa preko 20 mladih tamburaša, pod vođstvom Đorđa Joksimovića, a kasnije Baće Kiurskog.",
    "history.groups.folklore": "Takođe 1962. godine, Juniorska Folklorna Grupa Sv. Sava je formirana sa prvim direktorom Dragoslavom Radosavljevićem.",
    "history.strazilovo.p1": "Prva Seniorska Folklorna Grupa Stražilovo je osnovana 1954. godine, a njen koreograf bio je Radisav Dodić, kasnije zamenjen Dragoslavom Radosavljevićem.",
    "history.strazilovo.p2": "Folklorna grupa Stražilovo je igrala na BBC programu pod nazivom 'The Song of My People', nastupala je u Massey Hall-u i Exhibition Place-u, na istoj bini gde su nastupali Frank Sinatra i Bob Hope.",
    "history.caravan.p1": "Torontski Multikulturalni Festival Caravan je osnovan 1968. godine od strane Leon i Zene Kossar kao devetodnevni događaj u čast kulturne raznolikosti grada. Crkva Sv. Sava je učestvovala u ovom događaju i nazvala hol crkve Oplenac Paviljon za ovu priliku. Juniorska Folklorna Grupa Sv. Sava je postala neaktivna početkom 70-ih i nova igračka grupa, Oplenac, je formirana 1974. godine. Ovi rani dani bili su inspirisani snažnom željom da se stvori zajednica za buduće generacije, gde bi mogli da sačuvaju veru, jezik, kulturu i tradicije. Svi su volontirali svoje vreme i majke su same šile folklorne kostime da podrže igračku grupu.",
    "history.caravan.p2": "Učešće na Caravanu predstavljalo je ključni način za prikazivanje ogromnog srpskog folklornog nasleđa kanadskoj javnosti. Igračke predstave su evoluirale od jednostavne seljačke igre do nivoa čiste umetnosti u današnjim izvođačkim spektaklima. Sa dolaskom nekoliko novih koreografa iz Srbije tokom 1990-ih, nove šarene i raznolike koreografije su uvedene na srpsko-kanadsku scenu. Većina novih instruktora igre donela je sa sobom bogatstvo znanja stečeno nastupima sa prestižnim folklornim udruženjima u Srbiji. Poštovani i jedini profesionalni Nacionalni Ansambl KOLO iz Beograda proizveo je izuzetne igrače koji su kasnije postali instruktori igre i koreografi.",
    "history.mississauga": "Kako je srpska populacija u GTA rasla, tako su rasle i njihove potrebe za više prostora i većom crkvom. Crkvena Kongregacija Sveti Sava je imala priliku i kupila je imanje na Dundas i Dixie Road u Mississaugi 3. juna 1983. godine. Renoviranje vladine zgrade koja će postati Srpski Centar u Mississaugi završeno je 1984. godine. Srpski Centar u Mississaugi postao je kulturni i društveni centar za sve Srbe uključujući pridošlice iz 1990-ih. Takođe je postao novi dom za Folklornu Grupu Oplenac gde se njeno članstvo utrostručilo. Folklorno igranje je bilo sredstvo za kulturno obrazovanje, društvenu aktivnost, gde su deca mogla da rastu u bezbednom okruženju i nauče o svojoj veri, tradicijama i srpskom identitetu. Monumentalna Crkva Svih Srpskih Svetitelja Srpske Pravoslavne Crkve je izgrađena i posvećena u junu 2002. i predstavlja orijentir u Mississaugi po svojoj lepoti i stilu.",
    "history.performances": "Folklorna Grupa Oplenac nastavila je da neguje kolektivni srpski identitet kroz svoje nastupe. Nastupali su na Expo-u 1986. u Vankuveru, na posvećenju naše parohije Crkve Svih Srpskih Svetitelja u junu 2002, putovali su u Srbiju nekoliko puta i organizovali mnoge folklorističke događaje, uključujući godišnji ručak za prikupljanje sredstava za Manastir Sveta Petka blizu Paraćina, Srbija, gde starije kaluđerice brinu o 80 odraslih osoba sa invaliditetom. Oplenac je bio radost gledati kako nastupa na posvećenju naše crkve 2002. godine, trodnevnom događaju, kada su naši igrači proveli bezbroj sati pripremajući se za ovaj jedinstveni događaj. Takođe, naša grupa je preuzela organizaciju godišnje multikulturalne proslavе vikenda pod nazivom Carassauga i osvojila je mnoge prestižne nagrade uključujući nekoliko za najbolju izložbenu prostoriju naše srpske kulture i tradicija.",
    "history.nameChange": "Inicijativa za promenu naziva folklorne grupe Oplenac je predložena 2017. godine. Razlog je bio da se izbegne zabuna između dve grupe sa istim imenom u istom gradu. Odlučeno je da se zadrži deo Oplenac i doda njegovo prvobitno ime Sv. Sava. Zato je današnji naziv grupe Folklorna Grupa Sv. Sava Oplenac.",
    "history.conclusion": "Folklorna Grupa Sv. Sava Oplenac je prošla kroz nekoliko reorganizacija tokom svog postojanja, ali je uspela da napreduje i folklorno igranje je postalo najpopularnija aktivnost zahvaljujući podršci naše dece, roditelja i zajednice. Srpska Pravoslavna Crkva je odigrala značajnu ulogu u razvoju organizacije. Dok su druge igračke grupe granale dalje od crkve, Sveti Sava Oplenac je ostao snažno povezan. Kulturni rast i očuvanje zajednice u celini bili bi nemogući bez crkve.",
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
    
    // History
    "history.back": "Назад на Почетну",
    "history.title": "Наша Историја",
    "history.intro.p1": "Прича о Св. Сава Опленац Фолклорном Ансамблу започела је када је наша Матична Црква, Св. Сава и хол цркве изграђен на углу улица Gerrard и River у Торонту. Хол цркве је изграђен и посвећен 5. септембра 1954. године од стране тадашњег Владике Николаја Велимировића Охридског и Жичког, који је канонизован у светитеље 24. маја 2003. године од стране Светог Синода Српске Православне Цркве. Црква је завршена и посвећена 22. маја 1955. године. Ово је био монументалан тренутак за српску заједницу у Торонту и за наредних 7 деценија.",
    "history.intro.p2": "Живот око Цркве је почео да цвета када су бивши чланови Омладинског Клуба Шумадија основали Хор Српске Православне Цркве Св. Сава 22. фебруара 1955. године. Први диригент била је Betty Labash Kovach, која је водила хор 20 година.",
    "history.intro.p3": "Црква Св. Сава је формирала верску школу 1956. године, која је имала четири разреда и 84 ученика до 1965. године.",
    "history.groups.intro": "У наредним годинама, три јуниорске групе су створене све под окриљем Хора Св. Сава:",
    "history.groups.choir": "Јуниорски Хор Св. Сава је створен 1961. године са 40 младих гласова, под вођством Мирјане Драгашевић.",
    "history.groups.tamburica": "До 1962. Јуниорска Тамбурица Група Св. Сава је формирана са преко 20 младих тамбураша, под вођством Ђорђа Јоксимовића, а касније Баће Киурског.",
    "history.groups.folklore": "Такође 1962. године, Јуниорска Фолклорна Група Св. Сава је формирана са првим директором Драгославом Радосављевићем.",
    "history.strazilovo.p1": "Прва Сениорска Фолклорна Група Стражилово је основана 1954. године, а њен кореограф био је Радисав Додић, касније замењен Драгославом Радосављевићем.",
    "history.strazilovo.p2": "Фолклорна група Стражилово је играла на BBC програму под називом 'The Song of My People', наступала је у Massey Hall-у и Exhibition Place-у, на истој бини где су наступали Frank Sinatra и Bob Hope.",
    "history.caravan.p1": "Торонтски Мултикултурални Фестивал Caravan је основан 1968. године од стране Leon и Zene Kossar као деветодневни догађај у част културне разноликости града. Црква Св. Сава је учествовала у овом догађају и назвала хол цркве Опленац Павиљон за ову прилику. Јуниорска Фолклорна Група Св. Сава је постала неактивна почетком 70-их и нова играчка група, Опленац, је формирана 1974. године. Ови рани дани били су инспирисани снажном жељом да се створи заједница за будуће генерације, где би могли да сачувају веру, језик, културу и традиције. Сви су волонтирали своје време и мајке су саме шиле фолклорне костиме да подрже играчку групу.",
    "history.caravan.p2": "Учешће на Caravanu представљало је кључни начин за приказивање огромног српског фолклорног наслеђа канадској јавности. Играчке представе су еволуирале од једноставне сељачке игре до нивоа чисте уметности у данашњим извођачким спектаклима. Са доласком неколико нових кореографа из Србије током 1990-их, нове шарене и разноврсне кореографије су уведене на српско-канадску сцену. Већина нових инструктора игре донела је са собом богатство знања стеченог наступима са престижним фолклорним удружењима у Србији. Поштовани и једини професионални Национални Ансамбл КОЛО из Београда произвео је изузетне играче који су касније постали инструктори игре и кореографи.",
    "history.mississauga": "Како је српска популација у GTA расла, тако су расле и њихове потребе за више простора и већом црквом. Црквена Конгрегација Свети Сава је имала прилику и купила је имање на Dundas и Dixie Road у Mississaugi 3. јуна 1983. године. Реновирање владине зграде која ће постати Српски Центар у Mississaugi завршено је 1984. године. Српски Центар у Mississaugi постао је културни и друштвени центар за све Србе укључујући придошлице из 1990-их. Такође је постао нови дом за Фолклорну Групу Опленац где се њено чланство утростручило. Фолклорно играње је било средство за културно образовање, друштвену активност, где су деца могла да расту у безбедном окружењу и науче о својој вери, традицијама и српском идентитету. Монументална Црква Свих Српских Светитеља Српске Православне Цркве је изграђена и посвећена у јуну 2002. и представља оријентир у Mississaugi по својој лепоти и стилу.",
    "history.performances": "Фолклорна Група Опленац наставила је да негује колективни српски идентитет кроз своје наступе. Наступали су на Expo-у 1986. у Ванкуверу, на посвећењу наше парохије Цркве Свих Српских Светитеља у јуну 2002, путовали су у Србију неколико пута и организовали многе фолклористичке догађаје, укључујући годишњи ручак за прикупљање средстава за Манастир Света Петка близу Параћина, Србија, где старије калуђерице брину о 80 одраслих особа са инвалидитетом. Опленац је био радост гледати како наступа на посвећењу наше цркве 2002. године, тродневном догађају, када су наши играчи провели безброј сати припремајући се за овај јединствени догађај. Такође, наша група је преузела организацију годишње мултикултуралне прославе викенда под називом Carassauga и освојила је многе престижне награде укључујући неколико за најбољу излож��ену просторију наше српске културе и традиција.",
    "history.nameChange": "Иницијатива за промену назива фолклорне групе Опленац је предложена 2017. године. Разлог је био да се избегне забуна између две групе са истим именом у истом граду. Одлучено је да се задржи део Опленац и дода његово првобитно име Св. Сава. Зато је данашњи назив групе Фолклорна Група Св. Сава Опленац.",
    "history.conclusion": "Фолклорна Група Св. Сава Опленац је прошла кроз неколико реорганизација током свог постојања, али је успела да напредује и фолклорно играње је постало најпопуларнија активност захваљујући подршци наше деце, родитеља и заједнице. Српска Православна Црква је одиграла значајну улогу у развоју организације. Док су друге играчке групе гранале даље од цркве, Свети Сава Опленац је остао снажно повезан. Културни раст и очување заједнице у целини били би немогући без цркве.",
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
    
    // History
    "history.back": "Back to Home",
    "history.title": "Our History",
    "history.intro.p1": "The story of Saint Sava Oplenac Folklore Ensemble began when our Mother Church, Saint Sava and the parish hall were built at the corner of Gerrad and River Streets in Toronto. The parish hall was built and consecrated on September 5th, 1954 by, then, Vladika Nikolaj Velimirović of Ohrid and Žiča, who was canonized into sainthood on May 24, 2003 by the Holy Synod of the Serbian Orthodox Church. The church was finished and consecrated on May 22, 1955. This was a monumental point in time for the Serbian community in Toronto and for the following 7 decades.",
    "history.intro.p2": "Life around the Church began to blossom when the former Youth Club Šumadija members founded Saint Sava Serbian Orthodox Church Choir on February 22, 1955. The first conductor was Betty Labash Kovach, who directed the choir for 20 years.",
    "history.intro.p3": "The Saint Sava church formed a Sunday school in 1956, which had four grades and 84 students by 1965.",
    "history.groups.intro": "In the following years, three junior groups were created all under the umbrella of the St. Sava Choir:",
    "history.groups.choir": "The Saint Sava Junior Choir was created in 1961 with 40 young voices, directed by Mirjana Dragašević.",
    "history.groups.tamburica": "By 1962 The Saint Sava Junior Tamburica Group was formed with over 20 young tamburaši, directed by Đorđe Joksimović, and later Baća Kiurski.",
    "history.groups.folklore": "Also in 1962, the Saint Sava Junior Folklore Group was formed with the first director Dragoslav Radosavljević.",
    "history.strazilovo.p1": "The first Senior Folklore Group Stražilovo was founded 1954, and its choreographer was Radisav Dodić, later replaced by Dragoslav Radosavljević.",
    "history.strazilovo.p2": "The folklore group Stražilovo danced at the BBC program called 'The Song of My People', performed at Massey Hall and Exhibition Place, on the same stage where Frank Sinatra and Bob Hope performed.",
    "history.caravan.p1": "Toronto's Multicultural Festival Caravan was established in 1968 by Leon and Zena Kossar as a nine day event to celebrate the cultural diversity of the city. Saint Sava Church took part in this event and named the parish hall the Oplenac Pavilion for this occasion. The Saint Sava Junior Folklore Group became inactive in the early 70s and a new dance group, Oplenac was formed in 1974. These early days were inspired by a strong desire to create a community for future generations, where they could preserve faith, language, culture and traditions. Everyone volunteered their time and mothers sewed folklore costumes themselves to support the dance group.",
    "history.caravan.p2": "Caravan participation presented a key vehicle in showcasing an enormous Serbian folklore heritage to the Canadian public. The dance performances evolved from a simple peasant dance to the level of pure art in today's performing spectacles. With the arrival of several new choreographers from Serbia in the 1990s, new colourful and diversified choreographies were introduced to the Serbian-Canadian scene. Most of the new dance instructors brought with them a wealth of knowledge acquired by performing with prestigious folklore associations in Serbia. The respected and only professional National Ensemble KOLO from Belgrade produced exceptional dancers who later became dance instructors and choreographers.",
    "history.mississauga": "As the Serbian population in the GTA grew, so did their needs for more space and a larger church. The Church Congregation Sveti Sava had an opportunity and purchased a property at Dundas and Dixie Road in Mississauga on June 3, 1983. Renovation of the government building that would become the Serbian Centre in Mississauga was completed in 1984. The Serbian Centre in Mississauga became a cultural and networking hub for all Serbs including newcomers from the 1990s. It also became a new home for the Oplenac Folklore Group where its membership tripled in size. Folk dancing was a vehicle for cultural education, social activity, where children could grow in a safe environment and learn about their faith, traditions and Serbian identity. The monumental All Serbian Saints Serbian Orthodox Church was built and consecrated in June 2002 and represents a landmark in Mississauga for its beauty and style.",
    "history.performances": "The Oplenac Folklore Ensemble continued to nurture a collective Serbian identity through their performances. They performed at Expo in 1986 in Vancouver, the Consecration of our parish's All Serbian Saints Serbian Orthodox Church in June 2002, travelled to Serbia several times and hosted many folk-fest events, including the annual fundraising lunch for the Saint Petka Monastery near Paraćin, Serbia, where elderly nuns are taking care of 80 adult disabled individuals. Oplenac was a joy to watch perform at the 2002 consecration of our church, a 3 day event, when our dancers spent countless hours preparing for this once-in-a-lifetime event. Also, our group took up the organization of the annual multicultural weekend celebration called Carassauga and has won many prestigious awards including several for the best display room of our Serbian culture and traditions.",
    "history.nameChange": "Initiative to change the Oplenac folklore group's name was proposed in 2017. The reason was to avoid confusion between the two groups with the same name in the same town. It was decided to keep the Oplenac part and add its original name of Saint Sava. This is why today's group name is Saint Sava Oplenac Folklore Ensemble.",
    "history.conclusion": "Saint Sava Oplenac Folklore Ensemble has gone through several reorganizations during its existence, but has managed to progress and folk-dancing became the most popular activity thanks to the support of our children, parents and community. The Serbian Orthodox church has played a significant role in the development of the organization. While other dance groups were branching away from the church, Sveti Sava Oplenac has stayed strongly connected. Cultural growth and preservation of the community as a whole would be impossible without the church.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    // Migrate old "sr" value to "sr-latin"
    if (saved === "sr") {
      localStorage.setItem("language", "sr-latin");
      return "sr-latin";
    }
    // Validate the saved language exists in translations
    if (saved && (saved === "sr-latin" || saved === "sr-cyrillic" || saved === "en")) {
      return saved as Language;
    }
    return "sr-latin"; // Serbian Latin as default
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    // Fallback to sr-latin if language doesn't exist in translations
    const langTranslations = translations[language] || translations["sr-latin"];
    return langTranslations[key] || key;
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
