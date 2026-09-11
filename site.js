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
      "card.note": "In caso di allergie o intolleranze, prima di ordinare informa il personale di sala. La carta puo' variare secondo stagione e disponibilita'.",
      "card.wineNote": "Etichette e annate possono variare secondo disponibilita'. Chiedi al personale il suggerimento del giorno.",
      "hero.overline": "Ristorante - Pizzeria",
      "hero.hours": "<span>PRANZO, CENA &amp; CONVIVIALITA'</span> CUCINA LIGURE - PESCE - PIZZA - VINI",
      "hero.edge": "Cucina ligure & mare",
      "hero.discover": "Scopri Il Clipper",
      "restaurant.kicker": "01 Ristorante",
      "restaurant.copy1": "Cucina ligure, specialita' di mare e pizza in un ristorante accogliente nel cuore di Bogliasco.",
      "restaurant.copy2": "Una tavola semplice, curata e conviviale per pranzo, cena e serate sul Golfo Paradiso.",
      "restaurant.mobileCopy": "Cucina ligure, pesce e pizza nel cuore di Bogliasco.",
      "food.catch": "Plateau di mare",
      "food.pasta": "Crudo di mare",
      "food.stockfish": "Ostriche e limone",
      "food.grill": "Spaghetti alle vongole",
      "food.fish": "Filetto delicato",
      "food.pizza": "Spaghetti allo scoglio",
      "food.specialPasta": "Pasta mediterranea",
      "food.dessert": "Calamarata di mare",
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
      "reviews.quote1": "Pesce, pizza e piatti liguri pensati per una pausa di gusto a Bogliasco.",
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
      "cookie.copy": "Usiamo solo strumenti tecnici. Per aprire WhatsApp dai form o caricare Google Maps ti chiediamo prima il consenso ai servizi esterni.",
      "cookie.necessary": "Solo necessari",
      "cookie.accept": "Accetta servizi esterni",
      "cookie.preferences": "Dettagli",
      "map.notice": "La mappa di Google viene caricata solo dopo il consenso ai servizi esterni.",
      "map.load": "Carica la mappa",
      "form.kicker": "Scrivici su WhatsApp",
      "form.title": "Raccontaci<br><em>cosa desideri.</em>",
      "form.intro": "Compila i campi: prepareremo il messaggio e ti chiederemo il consenso prima di aprire WhatsApp.",
      "form.name": "Nome e cognome *",
      "form.date": "Data",
      "form.time": "Orario",
      "form.guests": "Persone",
      "form.choose": "Scegli",
      "form.message": "Messaggio",
      "form.placeholder": "Richieste o informazioni utili",
      "form.submit": "Continua su WhatsApp",
      "form.note": "Nessun dato viene salvato sul sito: prima di aprire WhatsApp ti chiediamo il consenso ai servizi esterni.",
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
      "card.note": "In case of allergies or intolerances, please inform our staff before ordering. The menu may vary according to season and availability.",
      "card.wineNote": "Labels and vintages may vary according to availability. Ask our staff for today's recommendation.",
      "hero.overline": "Restaurant - Pizzeria",
      "hero.hours": "<span>LUNCH, DINNER &amp; CONVIVIALITY</span> LIGURIAN CUISINE - SEAFOOD - PIZZA - WINES",
      "hero.edge": "Ligurian cuisine & sea",
      "hero.discover": "Discover Il Clipper",
      "restaurant.kicker": "01 Restaurant",
      "restaurant.copy1": "Ligurian cooking, seafood specialities and pizza in a welcoming restaurant in the heart of Bogliasco.",
      "restaurant.copy2": "A simple, curated and convivial table for lunch, dinner and evenings on Golfo Paradiso.",
      "restaurant.mobileCopy": "Ligurian cuisine, seafood and pizza in the heart of Bogliasco.",
      "food.catch": "Seafood plateau",
      "food.pasta": "Raw seafood",
      "food.stockfish": "Oysters and lemon",
      "food.grill": "Spaghetti with clams",
      "food.fish": "Delicate fillet",
      "food.pizza": "Seafood spaghetti",
      "food.specialPasta": "Mediterranean pasta",
      "food.dessert": "Seafood calamarata",
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
      "reviews.quote1": "Seafood, pizza and Ligurian dishes designed for a flavourful stop in Bogliasco.",
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
      "cookie.copy": "We only use technical tools. To open WhatsApp from forms or load Google Maps, we ask for your consent to external services first.",
      "cookie.necessary": "Necessary only",
      "cookie.accept": "Accept external services",
      "cookie.preferences": "Details",
      "map.notice": "Google Maps is loaded only after consent to external services.",
      "map.load": "Load map",
      "form.kicker": "Message us on WhatsApp",
      "form.title": "Tell us<br><em>what you need.</em>",
      "form.intro": "Complete the fields: we will prepare your message and ask for consent before opening WhatsApp.",
      "form.name": "Full name *",
      "form.date": "Date",
      "form.time": "Time",
      "form.guests": "Guests",
      "form.choose": "Select",
      "form.message": "Message",
      "form.placeholder": "Requests or useful information",
      "form.submit": "Continue on WhatsApp",
      "form.note": "No data is stored on this website: we ask for consent to external services before opening WhatsApp.",
    },
  };

  const menuCatalogs = {
    food: {
      intro: {
        it: {
          kicker: "Il Clipper · Cucina ligure",
          title: "Il nostro<br><em>menu.</em>",
          description: "Proposte di mare, cucina ligure, pizza e dessert. La carta puo' variare secondo stagione e disponibilita'.",
        },
        en: {
          kicker: "Il Clipper · Ligurian cuisine",
          title: "Our<br><em>menu.</em>",
          description: "Seafood dishes, Ligurian cooking, pizza and desserts. The menu may vary according to season and availability.",
        },
      },
      sections: [
        {
          it: "Antipasti",
          en: "Starters",
          items: [
            { it: "Tartare di tonno", en: "Tuna tartare" },
            { it: "Insalata di mare", en: "Seafood salad" },
            { it: "Acciughe e sapori liguri", en: "Anchovies and Ligurian flavours" },
          ],
        },
        {
          it: "Primi",
          en: "Pasta",
          items: [
            { it: "Spaghetti alla carbonara di mare", en: "Seafood carbonara spaghetti" },
            { it: "Pasta al pesto ligure", en: "Ligurian pesto pasta" },
            { it: "Primi di pesce secondo disponibilita'", en: "Seafood pasta according to availability" },
          ],
        },
        {
          it: "Secondi",
          en: "Main courses",
          items: [
            { it: "Stoccafisso alla ligure", en: "Ligurian stockfish" },
            { it: "Grigliata mista di pesce", en: "Mixed grilled fish" },
            { it: "Pesce fresco del giorno", en: "Fresh fish of the day" },
          ],
        },
        {
          it: "Pizze",
          en: "Pizza",
          items: [
            { it: "Pizza classica", en: "Classic pizza" },
            { it: "Pizza con ingredienti mediterranei", en: "Pizza with Mediterranean ingredients" },
            { it: "Proposte del giorno", en: "Daily specials" },
          ],
        },
        {
          it: "Dessert",
          en: "Desserts",
          items: [
            { it: "Tiramisu' della casa", en: "House tiramisu" },
            { it: "Dolci al cucchiaio", en: "Spoon desserts" },
          ],
        },
      ],
    },
    wine: {
      intro: {
        it: {
          kicker: "Il Clipper · Carta vini",
          title: "Carta<br><em>dei Vini.</em>",
          description: "Bianchi, rossi e bollicine per accompagnare cucina di mare, pizza e serate informali.",
        },
        en: {
          kicker: "Il Clipper · Wine list",
          title: "Wine<br><em>list.</em>",
          description: "White wines, reds and sparkling labels for seafood cooking, pizza and relaxed evenings.",
        },
      },
      sections: [
        {
          it: "Bollicine",
          en: "Sparkling",
          items: [
            { it: "Prosecco e metodo classico", en: "Prosecco and classic method" },
            { it: "Etichette per aperitivo", en: "Aperitif labels" },
          ],
        },
        {
          it: "Bianchi",
          en: "Whites",
          items: [
            { it: "Vermentino e bianchi liguri", en: "Vermentino and Ligurian whites" },
            { it: "Bianchi per piatti di mare", en: "Whites for seafood dishes" },
          ],
        },
        {
          it: "Rossi",
          en: "Reds",
          items: [
            { it: "Rossi mediterranei", en: "Mediterranean reds" },
            { it: "Calici e bottiglie secondo disponibilita'", en: "Glasses and bottles according to availability" },
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
                ${(item[currentLanguage === "it" ? "en" : "it"]) ? `<p>${item[currentLanguage === "it" ? "en" : "it"]}</p>` : ""}
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
  const cookieBanner = document.querySelector("[data-cookie-banner]");
  const mapFrame = document.querySelector("[data-map-src]");
  const mapConsent = document.querySelector("[data-map-consent]");
  const mapFrameWrap = mapFrame?.closest(".map-frame");
  let externalServicesAllowed = false;
  let pendingExternalAction = null;

  const readConsent = () => {
    try {
      return JSON.parse(window.localStorage.getItem(consentStorageKey) || "null");
    } catch {
      return null;
    }
  };

  const saveConsent = (externalServices) => {
    try {
      window.localStorage.setItem(consentStorageKey, JSON.stringify({ externalServices, savedAt: new Date().toISOString() }));
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

  const hasExternalServicesConsent = () => externalServicesAllowed || readConsent()?.externalServices === true;
  const openExternalUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const requestExternalUrl = (url) => {
    if (hasExternalServicesConsent()) {
      openExternalUrl(url);
      return true;
    }

    pendingExternalAction = () => openExternalUrl(url);
    showCookieBanner();
    return false;
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
    externalServicesAllowed = externalServices;
    saveConsent(externalServices);
    if (externalServices) loadExternalMap({ persist: false });
    else unloadExternalMap();
    hideCookieBanner();

    const action = externalServices ? pendingExternalAction : null;
    pendingExternalAction = null;
    action?.();
  };

  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => setExternalConsent(true));
  document.querySelector("[data-cookie-necessary]")?.addEventListener("click", () => setExternalConsent(false));
  document.querySelector("[data-map-load]")?.addEventListener("click", () => setExternalConsent(true));

  document.querySelectorAll("a[href*='google.com/maps']").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (hasExternalServicesConsent()) return;
      event.preventDefault();
      requestExternalUrl(link.href);
    });
  });

  document.querySelectorAll("[data-cookie-manage]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showCookieBanner();
    });
  });

  const initialConsent = readConsent();
  externalServicesAllowed = initialConsent?.externalServices === true;
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
