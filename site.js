(() => {
  if (window.__clipperSiteInitialized) return;
  window.__clipperSiteInitialized = true;

  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuPanel = mobileMenu?.querySelector(".menu-panel");
  const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']") ?? [];
  const whatsappNumber = "393662457460";
  const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
  const backgroundRegions = [document.querySelector("main"), document.querySelector(".site-footer")].filter(Boolean);
  let lastFocusedElement = null;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const resetInitialHeroScroll = () => {
    const hash = window.location.hash;
    const isMobileViewport = window.matchMedia?.("(max-width: 760px)")?.matches ?? window.innerWidth <= 760;
    if (hash && hash !== "#top") {
      if (!isMobileViewport) return;
      window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const scheduleInitialHeroScrollReset = () => {
    resetInitialHeroScroll();
    window.requestAnimationFrame(resetInitialHeroScroll);
    window.setTimeout(resetInitialHeroScroll, 80);
    window.setTimeout(resetInitialHeroScroll, 260);
  };

  scheduleInitialHeroScrollReset();
  window.addEventListener("pageshow", scheduleInitialHeroScrollReset);
  window.addEventListener("load", scheduleInitialHeroScrollReset, { once: true });

  const translations = {
    it: {
      skip: "Vai al contenuto",
      "nav.restaurant": "Ristorante",
      "nav.location": "Location",
      "nav.services": "Servizi",
      "nav.reviews": "Recensioni",
      "nav.contacts": "Contatti",
      "cta.book": "Prenota",
      "cta.bookTable": "Prenota un tavolo",
      "cta.menu": "Scopri il nostro menu",
      "cta.wine": "Carta dei Vini",
      "cta.call": "Chiama ora",
      "card.food": "Menu",
      "card.wine": "Carta dei Vini",
      "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. *Alimento surgelato/congelato: in mancanza del prodotto fresco verra' usato un prodotto surgelato di qualita'. Mezze porzioni: 30% sul prezzo.",
      "card.wineNote": "Etichette e annate possono variare secondo disponibilita'. Chiedi al personale il suggerimento del giorno.",
      "hero.overline": "Ristorante di mare",
      "hero.hours": "<span>PRANZO, CENA &amp; CONVIVIALITA'</span> CUCINA LIGURE - PESCE - VINI",
      "hero.edge": "Cucina ligure & mare",
      "hero.discover": "Scopri Il Clipper",
      "restaurant.kicker": "01 Ristorante",
      "restaurant.copy1": "Cucina ligure e specialita' di mare in un ristorante accogliente nel cuore di Bogliasco.",
      "restaurant.copy2": "Una tavola semplice, curata e conviviale per pranzo, cena e serate sul Golfo Paradiso.",
      "restaurant.mobileCopy": "Cucina ligure e pesce nel cuore di Bogliasco.",
      "food.catch": "Plateau di mare",
      "food.pasta": "Crudo di mare",
      "food.stockfish": "Ostriche e limone",
      "food.grill": "Spaghetti alle vongole",
      "food.fish": "Filetto delicato",
      "food.specialPasta": "Pasta mediterranea",
      "food.dessert": "Calamarata di mare",
      "food.rawSelection": "Selezione di crudi",
      "food.clams": "Spaghetti alle vongole",
      "food.pistachioPasta": "Pistacchio e gambero",
      "food.seafoodSalad": "Insalata di mare",
      "food.octopus": "Polpo arrostito",
      "food.tartare": "Tris di tartare",
      "location.kicker": "02 Location",
      "location.copy1": "Via dei Mille 3, nel centro di Bogliasco, a pochi passi dal mare e dal borgo.",
      "location.copy2": "Sala, atmosfera informale e accoglienza ligure per una pausa dopo il mare o una cena in Riviera.",
      "location.front": "L'ingresso",
      "location.room": "La sala",
      "location.table": "Il dehor",
      "location.terrace1": "La sala eventi",
      "location.terrace3": "I dettagli",
      "location.gallery": "La parete Sampdoria",
      "services.kicker": "03 SERVIZI",
      "services.title": "Prenotazioni e asporto",
      "services.copy": "Organizza il tavolo, chiedi informazioni sul menu o concorda un ritiro: prepariamo il messaggio e ti accompagniamo direttamente su WhatsApp.",
      "services.badge": "Servizio ristorante",
      "services.option1": "Pranzo e cena",
      "services.option2": "Asporto",
      "services.option3": "Tavoli all'aperto",
      "reviews.kicker": "03 Recensioni",
      "reviews.title": "Cosa dicono di noi",
      "reviews.cardLabel1": "Cucina",
      "reviews.cardLabel2": "Accoglienza",
      "reviews.cardLabel3": "Golfo Paradiso",
      "reviews.quote1": "Pesce e piatti liguri pensati per una pausa di gusto a Bogliasco.",
      "reviews.author1": "Il Clipper · Ristorante",
      "reviews.quote2": "Servizio diretto, ambiente conviviale e tavoli pronti per pranzo e cena.",
      "reviews.author2": "Bogliasco · GE",
      "reviews.quote3": "Una tappa semplice e generosa tra mare, borgo e profumi della Riviera ligure.",
      "reviews.author3": "Via dei Mille 3",
      "reviews.read": "Leggi le recensioni",
      "reviews.leave": "Lascia una recensione",
      "contacts.kicker": "04 Contatti",
      "contacts.title": "Contatti",
      "contacts.where": "Dove siamo",
      "contacts.hoursLabel": "Orari",
      "contacts.hours": "Pranzo e cena<br>tutti i giorni",
      "contacts.phone": "Telefono",
      "contacts.whatsapp": "WhatsApp",
      "contacts.mapLabel": "Bogliasco · Golfo Paradiso",
      "contacts.openMap": "Apri su Google Maps",
      "footer.tagline": "La cucina ligure,<br>il respiro del mare.",
      "footer.top": "Torna su",
      "legal.privacy": "Privacy",
      "legal.cookies": "Cookie",
      "legal.notes": "Note legali",
      "legal.manageCookies": "Gestisci cookie",
      "cookie.title": "Privacy e servizi esterni",
      "cookie.copy": "Usiamo solo strumenti tecnici. Google Maps viene incorporato nella pagina solo dopo il tuo consenso.",
      "cookie.necessary": "Solo necessari",
      "cookie.accept": "Accetta servizi esterni",
      "cookie.preferences": "Dettagli",
      "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
      "map.load": "Carica la mappa",
      "form.kicker": "Scrivici su WhatsApp",
      "form.title": "Raccontaci<br><em>cosa desideri.</em>",
      "form.intro": "Compila i campi: prepareremo il messaggio e apriremo WhatsApp per permetterti di inviarlo.",
      "form.name": "Nome e cognome *",
      "form.date": "Data",
      "form.time": "Orario",
      "form.guests": "Persone",
      "form.choose": "Scegli",
      "form.message": "Messaggio",
      "form.placeholder": "Richieste o informazioni utili",
      "form.submit": "Continua su WhatsApp",
      "form.note": "Nessun dato viene salvato sul sito: il messaggio viene preparato nel browser e inviato solo se lo confermi in WhatsApp.",
    },
    en: {
      skip: "Skip to content",
      "nav.restaurant": "Restaurant",
      "nav.location": "Location",
      "nav.services": "Services",
      "nav.reviews": "Reviews",
      "nav.contacts": "Contacts",
      "cta.book": "Book now",
      "cta.bookTable": "Book a table",
      "cta.menu": "Discover our menu",
      "cta.wine": "Wine list",
      "cta.call": "Call now",
      "card.food": "Menu",
      "card.wine": "Wine list",
      "card.note": "In case of allergies or intolerances, please inform our staff before ordering. *Frozen product: when fresh produce is unavailable, a quality frozen product will be used. Half portions: 30% of the price.",
      "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
      "hero.overline": "Seafood restaurant",
      "hero.hours": "<span>LUNCH, DINNER &amp; CONVIVIALITY</span> LIGURIAN CUISINE - SEAFOOD - WINES",
      "hero.edge": "Ligurian cuisine & sea",
      "hero.discover": "Discover Il Clipper",
      "restaurant.kicker": "01 Restaurant",
      "restaurant.copy1": "Ligurian cooking and seafood specialities in a welcoming restaurant in the heart of Bogliasco.",
      "restaurant.copy2": "A simple, curated and convivial table for lunch, dinner and evenings on Golfo Paradiso.",
      "restaurant.mobileCopy": "Ligurian cuisine and seafood in the heart of Bogliasco.",
      "food.catch": "Seafood plateau",
      "food.pasta": "Raw seafood",
      "food.stockfish": "Oysters and lemon",
      "food.grill": "Spaghetti with clams",
      "food.fish": "Delicate fillet",
      "food.specialPasta": "Mediterranean pasta",
      "food.dessert": "Seafood calamarata",
      "food.rawSelection": "Raw seafood selection",
      "food.clams": "Spaghetti with clams",
      "food.pistachioPasta": "Pistachio and prawn",
      "food.seafoodSalad": "Seafood salad",
      "food.octopus": "Roasted octopus",
      "food.tartare": "Tartare trio",
      "location.kicker": "02 Location",
      "location.copy1": "Via dei Mille 3, in central Bogliasco, just a few steps from the sea and the village.",
      "location.copy2": "Dining room, informal atmosphere and Ligurian hospitality for a stop after the sea or dinner on the Riviera.",
      "location.front": "Entrance",
      "location.room": "Dining room",
      "location.table": "Outdoor area",
      "location.terrace1": "Event dining room",
      "location.terrace3": "Details",
      "location.gallery": "Sampdoria wall",
      "services.kicker": "03 SERVICES",
      "services.title": "Bookings and takeaway",
      "services.copy": "Book your table, ask about the menu or arrange a pickup: we prepare the message and take you straight to WhatsApp.",
      "services.badge": "Restaurant service",
      "services.option1": "Lunch and dinner",
      "services.option2": "Takeaway",
      "services.option3": "Outdoor tables",
      "reviews.kicker": "03 Reviews",
      "reviews.title": "What guests say",
      "reviews.cardLabel1": "Cuisine",
      "reviews.cardLabel2": "Hospitality",
      "reviews.cardLabel3": "Golfo Paradiso",
      "reviews.quote1": "Seafood and Ligurian dishes designed for a flavourful stop in Bogliasco.",
      "reviews.author1": "Il Clipper · Restaurant",
      "reviews.quote2": "Direct service, a convivial setting and tables ready for lunch and dinner.",
      "reviews.author2": "Bogliasco · GE",
      "reviews.quote3": "A simple and generous stop between the sea, the village and the scents of the Ligurian Riviera.",
      "reviews.author3": "Via dei Mille 3",
      "reviews.read": "Read reviews",
      "reviews.leave": "Leave a review",
      "contacts.kicker": "04 Contacts",
      "contacts.title": "Contacts",
      "contacts.where": "Find us",
      "contacts.hoursLabel": "Opening hours",
      "contacts.hours": "Lunch and dinner<br>every day",
      "contacts.phone": "Phone",
      "contacts.whatsapp": "WhatsApp",
      "contacts.mapLabel": "Bogliasco · Golfo Paradiso",
      "contacts.openMap": "Open in Google Maps",
      "footer.tagline": "Ligurian cuisine,<br>the breath of the sea.",
      "footer.top": "Back to top",
      "legal.privacy": "Privacy",
      "legal.cookies": "Cookies",
      "legal.notes": "Legal notes",
      "legal.manageCookies": "Manage cookies",
      "cookie.title": "Privacy and external services",
      "cookie.copy": "We only use technical tools. Google Maps is embedded in the page only after your consent.",
      "cookie.necessary": "Necessary only",
      "cookie.accept": "Accept external services",
      "cookie.preferences": "Details",
      "map.notice": "Google Maps is loaded only after consent to external services.",
      "map.load": "Load map",
      "form.kicker": "Message us on WhatsApp",
      "form.title": "Tell us<br><em>what you need.</em>",
      "form.intro": "Complete the fields: we will prepare your message and open WhatsApp so you can send it.",
      "form.name": "Full name *",
      "form.date": "Date",
      "form.time": "Time",
      "form.guests": "Guests",
      "form.choose": "Select",
      "form.message": "Message",
      "form.placeholder": "Requests or useful information",
      "form.submit": "Continue on WhatsApp",
      "form.note": "No data is stored on this website: the message is prepared in your browser and sent only if you confirm it in WhatsApp.",
    },
  };

  const menuCatalogs = {
    food: {
      intro: {
        it: {
          kicker: "Il Clipper · Cucina ligure",
          title: "Il nostro <em>menu.</em>",
          description: "Proposte di mare e di terra, cucina ligure e specialita' del ristorante. La carta puo' variare secondo stagione e disponibilita'.",
        },
        en: {
          kicker: "Il Clipper · Ligurian cuisine",
          title: "Our <em>menu.</em>",
          description: "Seafood and meat dishes, Ligurian cooking and restaurant specialities. The menu may vary according to season and availability.",
        },
      },
      sections: [
        {
          it: "Antipasti di Mare",
          en: "Seafood starters",
          items: [
            { it: "Muscoli alla marinara", price: "€ 15", note: "Allergeni: 14" },
            { it: "Acciughe aperte impanate", price: "€ 15", note: "Allergeni: 1, 4, 7" },
            { it: "Acciughe ripiene e pomodori", price: "€ 17", note: "Allergeni: 1, 4, 7" },
            { it: "Tortino di polpo e patate con verdure al salto*", price: "€ 17", note: "Allergeni: 14" },
            { it: "Insalata calda di baccalà con pinoli, olive e patate", price: "€ 18", note: "Allergeni: 4, 8" },
            { it: "Cappon magro", price: "€ 18", note: "Allergeni: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14" },
            { it: "Insalata tiepida di mare", price: "€ 23", note: "Allergeni: 2, 4, 14" },
            { it: "Tartare di tonno pinna gialla", price: "€ 25", note: "Allergeni: 4, 6, 8" },
            { it: "Crudo di pesce variabile*", price: "€ 40", note: "Allergeni: 2, 4, 6" },
          ],
        },
        {
          it: "Antipasti di Terra",
          en: "Meat starters",
          items: [
            { it: "Caprese con mozzarella di bufala", price: "€ 13", note: "Allergeni: 1, 3, 7, 8" },
            { it: "Prosciutto di Parma", price: "€ 15", note: "Allergeni: 7" },
            { it: "Tartare di manzo all'Albese, con o senza uovo", price: "€ 22", note: "Allergeni: 3, 5" },
          ],
        },
        {
          it: "Primi di Mare",
          en: "Seafood pasta",
          items: [
            { it: "Spaghetti alle vongole", price: "€ 20", note: "Allergeni: 1, 14" },
            { it: "Spaghetti alle vongole e pistacchio", price: "€ 22", note: "Allergeni: 1, 8, 14" },
            { it: "Spaghetti ai frutti di mare", price: "€ 25", note: "Allergeni: 1, 2, 9, 14" },
            { it: "Calamarata allo chef Germano", price: "€ 22", note: "Allergeni: 1, 2, 4, 8, 9, 14" },
            { it: "Spaghetti alla Willy con aglio, olio, peperoncino, gamberi e scaglie di grana", price: "€ 25", note: "Allergeni: 1, 2, 3, 7" },
            { it: "Spaghetti all'Augusto con pesto di pistacchio, tartare di gambero rosso e stracciatella", price: "€ 25", note: "Allergeni: 1, 2, 9, 14" },
            { it: "Spaghettone Cacio e Pepe con tartare di gambero rosso", price: "€ 25", note: "Allergeni: 2, 4, 7, 8" },
          ],
        },
        {
          it: "Primi di Terra",
          en: "Pasta",
          items: [
            { it: "Pansoti al sugo di noci", price: "€ 15", note: "Allergeni: 1, 3, 4, 6, 7, 8, 9, 11, 13, 14" },
            { it: "Trofie al pesto di nostra produzione", price: "€ 17", note: "Allergeni: 1, 3, 4, 6, 7, 8, 9, 14" },
            { it: "Carbonara con guanciale di Amatrice", price: "€ 20", note: "Allergeni: 1, 3, 7, 9" },
          ],
        },
        {
          it: "Secondi di Mare",
          en: "Seafood main courses",
          items: [
            { it: "Frittura di totani*", price: "€ 20", note: "Allergeni: 1, 5, 14" },
            { it: "Zuppa di cozze e vongole", price: "€ 20", note: "Allergeni: 9, 14" },
            { it: "Tagliata di tonno pinna gialla al naturale o al pistacchio", price: "€ 25", note: "Allergeni: 4, 8" },
            { it: "Orata ai ferri o alla ligure", price: "€ 28", note: "Allergeni: 4, 8" },
            { it: "Frittura mista*", price: "€ 28", note: "Allergeni: 1, 2, 3, 4, 5, 7, 14" },
            { it: "Polpo croccante su purea di patate al lime", price: "€ 26", note: "Allergeni: 7, 14" },
            { it: "Pesce al sale con i suoi contorni (minimo per 2 persone)", price: "€ 40 cad.", note: "Allergeni: 3, 4" },
            { it: "Grigliata mista", price: "€ 35", note: "Allergeni: 2, 4, 14" },
          ],
        },
        {
          it: "Secondi di Terra",
          en: "Meat main courses",
          items: [
            { it: "Hamburger di Fassona con i suoi contorni", price: "€ 16", note: "Allergeni: 1, 3, 5" },
            { it: "Tagliata di filetto con rucola e Grana", price: "€ 27", note: "Allergeni: 7" },
            { it: "Filetto alla griglia", price: "€ 27", note: "Allergeni: 1, 4, 7, 10" },
            { it: "Filetto al pepe verde", price: "€ 29", note: "Allergeni: 1, 4, 7, 10" },
          ],
        },
        {
          it: "Contorni",
          en: "Side dishes",
          items: [
            { it: "Patate fritte", price: "€ 5", note: "Allergeni: 1" },
            { it: "Patate al forno", price: "€ 5", note: "Allergeni: 1" },
            { it: "Insalata mista", price: "€ 6" },
            { it: "Verdure grigliate / al salto", price: "€ 6" },
          ],
        },
      ],
    },
    wine: {
      intro: {
        it: {
          kicker: "Il Clipper · Carta vini",
          title: "Carta <em>dei Vini.</em>",
          description: "Bianchi, rossi, rosé e bollicine selezionati per accompagnare la cucina del Clipper.",
        },
        en: {
          kicker: "Il Clipper · Wine list",
          title: "Wine <em>list.</em>",
          description: "White, red, rosé and sparkling wines selected to accompany the Clipper cuisine.",
        },
      },
      sections: [
        {
          it: "Champagne",
          en: "Champagne",
          items: [
            { it: "Louis Roederer · Collection", price: "€ 120" },
            { it: "Louis Roederer · Brut Millésimé", price: "€ 180" },
            { it: "Louis Roederer · Blanc de Blanc", price: "€ 180" },
            { it: "Louis Roederer · Cristal", price: "€ 350" },
            { it: "Ruinart · Brut Reserve", price: "€ 120" },
            { it: "Ruinart · Blanc de Blanc", price: "€ 160" },
            { it: "Ruinart · Rosé", price: "€ 180" },
            { it: "Perrier Jouët · Grand Brut", price: "€ 120" },
            { it: "Perrier Jouët · Blason Rosé", price: "€ 180" },
            { it: "Perrier Jouët · Blanc de Blanc", price: "€ 180" },
            { it: "Perrier Jouët · Belle Epoque", price: "€ 350" },
            { it: "Krug · Grand Cuvée", price: "€ 350" },
            { it: "Krug · Rosé", price: "€ 500" },
          ],
        },
        {
          it: "Trento DOC",
          en: "Trento DOC",
          items: [
            { it: "Altemasi · Trento DOC Millesimato", price: "€ 40" },
            { it: "Altemasi · Pas Dosé", price: "€ 65" },
            { it: "Altemasi · Blanch De Noir", price: "€ 70" },
            { it: "Altemasi · Riserva Graal", price: "€ 80" },
          ],
        },
        {
          it: "Franciacorta e Valdobbiadene",
          en: "Franciacorta and Valdobbiadene",
          items: [
            { it: "Bellavista · Franciacorta Alma Grande Cuvée", price: "€ 60" },
            { it: "Bellavista · Franciacorta Alma Dosaggio Zero", price: "€ 70" },
            { it: "Bellavista · Franciacorta Alma Rosè", price: "€ 80" },
            { it: "Bellavista · Franciacorta Teatro della Scala, Brut millesimato", price: "€ 90" },
            { it: "Cà del Bosco · Franciacorta Brut Cuvée Prestige", price: "€ 60" },
            { it: "Cà del Bosco · Franciacorta Brut DOCG millesimato", price: "€ 80" },
            { it: "Cà del Bosco · Franciacorta Dosage Zero millesimato", price: "€ 80" },
            { it: "Cà del Bosco · Franciacorta Cuvée Rosè DOCG", price: "€ 80" },
            { it: "Contadi Castaldi · Franciacorta DOCG Brüt", price: "€ 40" },
            { it: "Contadi Castaldi · Franciacorta DOCG Blânc", price: "€ 60" },
            { it: "Contadi Castaldi · Franciacorta DOCG Zèro", price: "€ 70" },
            { it: "Foss Marai · Prosecco DOCG", price: "€ 30" },
          ],
        },
        {
          it: "Bianchi · Veneto, Alto Adige e Friuli",
          en: "White wines · Veneto, Alto Adige and Friuli",
          items: [
            { it: "Livio Felluga · Sharis", price: "€ 35" },
            { it: "Livio Felluga · Ribolla Gialla", price: "€ 35" },
            { it: "Livio Felluga · Chardonnay", price: "€ 35" },
            { it: "Livio Felluga · Sauvignon", price: "€ 35" },
            { it: "Livio Felluga · Terre Alte", price: "€ 120" },
            { it: "Jermann · Vinnae Ribolla Gialla", price: "€ 40" },
            { it: "Jermann · Chardonnay", price: "€ 40" },
            { it: "Jermann · Sauvignon", price: "€ 40" },
            { it: "Jermann · Traminer", price: "€ 40" },
            { it: "Jermann · W....dreams", price: "€ 80" },
            { it: "Jermann · Capo Martino", price: "€ 90" },
            { it: "Jermann · Vintage Tunina", price: "€ 90" },
            { it: "J. Hofstätter · De Vite", price: "€ 35" },
            { it: "J. Hofstätter · Chardonnay", price: "€ 35" },
            { it: "J. Hofstätter · Sauvignon", price: "€ 35" },
            { it: "J. Hofstätter · Gewürztraminer “Joseph”", price: "€ 35" },
            { it: "Vie de Romans · Pinot Grigio Ramato", price: "€ 55" },
            { it: "Vie de Romans · Chardonnay Legno", price: "€ 55" },
            { it: "Vie de Romans · Sauvignon Blanc Legno", price: "€ 55" },
          ],
        },
        {
          it: "Bianchi · Piemonte, Lombardia, Toscana e Liguria",
          en: "White wines · Piemonte, Lombardia, Toscana and Liguria",
          items: [
            { it: "Ceretto · Il Blangé", price: "€ 40" },
            { it: "Laura Aschero · Vermentino di Imperia", price: "€ 40" },
            { it: "Laura Aschero · Pigato di Imperia", price: "€ 40" },
          ],
        },
        {
          it: "Bianchi · Centro, Sud Italia e Isole",
          en: "White wines · Central and Southern Italy, Islands",
          items: [
            { it: "Marchesi Antinori · San Giovanni della Sala (Orvieto Classico)", price: "€ 35" },
            { it: "Marchesi Antinori · Bramito del Cervo (Chardonnay)", price: "€ 50" },
            { it: "Marchesi Antinori · Conte della Vipera (Sauvignon)", price: "€ 50" },
            { it: "Marchesi Antinori · Cervaro della Sala (Chardonnay)", price: "€ 110" },
            { it: "Marchesi Antinori · Nibbio della Sala", price: "€ 400" },
            { it: "Feudi di San Gregorio · Falanghina", price: "€ 35" },
            { it: "Feudi di San Gregorio · Greco di Tufo", price: "€ 35" },
            { it: "Feudi di San Gregorio · Fiano di Avellino", price: "€ 35" },
            { it: "Tasca d'Almerita · Grillo (Isola di Mozia)", price: "€ 40" },
            { it: "Tasca d'Almerita · Catarratto Regaleali", price: "€ 35" },
            { it: "Sella & Mosca · Cala Reale (Vermentino DOC)", price: "€ 35" },
            { it: "Sella & Mosca · Monteoro (Vermentino DOCG Superiore)", price: "€ 40" },
            { it: "Capichera · Vermentino di Gallura “Capichera Vigna 'Ngena”", price: "€ 60" },
            { it: "Capichera · Capichera classico", price: "€ 70" },
            { it: "Capichera · Capichera V.T. (Vendemmia tardiva)", price: "€ 90" },
          ],
        },
        {
          it: "Bianchi Francesi",
          en: "French white wines",
          items: [
            { it: "Albert Pic · Chablis Premier Cru 'Mont de Milieu'", price: "€ 95" },
            { it: "Albert Pic · Pic Premiere", price: "€ 150" },
            { it: "Cantina Regnard · Chablis Grand Regnard", price: "€ 95" },
            { it: "Cantina Baron de Ladoucette · Baron de’ L", price: "€ 150" },
            { it: "Cantina Baron de Ladoucette · Pouilly Fumé", price: "€ 80" },
            { it: "Cantina Baron de Ladoucette · Sancerre Blanc Comte Lafond", price: "€ 80" },
          ],
        },
        {
          it: "Rosé",
          en: "Rosé wines",
          items: [
            { it: "Costaripa Mattia Vezzola · Rosamara", price: "€ 35" },
            { it: "Marchesi Antinori · “A”", price: "€ 45" },
            { it: "Tormaresca · Calafuria", price: "€ 35" },
            { it: "Domaines Ott · Bandol Rosé Chateau Romassan", price: "€ 80" },
            { it: "Domaines Ott · Cote de Provence by OTT", price: "€ 55" },
          ],
        },
        {
          it: "Rossi · Alto Adige, Friuli e Veneto",
          en: "Red wines · Alto Adige, Friuli and Veneto",
          items: [
            { it: "J. Hofstätter · Lagrein", price: "€ 35" },
            { it: "J. Hofstätter · Pinot nero Meczan", price: "€ 35" },
            { it: "Tommasi · Amarone Classico", price: "€ 80" },
            { it: "Tommasi · Ripasso", price: "€ 38" },
            { it: "Livio Felluga · Vertigo", price: "€ 35" },
            { it: "Livio Felluga · Refosco", price: "€ 35" },
            { it: "Jermann · Red Angel", price: "€ 40" },
          ],
        },
        {
          it: "Rossi · Piemonte",
          en: "Red wines · Piemonte",
          items: [
            { it: "Ca’ Viola · Dolcetto Vilot", price: "€ 30" },
            { it: "Ca’ Viola · Barbera Brichet", price: "€ 30" },
            { it: "Ca’ Viola · Nebbiolo", price: "€ 40" },
            { it: "Ca’ Viola · Barbaresco", price: "€ 70" },
            { it: "Ca’ Viola · Barolo Caviòt", price: "€ 80" },
          ],
        },
        {
          it: "Rossi · Toscana",
          en: "Red wines · Toscana",
          items: [
            { it: "Marchesi Antinori · Chianti superiore “Santa Cristina”", price: "€ 25" },
            { it: "Marchesi Antinori · Chianti Classico “Pèppoli”", price: "€ 38" },
            { it: "Marchesi Antinori · Il Bruciato di Bolgheri - Tenuta Guado al Tasso", price: "€ 40" },
            { it: "Marchesi Antinori · Cont’Ugo - Tenuta Guado al Tasso", price: "€ 75" },
            { it: "Marchesi Antinori · Brunello di Montalcino - Pian Delle Vigne", price: "€ 80" },
            { it: "Marchesi Antinori · Il Tignanello", price: "€ 150" },
            { it: "Marchesi Antinori · Solaia", price: "€ 420" },
            { it: "Marchesi Antinori · Matarocchio", price: "€ 700" },
            { it: "Ornellaia · Le Volte", price: "€ 40" },
            { it: "Ornellaia · Serre Nuove", price: "€ 80" },
            { it: "Ornellaia", price: "€ 280" },
          ],
        },
        {
          it: "Rossi · Centro, Sud Italia e Isole",
          en: "Red wines · Central and Southern Italy, Islands",
          items: [
            { it: "Tormaresca · Torcicoda (Primitivo del Salento)", price: "€ 35" },
            { it: "Tormaresca · Masseria (Negramaro Riserva)", price: "€ 35" },
            { it: "Tasca d'Almerita · Lamùri (Nero d’Avola)", price: "€ 35" },
            { it: "Tasca d'Almerita · Tenuta Tascante Etna Rosso", price: "€ 35" },
            { it: "Tasca d'Almerita · Rosso del Conte", price: "€ 90" },
            { it: "Capichera · Assajé Carignano", price: "€ 70" },
          ],
        },
      ],
    },
  };

  let currentLanguage = "it";

  const getFocusableElements = (container) => {
    if (!container) return [];
    return [...container.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
  };

  const setBackgroundInert = (inert) => {
    backgroundRegions.forEach((region) => {
      if (inert) region.setAttribute("inert", "");
      else region.removeAttribute("inert");
    });
  };

  const trapFocus = (event, container) => {
    if (event.key !== "Tab") return;
    const focusableElements = getFocusableElements(container);
    if (!focusableElements.length) {
      event.preventDefault();
      container?.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const setMenu = (open, restoreFocus = true) => {
    const wasOpen = body.classList.contains("menu-open");
    if (open && !wasOpen) lastFocusedElement = document.activeElement;
    body.classList.toggle("menu-open", open);
    mobileMenu?.classList.toggle("is-open", open);
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
    setBackgroundInert(open);

    if (open) {
      window.setTimeout(() => (getFocusableElements(mobileMenuPanel)[0] || mobileMenuPanel)?.focus(), 260);
    } else if (wasOpen && restoreFocus) {
      lastFocusedElement?.focus();
    }
  };

  menuToggle?.addEventListener("click", () => setMenu(!body.classList.contains("menu-open")));
  mobileMenu?.querySelector("[data-menu-close]")?.addEventListener("click", () => setMenu(false));
  mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 32);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const mobileStickyBook = document.querySelector(".mobile-sticky-book");
  const stickyBookSections = [
    { element: document.querySelector("#top"), theme: "dark" },
    { element: document.querySelector("#ristorante"), theme: "dark" },
    { element: document.querySelector("#location"), theme: "light" },
    { element: document.querySelector("#recensioni"), theme: "light" },
    { element: document.querySelector("#contatti"), theme: "light" },
    { element: document.querySelector(".site-footer"), theme: "dark" },
  ].filter(({ element }) => element);

  const setStickyBookTheme = (theme) => {
    if (!mobileStickyBook) return;
    const isOnLight = theme === "light";
    mobileStickyBook.classList.toggle("is-on-light", isOnLight);
    mobileStickyBook.classList.toggle("is-on-dark", !isOnLight);
  };

  const updateStickyBookTheme = () => {
    if (!stickyBookSections.length) return;
    const footerSection = stickyBookSections.find(({ element }) => element.matches(".site-footer"));
    const footerRect = footerSection?.element.getBoundingClientRect();
    const footerIsVisible = Boolean(footerRect && footerRect.top < window.innerHeight && footerRect.bottom > 0);
    mobileStickyBook?.classList.toggle("is-over-footer", footerIsVisible);

    if (footerRect && footerRect.top <= window.innerHeight * 0.72 && footerRect.bottom > 0) {
      setStickyBookTheme("dark");
      return;
    }

    const isAtPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12;
    if (isAtPageEnd) {
      setStickyBookTheme("dark");
      return;
    }

    const sampleY = Math.max(96, Math.min(window.innerHeight - 96, window.innerHeight * 0.64));
    const sampleElement = document.elementFromPoint(window.innerWidth / 2, sampleY);
    const activeSection = stickyBookSections.find(({ element }) => element.contains(sampleElement))
      || stickyBookSections.reduce((current, section) => {
        const rect = section.element.getBoundingClientRect();
        const distance = Math.abs(rect.top - sampleY);
        return distance < current.distance ? { section, distance } : current;
      }, { section: stickyBookSections[0], distance: Number.POSITIVE_INFINITY }).section;

    setStickyBookTheme(activeSection.theme);
  };

  if (mobileStickyBook) {
    setStickyBookTheme("dark");
    updateStickyBookTheme();
    window.addEventListener("scroll", updateStickyBookTheme, { passive: true });
    window.addEventListener("resize", updateStickyBookTheme);
  }

  const setupCarousel = ({ trackSelector, cardSelector, currentSelector, prevSelector, nextSelector }) => {
    const track = document.querySelector(trackSelector);
    const cards = [...document.querySelectorAll(cardSelector)];
    const current = document.querySelector(currentSelector);
    const previous = document.querySelector(prevSelector);
    const next = document.querySelector(nextSelector);

    if (!track || !cards.length) return;

    const step = () => {
      const styles = getComputedStyle(track);
      return cards[0].getBoundingClientRect().width + parseFloat(styles.columnGap || styles.gap || 0);
    };

    const updateCounter = () => {
      if (!current) return;
      const cardStep = step();
      const index = cardStep ? Math.round(track.scrollLeft / cardStep) + 1 : 1;
      current.textContent = String(Math.min(cards.length, Math.max(1, index))).padStart(2, "0");
    };

    previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", updateCounter, { passive: true });
  };

  setupCarousel({
    trackSelector: "[data-food-track]",
    cardSelector: ".food-card",
    currentSelector: "[data-food-current]",
    prevSelector: "[data-food-prev]",
    nextSelector: "[data-food-next]",
  });

  setupCarousel({
    trackSelector: "[data-location-track]",
    cardSelector: ".location-card",
    currentSelector: "[data-location-current]",
    prevSelector: "[data-location-prev]",
    nextSelector: "[data-location-next]",
  });

  const cardModal = document.querySelector("[data-card-modal]");
  const cardDialog = cardModal?.querySelector(".card-dialog");
  const cardBody = cardModal?.querySelector(".card-body");
  const cardContent = cardModal?.querySelector("[data-card-content]");
  const cardKicker = cardModal?.querySelector("[data-card-kicker]");
  const cardTitle = cardModal?.querySelector("[data-card-title]");
  const cardDescription = cardModal?.querySelector("[data-card-description]");
  const catalogNote = cardModal?.querySelector(".catalog-note");
  let activeCardType = "food";
  let cardCloseTimer;

  const renderCatalog = () => {
    if (!cardContent || !cardKicker || !cardTitle || !cardDescription) return;
    const catalog = menuCatalogs[activeCardType];
    const intro = catalog.intro[currentLanguage];
    cardKicker.textContent = intro.kicker;
    cardTitle.innerHTML = intro.title;
    cardDescription.textContent = intro.description;
    if (catalogNote) catalogNote.textContent = translations[currentLanguage][activeCardType === "food" ? "card.note" : "card.wineNote"];
    cardContent.innerHTML = catalog.sections.map((section) => `
      <section class="catalog-section">
        <h3>${section[currentLanguage]}<small>${section[currentLanguage === "it" ? "en" : "it"]}</small></h3>
        <div class="catalog-items">
          ${section.items.map((item) => `
            <article class="catalog-item">
              <div>
                <h4>${item[currentLanguage] || item.it}</h4>
                ${item.note ? `<p>${item.note}</p>` : ((item[currentLanguage === "it" ? "en" : "it"] && item[currentLanguage === "it" ? "en" : "it"] !== item[currentLanguage]) ? `<p>${item[currentLanguage === "it" ? "en" : "it"]}</p>` : "")}
              </div>
              ${item.price ? `<span>${item.price}</span>` : ""}
            </article>
          `).join("")}
        </div>
      </section>
    `).join("");
  };

  const applyLanguage = (language) => {
    currentLanguage = translations[language] ? language : "it";
    const dictionary = translations[currentLanguage];
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = dictionary[element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const value = dictionary[element.dataset.i18nPlaceholder];
      if (value !== undefined) element.placeholder = value;
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === currentLanguage;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderCatalog();
  };

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });

  const setCardType = (type) => {
    activeCardType = menuCatalogs[type] ? type : "food";
    cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
      const active = button.dataset.cardTab === activeCardType;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    renderCatalog();
    if (cardBody) cardBody.scrollTop = 0;
  };

  const openCardModal = (type, trigger) => {
    if (!cardModal || !cardDialog) return;
    window.clearTimeout(cardCloseTimer);
    lastFocusedElement = trigger || document.activeElement;
    setMenu(false, false);
    setCardType(type);
    cardModal.hidden = false;
    cardModal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    setBackgroundInert(true);
    requestAnimationFrame(() => {
      cardModal.classList.add("is-open");
      window.setTimeout(() => cardModal.querySelector("[data-card-close]")?.focus(), 260);
    });
  };

  const closeCardModal = () => {
    if (!cardModal || cardModal.hidden) return;
    cardModal.classList.remove("is-open");
    cardModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    setBackgroundInert(false);
    cardCloseTimer = window.setTimeout(() => {
      cardModal.hidden = true;
      lastFocusedElement?.focus();
    }, 450);
  };

  document.querySelectorAll("[data-card-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openCardModal(trigger.dataset.cardTrigger, trigger);
    });
  });

  cardModal?.querySelector("[data-card-close]")?.addEventListener("click", closeCardModal);
  cardModal?.querySelectorAll("[data-card-tab]").forEach((button) => {
    button.addEventListener("click", () => setCardType(button.dataset.cardTab));
  });

  const bookingModal = document.querySelector("[data-booking-modal]");
  const bookingDialog = bookingModal?.querySelector(".booking-dialog");
  const bookingForm = bookingModal?.querySelector("[data-contact-form]");
  const contextInput = bookingForm?.querySelector("input[name='context']");
  const dateInput = bookingForm?.querySelector("input[name='date']");
  let closeModalTimer;

  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  const openBookingModal = (trigger) => {
    if (!bookingModal || !bookingDialog) return;
    window.clearTimeout(closeModalTimer);
    lastFocusedElement = trigger;
    if (contextInput) contextInput.value = trigger.dataset.context || "Prenotazione tavolo";
    setMenu(false, false);
    bookingModal.hidden = false;
    bookingModal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    setBackgroundInert(true);
    requestAnimationFrame(() => bookingModal.classList.add("is-open"));
    window.setTimeout(() => bookingForm?.querySelector("input[name='name']")?.focus(), 420);
  };

  const closeBookingModal = () => {
    if (!bookingModal || bookingModal.hidden) return;
    bookingModal.classList.remove("is-open");
    bookingModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    setBackgroundInert(false);
    closeModalTimer = window.setTimeout(() => {
      bookingModal.hidden = true;
      lastFocusedElement?.focus();
    }, 500);
  };

  document.querySelectorAll("[data-booking-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openBookingModal(trigger);
    });
  });

  bookingModal?.querySelectorAll("[data-booking-close]").forEach((button) => {
    button.addEventListener("click", closeBookingModal);
  });

  const getFormString = (formData, name) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const legalModal = document.querySelector("[data-legal-modal]");
  const legalDialog = legalModal?.querySelector(".legal-dialog");
  let legalCloseTimer;

  const setLegalTab = (tab = "privacy") => {
    const nextTab = legalModal?.querySelector(`[data-legal-tab="${tab}"]`) ? tab : "privacy";
    legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
      const active = button.dataset.legalTab === nextTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    legalModal?.querySelectorAll("[data-legal-panel]").forEach((panel) => {
      const active = panel.dataset.legalPanel === nextTab;
      panel.classList.toggle("is-active", active);
    });
  };

  const openLegalModal = (tab, trigger) => {
    if (!legalModal || !legalDialog) return;
    window.clearTimeout(legalCloseTimer);
    lastFocusedElement = trigger || document.activeElement;
    setMenu(false, false);
    setLegalTab(tab);
    legalModal.hidden = false;
    legalModal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    setBackgroundInert(true);
    requestAnimationFrame(() => {
      legalModal.classList.add("is-open");
      window.setTimeout(() => legalModal.querySelector("[data-legal-close]")?.focus(), 260);
    });
  };

  const closeLegalModal = () => {
    if (!legalModal || legalModal.hidden) return;
    legalModal.classList.remove("is-open");
    legalModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    setBackgroundInert(false);
    legalCloseTimer = window.setTimeout(() => {
      legalModal.hidden = true;
      lastFocusedElement?.focus();
    }, 450);
  };

  document.querySelectorAll("[data-legal-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openLegalModal(trigger.dataset.legalTrigger, trigger);
    });
  });

  legalModal?.querySelectorAll("[data-legal-close]").forEach((button) => {
    button.addEventListener("click", closeLegalModal);
  });

  legalModal?.querySelectorAll("[data-legal-tab]").forEach((button) => {
    button.addEventListener("click", () => setLegalTab(button.dataset.legalTab));
  });

  const consentStorageKey = "ilClipperExternalServicesConsent";
  const consentVersion = 2;
  const consentMaxAge = 180 * 24 * 60 * 60 * 1000;
  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const mapFrame = document.querySelector("[data-map-src]");
  const mapConsent = document.querySelector("[data-map-consent]");
  const mapFrameWrap = mapFrame?.closest(".map-frame");

  const clearStoredConsent = () => {
    try {
      window.localStorage.removeItem(consentStorageKey);
    } catch {
      // Storage can be disabled; consent remains limited to this page view.
    }
  };

  const readConsent = () => {
    try {
      const storedConsent = JSON.parse(window.localStorage.getItem(consentStorageKey) || "null");
      const savedAt = storedConsent?.savedAt ? Date.parse(storedConsent.savedAt) : NaN;
      const isCurrent = storedConsent?.version === consentVersion;
      const isFresh = Number.isFinite(savedAt) && Date.now() - savedAt <= consentMaxAge;

      if (!isCurrent || !isFresh) {
        clearStoredConsent();
        return null;
      }

      return storedConsent;
    } catch {
      clearStoredConsent();
      return null;
    }
  };

  const saveConsent = (externalServices) => {
    try {
      window.localStorage.setItem(
        consentStorageKey,
        JSON.stringify({ version: consentVersion, externalServices, savedAt: new Date().toISOString() }),
      );
    } catch {
      // Consent still applies for this page view even when storage is unavailable.
    }
  };

  const showCookieBanner = () => {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    requestAnimationFrame(() => cookieBanner.classList.add("is-visible"));
  };

  const hideCookieBanner = () => {
    if (!cookieBanner) return;
    cookieBanner.classList.remove("is-visible");
    window.setTimeout(() => {
      cookieBanner.hidden = true;
    }, 220);
  };

  const openExternalUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const requestExternalUrl = (url) => {
    openExternalUrl(url);
    return true;
  };

  const loadExternalMap = ({ persist = true } = {}) => {
    if (!mapFrame) return;
    if (!mapFrame.getAttribute("src")) mapFrame.setAttribute("src", mapFrame.dataset.mapSrc || "");
    mapFrameWrap?.classList.add("map-loaded");
    if (mapConsent) mapConsent.hidden = true;
    if (persist) saveConsent(true);
  };

  const unloadExternalMap = () => {
    mapFrame?.removeAttribute("src");
    mapFrameWrap?.classList.remove("map-loaded");
    if (mapConsent) mapConsent.hidden = false;
  };

  const setExternalConsent = (externalServices) => {
    saveConsent(externalServices);
    if (externalServices) loadExternalMap({ persist: false });
    else unloadExternalMap();
    hideCookieBanner();

  };

  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setExternalConsent(true));
  document.querySelector("[data-cookie-necessary]")?.addEventListener("click", () => setExternalConsent(false));
  document.querySelector("[data-map-load]")?.addEventListener("click", () => setExternalConsent(true));

  document.querySelectorAll("[data-cookie-manage]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showCookieBanner();
    });
  });

  const initialConsent = readConsent();
  if (initialConsent?.externalServices) {
    loadExternalMap({ persist: false });
  } else if (initialConsent) {
    unloadExternalMap();
  } else {
    unloadExternalMap();
    showCookieBanner();
  }

  document.addEventListener("keydown", (event) => {
    if (bookingModal?.classList.contains("is-open")) trapFocus(event, bookingDialog);
    else if (cardModal?.classList.contains("is-open")) trapFocus(event, cardDialog);
    else if (legalModal?.classList.contains("is-open")) trapFocus(event, legalDialog);
    else if (body.classList.contains("menu-open")) trapFocus(event, mobileMenuPanel);

    if (event.key !== "Escape") return;
    if (cardModal?.classList.contains("is-open")) closeCardModal();
    else if (bookingModal?.classList.contains("is-open")) closeBookingModal();
    else if (legalModal?.classList.contains("is-open")) closeLegalModal();
    else setMenu(false);
  });

  bookingForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(bookingForm);
    const isEnglish = currentLanguage === "en";
    const name = getFormString(data, "name");
    const date = getFormString(data, "date");
    const time = getFormString(data, "time");
    const guests = getFormString(data, "guests");
    const note = getFormString(data, "message");
    const formattedDate = date
      ? new Intl.DateTimeFormat(isEnglish ? "en-GB" : "it-IT", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${date}T12:00:00`))
      : "";

    const details = isEnglish
      ? [
          guests ? `for ${guests} ${guests === "1" ? "person" : "people"}` : "",
          formattedDate ? `on ${formattedDate}` : "",
          time ? `at ${time}` : "",
        ].filter(Boolean).join(" ")
      : [
          guests ? `per ${guests} ${guests === "1" ? "persona" : "persone"}` : "",
          formattedDate ? `per il giorno ${formattedDate}` : "",
          time ? `alle ${time}` : "",
        ].filter(Boolean).join(" ");

    const message = isEnglish
      ? [
          `Hello Il Clipper, my name is ${name} and I would like to book a table${details ? ` ${details}` : ""}.`,
          note ? `\n${note}` : "",
        ].join("")
      : [
          `Ciao Il Clipper, sono ${name} e vorrei prenotare un tavolo${details ? ` ${details}` : ""}.`,
          note ? `\n${note}` : "",
        ].join("");

    requestExternalUrl(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".hero");
  const heroMedia = document.querySelector(".hero-carousel");
  const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
  const heroIndicators = [...document.querySelectorAll("[data-hero-indicator]")];
  const heroTitle = document.querySelector(".hero-title-wrap");
  const heroSocials = document.querySelector(".hero-socials");
  const scrollCue = document.querySelector(".scroll-cue");
  const heroStaticMobile = window.matchMedia("(max-width: 767px)");
  const heroSlideDuration = 4000;
  let heroMotionFrame = null;
  let heroSlideIndex = 0;
  let heroTimer = null;
  let heroSwipeStartX = 0;
  let heroSwipeStartY = 0;
  let heroSwipeTracking = false;

  const loadDeferredHeroSlide = (slide) => {
    if (!slide || slide.dataset.loaded === "true") return;
    slide.querySelectorAll("source[data-srcset]").forEach((source) => {
      source.setAttribute("srcset", source.dataset.srcset || "");
      source.removeAttribute("data-srcset");
    });

    const image = slide.querySelector("img[data-src]");
    if (image) {
      image.src = image.dataset.src || image.src;
      image.removeAttribute("data-src");
    }

    slide.dataset.loaded = "true";
  };

  const warmNextHeroSlide = (index) => {
    if (!heroSlides.length) return;
    loadDeferredHeroSlide(heroSlides[(index + 1) % heroSlides.length]);
  };

  const stopHeroTimer = () => {
    if (!heroTimer) return;
    window.clearTimeout(heroTimer);
    heroTimer = null;
  };

  const showHeroSlide = (nextIndex, { restartTimer = true } = {}) => {
    if (!heroSlides.length) return;
    const normalizedIndex = (nextIndex + heroSlides.length) % heroSlides.length;
    if (normalizedIndex === heroSlideIndex && heroSlides[normalizedIndex].classList.contains("is-active")) {
      if (restartTimer) queueHeroTimer();
      return;
    }

    loadDeferredHeroSlide(heroSlides[normalizedIndex]);
    heroSlides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === normalizedIndex);
    });

    heroIndicators.forEach((indicator, index) => {
      const active = index === normalizedIndex;
      indicator.classList.toggle("is-active", active);
      indicator.setAttribute("aria-current", String(active));
    });

    heroSlideIndex = normalizedIndex;
    warmNextHeroSlide(heroSlideIndex);
    if (restartTimer) queueHeroTimer();
  };

  function queueHeroTimer() {
    stopHeroTimer();
    if (document.hidden || heroSlides.length < 2) return;
    heroTimer = window.setTimeout(() => {
      showHeroSlide(heroSlideIndex + 1, { restartTimer: true });
    }, heroSlideDuration);
  }

  const hydrateDeferredHeroImages = () => {
    heroSlides.slice(1).forEach(loadDeferredHeroSlide);
  };

  if (heroSlides.length) {
    heroSlides[0].dataset.loaded = "true";
    warmNextHeroSlide(0);

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(hydrateDeferredHeroImages, { timeout: 1800 });
    } else {
      window.setTimeout(hydrateDeferredHeroImages, 320);
    }

    heroIndicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        showHeroSlide(Number(indicator.dataset.heroIndicator || 0), { restartTimer: true });
      });
    });

    hero?.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button")) return;
      heroSwipeStartX = event.clientX;
      heroSwipeStartY = event.clientY;
      heroSwipeTracking = true;
    });

    hero?.addEventListener("pointerup", (event) => {
      if (!heroSwipeTracking) return;
      heroSwipeTracking = false;
      const deltaX = event.clientX - heroSwipeStartX;
      const deltaY = event.clientY - heroSwipeStartY;
      if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
      showHeroSlide(heroSlideIndex + (deltaX < 0 ? 1 : -1), { restartTimer: true });
    });

    hero?.addEventListener("pointercancel", () => {
      heroSwipeTracking = false;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHeroTimer();
      else queueHeroTimer();
    });

    queueHeroTimer();
  }

  const updateHeroMotion = () => {
    heroMotionFrame = null;
    if (!hero || !heroMedia || !heroTitle || reduceMotion) return;

    if (heroStaticMobile.matches) {
      heroMedia.style.removeProperty("transform");
      heroTitle.style.removeProperty("transform");
      heroTitle.style.removeProperty("opacity");
      heroSocials?.style.removeProperty("opacity");
      scrollCue?.style.removeProperty("opacity");
      return;
    }

    const progress = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));

    if (progress < 0.002) {
      heroMedia.style.removeProperty("transform");
      heroTitle.style.removeProperty("transform");
      heroTitle.style.removeProperty("opacity");
      heroSocials?.style.removeProperty("opacity");
      scrollCue?.style.removeProperty("opacity");
      return;
    }

    heroMedia.style.transform = `translate3d(0, ${progress * 7}%, 0) scale(${1 + progress * 0.08})`;
    heroTitle.style.transform = `translate3d(0, ${progress * -11}vh, 0) scale(${1 - progress * 0.045})`;
    heroTitle.style.opacity = String(Math.max(0, 1 - progress * 1.22));
    if (heroSocials) heroSocials.style.opacity = String(Math.max(0, 1 - progress * 1.7));
    if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - progress * 2.1));
  };

  if (!reduceMotion) {
    window.addEventListener("scroll", () => {
      if (heroMotionFrame !== null) return;
      heroMotionFrame = requestAnimationFrame(updateHeroMotion);
    }, { passive: true });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((element) => revealObserver.observe(element));
  }

  applyLanguage("it");
  renderCatalog();

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
