/* Studio Twenty Six — site data (global window.S26) */
window.S26 = (function () {
  // Edit most site copy, links, images, calendar dates, prices, and class details in this file.
  // The page components read from these objects so the Claude-design layout can stay stable.
  const SITE = {
    brand: "Studio Twenty Six",
    shortBrand: "studio26",
    location: "Oakland",
    addressLabel: "Studio Twenty Six, Oakland",
    email: "hello@theartway.studio",
    formEndpoint: "https://formsubmit.co/hello@theartway.studio",
    liveUrl: "https://studio26ca.com",
    tagline: "Come find your creative eye.",
    nav: [
      { label: "Calendar", href: "index.html#calendar" },
      { label: "Classes", href: "classes.html" },
      { label: "Happenings", href: "happenings.html" },
      { label: "About", href: "about.html" },
    ],
    footerColumns: [
      {
        heading: "Studio",
        links: [
          { label: "Calendar", href: "index.html#calendar" },
          { label: "Classes", href: "classes.html" },
          { label: "Happenings", href: "happenings.html" },
          { label: "About", href: "about.html" },
        ],
      },
      {
        heading: "Book",
        links: [
          { label: "Sign up", href: "book.html" },
          { label: "Private Events", href: "book.html" },
          { label: "Contact", href: "mailto:hello@theartway.studio" },
        ],
      },
      {
        heading: "Find us",
        links: [
          { label: "Instagram", href: "https://www.instagram.com/theartway/" },
          { label: "TikTok", href: "book.html" },
          { label: "Newsletter", href: "book.html" },
        ],
      },
    ],
  };

  const CLASS_URLS = {
    "peace-love-draw": "peace-love-draw.html",
    "the-craft-show": "the-craft-show.html",
    "ride-or-dye": "ride-or-dye.html",
    "wake-and-make": "wake-and-make.html",
    "paint-the-town": "paint-the-town.html",
    "art-church": "art-church.html",
  };

  const HOME = {
    heroImages: [
      "hero-adobe-11.jpg",
      "hero-adobe-12.jpg",
      "hero-adobe-6.jpg",
      "hero-adobe-7.jpg",
      "hero-pink-teal-4.jpg",
      "hero-pink-teal-5.jpg",
    ],
    hero: {
      eyebrow: "A creative art salon · Oakland",
      meta: "est. 2026",
      lineOne: "Come find your",
      lineTwo: "creative eye.",
      lede: "Studio Twenty Six is a creative salon for art, costumes, classes, events, happenings, and more. Creativity is a pillar of health.",
      ledeEm: "— No experience required.",
      primaryCta: { label: "See the calendar →", href: "#calendar" },
      secondaryCta: { label: "Sign up now", href: "book.html" },
      badge: "✦ Supplies included · Sliding scale available",
    },
    topMarquee: ["Come find your creative eye", "No experience required", "Art is a necessity", "Sliding scale available", "Supplies included"],
    mission: {
      headline: "Art is a necessity.",
      accent: "",
      body: "Studio Twenty Six exists to make the sublime accessible: a room for color, making, experimentation, and creating together. Come as you are. Leave with paint on your hands.",
    },
    tessTeaser: {
      image: "../assets/photo-c6.jpg",
      eyebrow: "About Tess",
      headline: "Artist, costume painter, textile maker, teacher.",
      body: "Tess came to art the way most people come to air: not by choice, but by necessity. Studio Twenty Six is the synthesis of her work in painting, costume, textiles, performance, teaching, and communal making.",
      cta: { label: "Read Tess's story →", href: "about.html" },
    },
    make: {
      eyebrow: "No experience needed",
      headline: "Things you can",
      accent: "make.",
      body: "Draw, dye, paint, stitch, embellish, build a costume, or sit down for a Sunday ritual. The point is not perfection. The point is getting back into your creative body.",
    },
    classMarquee: ["Peace Love Draw", "Art Church", "Ride or Dye", "Wake and Make", "The Craft Show", "Happenings"],
    signupTeaser: {
      eyebrow: "Interest list",
      headline: "Tell us what you want to make.",
      success: "✦ You're on the list — see you at the studio.",
      note: "Prices are listed on each class. Tess can follow up with the right class, date, and payment option.",
    },
  };

  const ABOUT = {
    hero: {
      image: "../assets/photo-c2.jpg",
      eyebrow: "About Studio Twenty Six",
      meta: "Oakland · Creative art salon",
      lineOne: "Making is",
      accent: "medicine.",
      body: "A creative salon for art, costumes, classes, events, happenings, and more. No experience required.",
    },
    marquee: ["Mission", "Vision", "Art is a necessity", "Come find your creative eye"],
    mission: {
      headline: "To make creativity accessible, communal, and impossible to treat like a luxury.",
      body: "Studio Twenty Six exists to make the sublime accessible: a room for color, mess, experimentation, ritual, beauty, and real community. We believe art belongs to everyone, and that healing, self-expression, and belonging are best experienced through the body, the hands, music, color, and fun.",
    },
    vision: {
      headline: "A neighborhood creative salon where making becomes a pillar of health.",
      body: "A place where adults can draw, dye, paint, stitch, embellish, build costumes, gather for ritual, and remember that creativity is not a talent some people have. It is a biological need every person carries.",
    },
    founder: {
      eyebrow: "Founder",
      name: "Tescia Seufferlein",
      portrait: "../assets/tess-portrait.jpg",
      portraitAlt: "Portrait of Tess",
      paragraphs: [
        "Tescia Seufferlein came to art the way most people come to air: not by choice, but by necessity.",
        "Tess builds rooms where people can remember that creativity is not a talent reserved for a few people. It is a biological need. It is part of how the body stays alive in the fullest sense of the word.",
        "Her work moves through painting, textiles, costume, performance, teaching, and community ritual, always circling the same belief: making things with your hands can bring people back to themselves.",
      ],
    },
    credits: [
      "UC Berkeley, Practice of Art",
      "Theatre, Dance, and Performance Studies",
      "Jeff Fender Studio, Brooklyn",
      "Broadway costume painting",
      "California College of the Arts, MFA Textiles",
    ],
    story: {
      image: "../assets/photo-c6.jpg",
      eyebrow: "Costume + Color",
      headline: "From Berkeley to Broadway studios.",
      paragraphs: [
        "Tess studied Practice of Art and Theatre, Dance, and Performance Studies at UC Berkeley, then moved to Brooklyn, where she became head painter and studio manager at Jeff Fender Studio.",
        "There, she painted costumes for Broadway and large-scale performance worlds, including work connected to the Victoria's Secret Fashion Show, War Horse, Of Mice and Men, and Aladdin, alongside costume designers including Ann Roth, Gregg Barnes, and Martin Pakledinaz.",
      ],
    },
    returnStory: {
      eyebrow: "The Return",
      headline: "Textiles, teaching, and the circle around the table.",
      paragraphs: [
        "In 2015, Tess returned to California and earned her MFA in Textiles from California College of the Arts. The studio became a place to bring all of it together: the precision of costume painting, the softness of cloth, the wildness of color, and the deep intelligence of a communal making table.",
        "Studio Twenty Six is that synthesis: a maximalist creative salon in Oakland where classes, costumes, rituals, events, and happenings all become invitations to come back into the creative body.",
      ],
    },
    quote: "Creativity is not a luxury. It is a pillar of health.",
  };

  const SIGNUP = {
      hero: {
        image: "../assets/hero-pink-teal-5.jpg",
        eyebrow: "Sign up",
        meta: "Classes · Workshops · Private events",
        headline: "Choose a class date.",
        body: "Pick the class you want and checkout will use that date automatically.",
    },
    form: {
      eyebrow: "Sign up",
      headline: "Choose a class date.",
      subject: "Studio Twenty Six signup",
      successPath: "/site/book.html#sessions",
      classOptions: ["Private event / group", "Help me choose"],
      paymentOptions: ["Pay now", "Ask about sliding scale"],
      payNowHint: "Ready to book? Pick your class date below and check out securely.",
      slidingScaleHint: "If price is a barrier, send a note and the Studio Twenty Six team will follow up by email.",
      payNowButton: "Pay now",
      slidingScaleButton: "Message the team",
      notesPlaceholder: "Number of seats, access needs, private event ideas, or anything Tess should know.",
      button: "Choose a class date",
    },
    steps: [
      { label: "Step 1", headline: "Choose a class date.", body: "Pick the session that fits your schedule." },
      { label: "Step 2", headline: "Book your spot.", body: "Checkout will collect payment, save your seat, and send confirmation details." },
    ],
    sessionsHeadline: "Class",
    sessionsAccent: "dates.",
    sessionsBody: "Tap a date below. The class and session will carry straight into checkout.",
    emptyLinkText: "Booking link coming soon",
    liveButton: "Choose this date →",
    selectedButton: "Selected date",
    missingButton: "Booking link needed",
  };

  const CHECKOUT = {
    enabled: true,
    endpoint: "/api/checkout",
    headline: "Reserve your spot.",
    body: "Review the class details, then continue to secure checkout.",
    fallbackLabel: "Continue to checkout",
    submitLabel: "Continue to checkout",
    disabledNotice: "",
    freeLabel: "Reserve this spot",
    slidingScaleLabel: "Need sliding scale?",
    slidingScaleBody: "Send the team a quick note and we will help find a rate that works.",
    slidingScaleButton: "Message the team",
  };

  const CLASSES_PAGE = {
    hero: {
      image: "../assets/hero-pink-teal-4.jpg",
      eyebrow: "Classes",
      meta: "No experience required",
      headline: "Choose your way in.",
      body: "Drawing, dye, embellishment, ritual, morning making, and costume work from Studio Twenty Six in Oakland.",
    },
  };

  const CALENDAR = {
    eyebrow: "The Calendar",
    headline: "What's happening at",
    accent: "the studio.",
    intro: "Monthly classes, workshops, and studio happenings from Tess and Studio Twenty Six. Tap anything for details.",
    pricingHeadline: "Pricing",
    pricingBody: "Prices are listed on each class. If cost is a barrier, reach out.",
    recurringNote: "Part of our weekly rhythm — most {day}s, same time.",
    drawerNote: "Prices are listed on each class. If cost is a barrier, message the team about options.",
    artCards: {
      Atelier: { label: "Peace Love Draw", src: "../images/peace-love-draw-flyer.png", href: "peace-love-draw.html" },
      Open: { label: "Wake and Make", src: "../assets/photo-c1.jpg", href: "wake-and-make.html", pending: true },
      Salon: { label: "The Craft Show", src: "../assets/photo-beads.jpg", href: "the-craft-show.html", pending: true },
      Workshop: { label: "Ride or Dye / Paint the Town", src: "../assets/photo-c4.jpg", href: "ride-or-dye.html", pending: true },
      Restore: { label: "Art Church", src: "../images/art-church-flyer.png", href: "art-church.html" },
      Special: { label: "Happenings", src: "../assets/photo-c5.jpg", href: "happenings.html", pending: true },
    },
    eventDetailUrls: {
      "Peace Love Draw": "peace-love-draw.html",
      "The Craft Show": "the-craft-show.html",
      "Ride or Dye": "ride-or-dye.html",
      "Wake and Make": "wake-and-make.html",
      "Paint the Town": "paint-the-town.html",
      "Art Church": "art-church.html",
      "Opening Class / Mini Event": "happenings.html",
      "Opening Block Party": "happenings.html",
      "Surrealist Dinner Party": "happenings.html",
      "Friendsgiving Party": "happenings.html",
      "Holiday Party": "happenings.html",
    },
    goodToKnow: {
      Atelier: ["Live model, flowers, and music", "No experience required", "Bring a sketchbook if you have one; basic supplies are available"],
      Open: ["Coffee and a simple prompt included", "Designed as a low-pressure morning reset", "Farmers market is nearby before or after class"],
      Salon: ["Bring a jacket, bag, denim, or blank to transform", "Embellishment materials are included", "No sewing experience needed"],
      Workshop: ["Technique changes month to month", "Materials are included unless the class notes say BYO", "Expect color, mess, and hands-on instruction"],
      Restore: ["Live choir plus communal making", "All basic materials included", "No sermon, no affiliation required"],
      Special: ["One-off studio happening", "Bring a friend or come solo", "Details may shift as the event gets closer"],
    },
    chips: [
      { k: "Everything" },
      { k: "Peace Love Draw", t: "Atelier" },
      { k: "Wake and Make", t: "Open" },
      { k: "The Craft Show", t: "Salon" },
      { k: "Workshops", t: "Workshop" },
      { k: "Art Church", t: "Restore" },
      { k: "Specials", t: "Special", special: true },
    ],
  };

  const MONTHS = [
    { key: "2026-08", label: "August '26", tag: "Studio opening" },
    { key: "2026-09", label: "September '26", tag: "Fall Launch" },
    { key: "2026-10", label: "October '26", tag: "Costume Season" },
    { key: "2026-11", label: "November '26", tag: "Gathering Season" },
    { key: "2026-12", label: "December '26", tag: "Holiday Studio" },
  ];

  const TYPES = {
    Atelier: {
      label: "Peace Love Draw",
      chip: "Live Drawing",
      day: "Wednesday",
      who: "Led by Tess",
      desc: "A live model. Flowers. Music. The oldest practice there is. Come find your creative eye, no experience required.",
    },
    Open: {
      label: "Wake and Make",
      chip: "Morning Studio",
      day: "Sunday",
      who: "Coffee, prompts, and Tess",
      desc: "Coffee and tea, a simple prompt, and enough structure to get your hands moving before the day gets loud.",
    },
    Salon: {
      label: "The Craft Show",
      chip: "Embellishment",
      day: "Thursday",
      who: "Led by Tess",
      desc: "Bring something. Leave with something entirely different. A monthly costume embellishment studio.",
    },
    Workshop: {
      label: "Ride or Dye / Paint the Town",
      chip: "Rotating Workshops",
      day: null,
      who: "Led by Tess",
      desc: "Different technique every month. Dye, paint, textiles, color experiments, and wearable transformations.",
    },
    Restore: {
      label: "Art Church",
      chip: "Art Church",
      day: "Sunday",
      who: "Live choir + Tess",
      desc: "A live choir sings. We make. Something happens that is hard to name. No sermon, no affiliation required, just sound and creation in the same room.",
    },
    Special: {
      label: "Special",
      chip: "Specials",
      day: null,
      who: "The whole community",
      desc: "A one-off studio happening, launch night, collaboration, or seasonal gathering.",
    },
  };

  const RHYTHM = [
    { d: "WED", t: "Peace Love Draw", time: "6:00-9:00 PM", note: "Live model, flowers, music", href: "peace-love-draw.html" },
    { d: "THU", t: "The Craft Show", time: "6:30-8:30 PM", note: "Monthly costume embellishment", href: "the-craft-show.html" },
    { d: "SUN", t: "Wake and Make", time: "8:00-10:00 AM", note: "Coffee, tea, making", href: "wake-and-make.html" },
    { d: "SUN", t: "Art Church", time: "1:00-3:00 PM", note: "Live choir + making", href: "art-church.html" },
    { d: "TUE", t: "Rotating workshops", time: "6:30-8:30 PM", note: "Dye, paint, costumes, materials", href: "ride-or-dye.html" },
  ];

  const COSTS = {
    drawing: { price: "$25", short: "$25", sliding: "$15-$35 sliding scale" },
    morning: { price: "$40", short: "$40", sliding: "$15-$45 sliding scale" },
    artChurch: { price: "$50", short: "$50", sliding: "$20-$60 sliding scale" },
    craft: { price: "$55", short: "$55", sliding: "$35-$75 sliding scale" },
    workshop: { price: "$65", short: "$65", sliding: "$45-$85 sliding scale" },
    special: { price: "$65", short: "$65", sliding: "$45-$85 sliding scale" },
    free: { price: "$0", short: "$0", sliding: "" },
  };

  const PRICE_GUIDE = [
    { label: "Drawing", price: COSTS.drawing.short, note: "Live drawing drop-in", href: "peace-love-draw.html" },
    { label: "Morning", price: COSTS.morning.short, note: "Coffee + making", href: "wake-and-make.html" },
    { label: "Ritual", price: COSTS.artChurch.short, note: "Art Church", href: "art-church.html" },
    { label: "Craft", price: COSTS.craft.short, note: "Embellishment nights", href: "the-craft-show.html" },
    { label: "Workshop", price: COSTS.workshop.short, note: "Materials included", href: "ride-or-dye.html" },
    { label: "Happenings", price: "Varies", note: "Events + parties", href: "happenings.html" },
  ];

  const S = "Studio Twenty Six, Oakland";
  const BOOKING_URLS = {};
  const e = (date, type, title, sub, time, price, where, blurb, special) =>
    ({ date, type, title, sub: sub || "", time, price, where: where || S, blurb: blurb || "", special: !!special, bookingUrl: BOOKING_URLS[title] || "" });

  const EVENTS = [
    e("2026-08-19", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-08-20", "Salon", "The Craft Show", "Monthly costume embellishment", "6:30-8:30 PM", COSTS.craft.price, S, "Bring something to transform. If not, you can shop studio blanks."),
    e("2026-08-23", "Open", "Wake and Make", "Coffee + tea + making", "8:00-10:00 AM", COSTS.morning.price, S, "Come early before the day starts to get creative. Coffee, tea, a simple prompt, and studio time."),
    e("2026-08-25", "Workshop", "Paint the Town", "Paint night", "6:30-8:30 PM", COSTS.workshop.price, S, "A rotating paint night built around color, music, and a medium that changes month to month."),

    e("2026-09-09", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-09-13", "Restore", "Art Church", "Live choir + making", "1:00-3:00 PM", COSTS.artChurch.price, S, "No sermon. No affiliation required. Just sound and creation in the same room."),
    e("2026-09-19", "Special", "Opening Block Party", "Happening", "Afternoon", COSTS.free.price, S, "Opening block party for the Studio Twenty Six community.", true),
    e("2026-09-27", "Restore", "Art Church", "Live choir + making", "1:00-3:00 PM", COSTS.artChurch.price, S, "No sermon. No affiliation required. Just sound and creation in the same room."),
    e("2026-09-29", "Salon", "The Craft Show", "Monthly costume embellishment", "6:00-9:00 PM", COSTS.craft.price, S, "Bring something to transform. If not, you can shop studio blanks."),

    e("2026-10-06", "Workshop", "Ride or Dye", "Dye class", "6:30-8:30 PM", COSTS.workshop.price, S, "A color-forward textile workshop for dyeing fabric experiments and wearable transformations."),
    e("2026-10-11", "Open", "Wake and Make", "Coffee + tea + making", "8:00-10:00 AM", COSTS.morning.price, S, "Come early before the day starts to get creative. Coffee, tea, a simple prompt, and studio time."),
    e("2026-10-13", "Workshop", "Paint the Town", "Paint night", "6:30-8:30 PM", COSTS.workshop.price, S, "A rotating paint night built around color, music, and a medium that changes month to month."),
    e("2026-10-14", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-10-22", "Special", "Surrealist Dinner Party", "Happening", "6:00-11:00 PM", COSTS.special.price, S, "A surrealist dinner party and studio happening.", true),

    e("2026-11-03", "Workshop", "Paint the Town", "Paint night", "6:30-8:30 PM", COSTS.workshop.price, S, "A rotating paint night built around color, music, and a medium that changes month to month."),
    e("2026-11-08", "Open", "Wake and Make", "Coffee + tea + making", "8:00-10:00 AM", COSTS.morning.price, S, "Come early before the day starts to get creative. Coffee, tea, a simple prompt, and studio time."),
    e("2026-11-15", "Restore", "Art Church", "Live choir + making", "1:00-3:00 PM", COSTS.artChurch.price, S, "No sermon. No affiliation required. Just sound and creation in the same room."),
    e("2026-11-18", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-11-19", "Special", "Friendsgiving Party", "Happening", "6:00-11:00 PM", COSTS.special.price, S, "A Friendsgiving gathering at the studio.", true),

    e("2026-12-01", "Workshop", "Ride or Dye", "Dye class", "6:30-8:30 PM", COSTS.workshop.price, S, "A color-forward textile workshop for dyeing fabric experiments and wearable transformations."),
    e("2026-12-06", "Open", "Wake and Make", "Coffee + tea + making", "8:00-10:00 AM", COSTS.morning.price, S, "Come early before the day starts to get creative. Coffee, tea, a simple prompt, and studio time."),
    e("2026-12-09", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-12-13", "Atelier", "Peace Love Draw", "Live model, flowers, music", "6:00-9:00 PM", COSTS.drawing.price, S, "Figure drawing with a live model, flowers, and music. No experience required."),
    e("2026-12-17", "Special", "Holiday Party", "Happening", "6:00-11:00 PM", COSTS.special.price, S, "A holiday party and seasonal studio happening.", true),
  ];

  const CLASS_DETAILS = {
    "peace-love-draw": {
      title: "Peace Love Draw",
      type: "Atelier",
      kicker: "Live drawing",
      tagline: "A live model. Flowers. Music. The oldest practice there is.",
      price: COSTS.drawing.price,
      sliding: COSTS.drawing.sliding,
      duration: "3 hours",
      capacity: "Up to 40 people",
      space: "Studio Twenty Six",
      rhythm: "Wednesday evening sessions",
      image: "../images/peace-love-draw-flyer.png",
      intro: "A relaxed drawing night for people who want to loosen up, learn to look, and find a line without getting precious. No experience required.",
      includes: ["Live model", "Flowers and music", "Supplies provided", "Gentle prompts and room to experiment"],
      goodFor: ["People who think they cannot draw", "Artists who want a low-pressure figure practice", "Anyone who wants a beautiful reason to sit still and look"],
      notes: "Bring a sketchbook if you have one. If not, come anyway.",
    },
    "the-craft-show": {
      title: "The Craft Show",
      type: "Salon",
      kicker: "Monthly costume embellishment",
      tagline: "Bring something. Leave with something entirely different.",
      price: COSTS.craft.price,
      sliding: COSTS.craft.sliding,
      duration: "2 hours",
      capacity: "15-25 people",
      space: "Studio Twenty Six",
      rhythm: "Thursday evening sessions",
      image: "../assets/photo-beads.jpg",
      intro: "A monthly embellishment studio, part class, part hang, part recommission. Bring something to transform. If not, you can shop studio blanks.",
      includes: ["Hand sewing and patching support", "Rhinestones, fabric paint, foil, applique, and rotating materials", "Shared tools and guidance", "Additional materials may be added at an additional price"],
      goodFor: ["Clothing that needs a second life", "People who want a finished object", "Groups, friends, and solo makers"],
      notes: "Bring something to transform, or use studio blanks when available.",
    },
    "ride-or-dye": {
      title: "Ride or Dye",
      type: "Workshop",
      kicker: "Dye + textile workshop",
      tagline: "Different technique every month. The mess is not optional.",
      price: COSTS.workshop.price,
      sliding: COSTS.workshop.sliding,
      duration: "2 hours",
      capacity: "Small group",
      space: "Studio Twenty Six",
      rhythm: "Monthly rotating technique",
      image: "../assets/photo-c4.jpg",
      intro: "A color-forward textile workshop for dyeing fabric experiments and wearable transformations. Each month explores a different technique, from tie dyeing to ice dyeing and more.",
      includes: ["Dye or textile materials", "Shared tools and studio setup", "Technique demo and hands-on support", "Something dyed, marked, or transformed"],
      goodFor: ["Textile beginners", "People who like process and surprise", "Anyone who wants to make a wearable experiment"],
      notes: "Some sessions may invite you to bring a natural-fiber item from home.",
    },
    "wake-and-make": {
      title: "Wake and Make",
      type: "Open",
      kicker: "Morning studio",
      tagline: "Coffee is hot. Farmers market is across the street. Come make something first.",
      price: COSTS.morning.price,
      sliding: COSTS.morning.sliding,
      duration: "2 hours",
      capacity: "Up to 45 people",
      space: "Studio Twenty Six",
      rhythm: "Sunday morning sessions",
      image: "../assets/photo-c1.jpg",
      intro: "A low-pressure morning making session with coffee, a simple prompt, and enough structure to get your hands moving before the day gets loud.",
      includes: ["Coffee and tea", "A simple creative prompt", "Shared basic materials", "Light guidance from Tess"],
      goodFor: ["People who want a gentle entry point", "Morning makers", "Anyone who wants creative routine without homework"],
      notes: "Come early before the day starts to get creative. No Mary Jane provided.",
    },
    "paint-the-town": {
      title: "Paint the Town",
      type: "Workshop",
      kicker: "Paint night",
      tagline: "Different medium. Different DJ. Every month.",
      price: COSTS.workshop.price,
      sliding: COSTS.workshop.sliding,
      duration: "2 hours",
      capacity: "15-25 people",
      space: "Studio Twenty Six",
      rhythm: "Monthly evening sessions",
      image: "../assets/photo-brushes1.jpg",
      intro: "A rotating paint night built around color, music, and a medium that changes month to month. More studio party than paint-by-numbers.",
      includes: ["Paint and surface materials", "A rotating medium or prompt", "Music", "Guidance without making everyone produce the same thing"],
      goodFor: ["People who want a social painting night", "Friends and date nights", "Makers who like music with their materials"],
      notes: "The DJ and medium can change each month.",
    },
    "art-church": {
      title: "Art Church",
      type: "Restore",
      kicker: "Live choir + making",
      tagline: "A live choir sings. We make. Something happens that is hard to name.",
      price: COSTS.artChurch.price,
      sliding: COSTS.artChurch.sliding,
      duration: "2 hours",
      capacity: "Up to 50 people",
      space: "Studio Twenty Six",
      rhythm: "Monthly Sunday sessions",
      image: "../images/art-church-flyer.png",
      intro: "No sermon. No collection plate. No particular affiliation required. Just sound and creation and a room full of people doing both at the same time.",
      includes: ["Live choir", "Basic materials", "A guided making ritual", "Tea or simple hospitality when available"],
      goodFor: ["People who miss communal ritual", "Artists and non-artists", "Anyone who wants a softer Sunday"],
      notes: "All are welcome. No experience, affiliation, or art identity required.",
    },
  };

  const MEDIUMS = [
    "Drawing",
    "Costumes",
    "Natural Dye",
    "Textiles",
    "Craft Nights",
    "Art Church",
    "Wake and Make",
    "Mixed Media",
    "Events",
    "Happenings",
  ];

  const HAPPENINGS = {
    hero: {
      image: "../assets/photo-c5.jpg",
      eyebrow: "Happenings",
      meta: "Events · Occurrences · Gatherings",
      headline: "Things are",
      accent: "happening.",
      body: "A happening is an artistic occurrence: spontaneous, theatrical, communal, and a little hard to contain. Studio Twenty Six will post more events here as they come together.",
    },
    intro: "Opening parties, dinner parties, seasonal gatherings, and studio events live here.",
  };

  return { SITE, CLASS_URLS, HOME, ABOUT, SIGNUP, CHECKOUT, CLASSES_PAGE, CALENDAR, HAPPENINGS, MONTHS, TYPES, RHYTHM, COSTS, PRICE_GUIDE, BOOKING_URLS, EVENTS, CLASS_DETAILS, MEDIUMS };
})();
