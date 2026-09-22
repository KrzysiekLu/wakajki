// Dane planu wycieczek — edytuj śmiało, cała strona renderuje się na podstawie tych obiektów.
// lat/lng w WGS84 (stopnie dziesiętne), zgodne z Google Maps i OpenStreetMap.

const HOTEL = {
  name: "Notion Kesre Beach Hotel & Spa",
  address: "Özdere, Menderes, İzmir",
  lat: 37.9923,
  lng: 27.1306,
};

// kind: "hotel-start" | "hotel-end" | "poi" | "meal" | "note"
// alt: opcjonalna alternatywa { name, lat, lng, desc }
// photo / photos: nazwa pliku w img/ (jedno zdjęcie lub tablica)

const TRIPS = [
  {
    id: "wycieczka-1",
    number: 1,
    title: "Wieczór w Kuşadası",
    subtitle: "lekki start",
    color: "trip-1",
    transport: "Taksówka w obie strony (ok. 40 min), żeby nie szukać parkingu.",
    points: [
      {
        kind: "hotel-start",
        time: "16:00",
        name: "Wyjazd z hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "",
      },
      {
        kind: "poi",
        time: "16:45",
        name: "Bazar i stare miasto Kaleiçi",
        lat: 37.8596,
        lng: 27.2579,
        desc: "Uliczki, bazar, warto się targować — handlarze bywają natarczywi.",
        photos: ["kaleici-bazaar.webp", "kaleici-bazaar-2.webp"],
        photoAlt: "Uliczki i bazar w Kaleiçi, Kuşadası",
      },
      {
        kind: "poi",
        time: "18:30",
        name: "Wyspa Gołębia (Güvercinada)",
        lat: 37.8608,
        lng: 27.2545,
        desc: "Twierdza na wysepce połączonej groblą z lądem. Zachód słońca ok. 19:10.",
        photos: ["guvercinada.webp", "guvercinada-2.webp"],
        photoAlt: "Twierdza na Güvercinada w Kuşadası",
      },
      {
        kind: "meal",
        time: "19:45",
        name: "Kolacja: Kuşadası Kebap Evi",
        lat: 37.8559,
        lng: 27.2601,
        desc: "Adana, urfa, beyti. 5 minut pieszo od wyspy.",
        alt: {
          name: "Cağhane",
          lat: 37.8749,
          lng: 27.2730,
          desc: "Cağ kebap (poziomo pieczona jagnięcina). Zamknięte w poniedziałki, ok. 5 min taksówką.",
        },
      },
      {
        kind: "hotel-end",
        time: "wieczorem",
        name: "Powrót do hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "Powrót taksówką.",
      },
    ],
  },
  {
    id: "wycieczka-2",
    number: 2,
    title: "Efez, Selçuk i Şirince",
    subtitle: "najważniejszy dzień",
    color: "trip-2",
    transport: "Auto na jeden dzień albo taksówka z kierowcą na cały dzień.",
    points: [
      {
        kind: "hotel-start",
        time: "7:45",
        name: "Wyjazd z hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "Dojazd do Efezu ok. 35–40 min.",
      },
      {
        kind: "poi",
        time: "8:30",
        name: "Efez",
        lat: 37.9409,
        lng: 27.3415,
        desc: "Wejście górną bramą (Upper Gate), zwiedzanie w dół do Biblioteki Celsusa i teatru. Warto być przed 9:00, zanim przyjadą autokary z wycieczkowców. Zabierz wodę, czapkę i wygodne buty — mało cienia. Śr–sob antyczne miasto otwarte także wieczorem 19:00–22:00.",
        photos: ["efes-biblioteka-celsusa.webp", "efes-teatr.webp"],
        photoAlt: "Biblioteka Celsusa i Wielki Teatr w Efezie",
      },
      {
        kind: "poi",
        time: "10:00",
        name: "Domy na zboczu (Terrace Houses)",
        lat: 37.9382,
        lng: 27.3414,
        desc: "Osobny bilet. Mozaiki i freski. Otwarte 9:00–16:30.",
        photos: ["efes-domy-na-zboczu.webp", "efes-domy-na-zboczu-2.webp"],
        photoAlt: "Mozaiki w Domach na zboczu w Efezie",
      },
      {
        kind: "meal",
        time: "12:30",
        name: "Obiad: Tolga Çöp Şiş, Selçuk",
        lat: 37.9514,
        lng: 27.3700,
        desc: "Çöp şiş — lokalny specjał Selçuk.",
        alt: {
          name: "Petek Çöp Şiş",
          lat: 37.9482,
          lng: 27.3681,
          desc: "Przy Muzeum Efezu.",
        },
      },
      {
        kind: "poi",
        time: "13:45",
        name: "Bazylika św. Jana",
        lat: 37.9530,
        lng: 27.3670,
        desc: "W bilecie także zamek Ayasuluk. 5 minut pieszo od miejsca obiadu.",
        photos: ["bazylika-sw-jana.webp", "bazylika-sw-jana-2.webp"],
        photoAlt: "Ruiny Bazyliki św. Jana i zamek Ayasuluk w Selçuk",
      },
      {
        kind: "poi",
        time: "15:15",
        name: "Şirince",
        lat: 37.9441,
        lng: 27.4316,
        desc: "Kamienna górska wioska, wina owocowe. 15 minut autem z Selçuk.",
        photos: ["sirince.webp", "sirince-2.webp"],
        photoAlt: "Widok na wioskę Şirince",
      },
      {
        kind: "hotel-end",
        time: "17:30",
        name: "Powrót do hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "Dojazd ok. 45 min.",
      },
    ],
  },
  {
    id: "wycieczka-3",
    number: 3,
    title: "Pamukkale",
    subtitle: "cały dzień",
    color: "trip-3",
    transport: "Wycieczka zorganizowana z odbiorem spod hotelu (ok. 3 h w jedną stronę). Sprawdź przy zakupie, czy obiad jest w cenie.",
    points: [
      {
        kind: "hotel-start",
        time: "6:00",
        name: "Odbiór spod hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "",
      },
      {
        kind: "poi",
        time: "9:30",
        name: "Hierapolis i trawertyny Pamukkale",
        lat: 37.9249,
        lng: 29.1232,
        desc: "Na białych tarasach zdejmuje się buty. Kąpielówki przydadzą się na Basen Kleopatry (płatny osobno). Krem z filtrem — białe skały mocno odbijają słońce.",
        photos: ["pamukkale.webp", "hierapolis.webp"],
        photoAlt: "Białe trawertyny Pamukkale i ruiny antycznego teatru w Hierapolis",
      },
      {
        kind: "hotel-end",
        time: "ok. 20:00–21:00",
        name: "Powrót do hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "",
      },
    ],
  },
  {
    id: "wycieczka-4",
    number: 4,
    title: "Didyma",
    subtitle: "opcjonalnie",
    color: "trip-4",
    transport: "Auto, ok. 1 h 45 min w jedną stronę. Po drodze można dorzucić Priene i Milet (sprawdź trasę na miejscu — nie mamy tu ich współrzędnych).",
    points: [
      {
        kind: "hotel-start",
        time: "8:30",
        name: "Wyjazd z hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "",
      },
      {
        kind: "poi",
        time: "10:15",
        name: "Świątynia Apollina w Didymie",
        lat: 37.3853,
        lng: 27.2573,
        desc: "Ok. godziny zwiedzania. Knajpki naprzeciwko wejścia.",
        photos: ["didyma.webp", "didyma-2.webp"],
        photoAlt: "Kolumny Świątyni Apollina w Didymie",
      },
      {
        kind: "hotel-end",
        time: "po zwiedzaniu",
        name: "Powrót do hotelu",
        lat: HOTEL.lat,
        lng: HOTEL.lng,
        desc: "Trasa powrotna jak dojazd, ok. 1 h 45 min.",
      },
    ],
  },
];

const KEBABS = [
  {
    name: "Zelişhan",
    place: "Özdere",
    lat: 38.0216,
    lng: 27.0926,
    desc: "Döner, iskender, mantı. Usiądź z tyłu — widok na morze. Sprawdzaj rachunek.",
  },
  {
    name: "Mahmut Usta",
    place: "Özdere",
    lat: 38.0155,
    lng: 27.1272,
    desc: "Mały rodzinny lokal, pide i lahmacun. Otwiera po 17:00 — najpierw zadzwoń: +90 542 229 80 33. Tylko gotówka.",
    phone: "+905422298033",
  },
  {
    name: "Yuva Yorgo",
    place: "Özdere",
    lat: 37.9992,
    lng: 27.1217,
    desc: "Najbliżej hotelu. Szaszłyki z jagnięciny.",
  },
];

const TRANSPORT_INFO = {
  intro:
    "Hotel leży ok. 30 km na północ od Kuşadası. Do żadnej z opisanych tu wycieczek (Kuşadası, Efez, Pamukkale, Didyma) nie dojedziesz komunikacją miejską — liczą się trzy opcje:",
  options: [
    {
      title: "Auto z wypożyczalni",
      desc: "Podstawienie samochodu bezpośrednio pod hotel. Najwygodniejsze przy kilku wycieczkach z własnym tempem zwiedzania.",
    },
    {
      title: "Taksówka z recepcji",
      desc: "Cenę ustal z kierowcą przed kursem. Przy Efezie warto umówić tego samego kierowcę na powrót, żeby nie szukać transportu po zwiedzaniu.",
    },
    {
      title: "Wycieczki zorganizowane z hotelu",
      desc: "Dobre rozwiązanie na dalsze trasy (np. Pamukkale), gdzie odbiór i powrót są w cenie.",
    },
  ],
  bus: {
    title: "Autobus miejski (ESHOT) — do Özdere i İzmiru, nie do wycieczek",
    desc:
      "Przy Özdere (dzielnica dawniej zwana Kesre — stąd nazwa hotelu) zatrzymuje się linia ESHOT 775 " +
      "(Özdere ↔ Cumaovası Aktarma Merkezi, co ok. 30 min, pierwszy kurs 5:50, ostatni 00:00) oraz linia 778 " +
      "(Özdere ↔ Ürkmez, co ok. 60–70 min, 6:00–22:00). Dokładny przystanek najbliżej hotelu sprawdź na miejscu " +
      "(np. w recepcji albo w aplikacji Moovit) — nie mamy pewności, że jest dosłownie przy bramie. " +
      "Z Cumaovası jedzie się dalej (İZBAN/inne linie ESHOT) w stronę İzmiru i lotniska Adnan Menderes — " +
      "przydatne np. na tani dojazd na lotnisko. Żadna z tych linii NIE jedzie do Kuşadası, Selçuk/Efezu, " +
      "Pamukkale ani Didymy — to inne województwo (Aydın/Denizli) obsługiwane przez innych przewoźników, " +
      "więc do wycieczek nadal potrzebujesz auta, taksówki albo zorganizowanej wycieczki.",
  },
};

const WEEK_PLAN = [
  { day: "Dzień 2", plan: "Wycieczka 1 — Kuşadası" },
  { day: "Dzień 3", plan: "Wycieczka 2 — Efez, Selçuk, Şirince" },
  { day: "Dzień 4", plan: "Odpoczynek" },
  { day: "Dzień 5", plan: "Wycieczka 3 — Pamukkale" },
  { day: "Dalej", plan: "Plaża albo Wycieczka 4 — Didyma" },
];
const WEEK_PLAN_NOTE = "Nie rób dwóch dużych wycieczek dzień po dniu.";

const PRACTICAL_INFO = {
  weather: "Koniec września: ok. 25–28°C, ciepłe morze.",
  sunrise: "Wschód słońca ok. 7:15",
  sunset: "Zachód słońca ok. 19:10",
  note: "Godziny otwarcia i ceny biletów sprawdź przed wyjazdem — mogą się zmieniać.",
};

// Źródła zdjęć — uzupełniane automatycznie przy pobieraniu z Wikimedia Commons.
const PHOTO_CREDITS = [
  {
    slug: "kaleici-bazaar",
    title: 'Shop with "Genuine Fake Watches" Sign in Kuşadası, Türkiye',
    author: "Julian Lupyan",
    license: "CC0 1.0 (domena publiczna)",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Shop_with_%22Genuine_Fake_Watches%22_Sign_in_Ku%C5%9Fadas%C4%B1,_T%C3%BCrkiye.jpg",
  },
  {
    slug: "guvercinada",
    title: "Güvercinada Castle, Kuşadası",
    author: "Koray",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:G%C3%BCvercinada_Castle,_Ku%C5%9Fadas%C4%B1.jpg",
  },
  {
    slug: "efes-biblioteka-celsusa",
    title: "Ephesus - Celsus Library",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ephesus_-_Celsus_Library.jpg",
  },
  {
    slug: "efes-teatr",
    title: "Ephesus Great Theatre, theatre building view (2011)",
    author: "Dosseman",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ephesus_Great_Theatre_theatre_building_view_in_2011_3814.jpg",
  },
  {
    slug: "efes-domy-na-zboczu",
    title: "Mosaics, Terrace Houses of Ephesus",
    author: "Warren LeMay",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mosaics,_Terrace_Houses_of_Ephesus,_Ephesus_Archaeological_Site,_Selcuk,_Turkiye_(53526893827).jpg",
  },
  {
    slug: "bazylika-sw-jana",
    title: "Saint John's Basilica, Seljuk",
    author: "Hugh Llewelyn",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Saint_John%27s_Basilica,_Seljuk.jpg",
  },
  {
    slug: "sirince",
    title: "View of Sirince",
    author: "Lastradadeisogni",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:View_of_Sirince.jpg",
  },
  {
    slug: "pamukkale",
    title: "The travertine terraces of Pamukkale (4)",
    author: "Slyronit",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_travertine_terraces_of_Pamukkale_4.jpg",
  },
  {
    slug: "hierapolis",
    title: "The Roman theatre, Hierapolis, Turkey",
    author: "Carole Raddato",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Roman_theatre,_built_in_the_2nd_century_AD_under_Hadrian_on_the_ruins_of_an_earlier_theatre,_later_renovated_under_Septimius_Severus,_Hierapolis,_Turkey_(16569014063).jpg",
  },
  {
    slug: "didyma",
    title: "Temple of Apollo, Didyma (01)",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Temple_of_Apollo,_Didyma_01.jpg",
  },
  {
    slug: "kaleici-bazaar-2",
    title: "Street in Kusadasi",
    author: "Karahoda",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Street_in_Kusadasi.JPG",
  },
  {
    slug: "guvercinada-2",
    title: "Top of Güvercinada Kalesi",
    author: "Finnfrog99",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Top_of_G%C3%BCvercinada_Kalesi.jpg",
  },
  {
    slug: "efes-domy-na-zboczu-2",
    title: "Mosaics, Terrace Houses of Ephesus (53527972358)",
    author: "Warren LeMay",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mosaics,_Terrace_Houses_of_Ephesus,_Ephesus_Archaeological_Site,_Selcuk,_Turkiye_(53527972358).jpg",
  },
  {
    slug: "bazylika-sw-jana-2",
    title: "Ayasuluk Castle, Selcuk",
    author: "Hugh Llewelyn",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ayasuluk_Castle,_Selcuk_-_50262848683.jpg",
  },
  {
    slug: "sirince-2",
    title: "Şirince, visible city",
    author: "Helen Owl",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%C5%9Eirince,_visible_city.jpg",
  },
  {
    slug: "didyma-2",
    title: "Temple of Apollo, Didyma - Columns 04",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Temple_of_Apollo,_Didyma_-_Columns_04.jpg",
  },
];
