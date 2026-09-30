/**
 * Copy and media for /brands/. Captions, specs, durations, numbers and
 * testimonials are DRAFT copy — the owner has to replace them with real data.
 */

const WA = "https://wa.me/77781200084";

export function waLink(text: string) {
  return `${WA}?text=${encodeURIComponent(text)}`;
}

export const WA_SEWING = waLink(
  "Здравствуйте! Нужен пошив одежды под наш бренд — с логотипом.",
);

/* ---------- Lookbook ---------- */

export type CapsuleId = "lilac" | "black" | "blue";

export const CAPSULES: { id: CapsuleId; label: string }[] = [
  { id: "lilac", label: "Лиловая «02»" },
  { id: "black", label: "Чёрная «2E»" },
  { id: "blue", label: "Серо-голубая «2EASY»" },
];

export type LookbookShot = {
  n: number;
  src: string;
  alt: string;
  capsule: CapsuleId;
  /** Focal point for object-position when cropped. */
  focus?: string;
  /** Article, fabric, technique. */
  caption: string;
  /** Kept out of the public grid (there is a weapon in the frame). */
  hidden?: boolean;
};

const CAPTIONS: Record<CapsuleId, string> = {
  lilac: "Оверсайз футболка · кулирка 220 г/м² · шелкография",
  black: "Футболка «2E» · футер 240 г/м² · DTF-печать",
  blue: "Футболка 2EASY · кулирка 200 г/м² · вышивка + принт",
};

function shot(
  n: number,
  capsule: CapsuleId,
  alt: string,
  extra: Partial<Pick<LookbookShot, "focus" | "hidden">> = {},
): LookbookShot {
  return {
    n,
    src: `/images/photos-brands/brand_${n}.jpg`,
    alt,
    capsule,
    caption: CAPTIONS[capsule],
    ...extra,
  };
}

export const LOOKBOOK: LookbookShot[] = [
  shot(1, "lilac", "Лиловый комплект ночью у машины", { focus: "center 62%" }),
  shot(2, "lilac", "Оверсайз футболка «02» на фоне фар", { focus: "center 34%" }),
  shot(3, "lilac", "Принт на спине лиловой футболки", { focus: "center 32%" }),
  shot(4, "lilac", "Образ в полный рост на капоте под луной", { focus: "center 58%" }),
  shot(5, "lilac", "Крупный план принта «02» и легинсов", { focus: "center 34%" }),
  shot(6, "lilac", "Лиловая футболка с принтом на спине", { focus: "center 30%" }),
  shot(7, "black", "Чёрная футболка «2E» среди контейнеров", { focus: "center 30%" }),
  shot(8, "black", "Принт на спине чёрной футболки", { focus: "center 42%" }),
  shot(9, "black", "Чёрная футболка «2E» за красными лентами", { focus: "center 30%" }),
  shot(10, "black", "Образ в полный рост у контейнеров", { hidden: true }),
  shot(11, "black", "Чёрная футболка «2E», поясной план", { hidden: true }),
  shot(12, "black", "Крупный план принта «2E»", { hidden: true }),
  shot(13, "black", "Групповой кадр у контейнеров", { hidden: true }),
  shot(14, "black", "Групповой кадр за красными лентами", { hidden: true }),
  shot(15, "black", "Чёрная футболка «2E» на девушке", { focus: "center 30%" }),
  shot(16, "black", "Принт на спине чёрной оверсайз футболки", { focus: "center 30%" }),
  shot(17, "black", "Чёрная футболка в движении", { focus: "center 40%" }),
  shot(18, "black", "Парный кадр в футболках «2E»", { focus: "center 30%" }),
  shot(19, "blue", "Серо-голубая футболка на контейнере", { focus: "center 40%" }),
  shot(20, "blue", "Серо-голубая футболка 2EASY, фронт", { focus: "center 30%" }),
  shot(21, "blue", "Принт на спине серо-голубой футболки", { focus: "center 35%" }),
  shot(22, "blue", "Образ сидя на контейнере", { focus: "center 40%" }),
  shot(23, "blue", "Образ на краю контейнера", { focus: "center 40%" }),
  shot(24, "blue", "Силуэт на контейнере ночью", { focus: "center 45%" }),
  shot(25, "blue", "Кадр со спины на контейнере", { focus: "center 45%" }),
  shot(26, "blue", "Серо-голубая футболка, общий план", { focus: "center 45%" }),
  shot(27, "blue", "Серо-голубая футболка 2EASY на девушке", { focus: "center 30%" }),
  shot(28, "blue", "Логотип 2EASY на груди, крупный план", { focus: "center 50%" }),
  shot(29, "blue", "Принт на спине, крупный план", { focus: "center 45%" }),
];

export function publicShots(): LookbookShot[] {
  return LOOKBOOK.filter((item) => !item.hidden);
}

export function shotByNumber(n: number) {
  const found = LOOKBOOK.find((item) => item.n === n);
  if (!found) throw new Error(`Lookbook shot ${n} is missing`);
  return found;
}

/* ---------- Hero ---------- */

export const HERO = {
  eyebrow: "Пошив одежды · Шымкент · с 2008",
  title: "Производим одежду для брендов",
  lead: "Футболки, худи, свитшоты и другая одежда на заказ. Наносим логотип, вышивку и шевроны — со своего завода в Казахстане.",
  shot: 4,
  specs: ["Шымкент", "С 2008", "Свой завод", "От 50 шт", "От 14 дней"],
};

/* ---------- 2EASY story (company history) ---------- */

export type StoryChapter = {
  year: string;
  title: string;
  text: string;
  shot: number;
};

export const EASY_STORY = {
  title: "Мы сами запустили бренд одежды",
  lead: "2EASY — наша собственная линия молодёжного трикотажа. Лукбук на этой странице — одежда 2EASY.",
  chapters: [
    {
      year: "2020 – 2021",
      title: "Трикотаж и печать",
      text: "Внедрили линию сублимационной печати на тканях и организовали производство трикотажных спортивных изделий.",
      shot: 29,
    },
    {
      year: "2023",
      title: "Запуск 2EASY",
      text: "Запустили трикотажную молодёжную одежду под брендом 2EASY и расширили производство ещё на 200 м².",
      shot: 20,
    },
    {
      year: "Лукбук",
      title: "Три капсулы",
      text: "На съёмке — лиловая капсула «02», чёрная «2E» и серо-голубая «2EASY».",
      shot: 4,
    },
  ] satisfies StoryChapter[],
  stats: [{ value: "12 000", label: "Изделий за первый год" }],
  channels: ["Instagram", "Kaspi", "Шоурум"],
  details:
    "На этом бренде отрабатываем лекала, ткани и нанесения, которые потом предлагаем клиентам.",
};

/* ---------- Capabilities (company history) ---------- */

export const CAPABILITIES = {
  title: "Полный цикл на одной площадке",
  lead: "От утеплителя и стёжки до пошива и нанесения — на собственном производстве в Шымкенте.",
  stages: [
    {
      label: "Утеплитель",
      text: "Выпускаем свои утеплители Teksulate и UniFiber.",
      source: "с 2008",
    },
    {
      label: "Стёжка",
      text: "Стёжка утеплителя на своём оборудовании — для курток и жилетов.",
      source: "с 2008",
    },
    {
      label: "Раскрой и пошив",
      text: "Швейная фабрика с автоматизированными линиями.",
      source: "2020 – 2021",
    },
    {
      label: "Сублимация",
      text: "Своя линия сублимационной печати на тканях.",
      source: "2020 – 2021",
    },
    {
      label: "Нанесение",
      text: "Логотип, вышивка и шевроны прямо в цеху.",
      source: "Брендирование",
    },
    {
      label: "ОТК и отгрузка",
      text: "Проверяем каждое изделие, упаковываем и отправляем по РК.",
      source: "Готово",
    },
  ],
  area: "900 м² швейного цеха с 2016 – 2017 и ещё 200 м² в 2023 году",
  numbers: [
    { value: "30 000", label: "изделий в месяц" },
    { value: "4", label: "швейные линии" },
    { value: "120+", label: "сотрудников" },
    { value: "3 500 м²", label: "производства" },
  ],
};

/* ---------- Techniques ---------- */

export type Photo = { src: string; alt: string; focus?: string };

export type Technique = {
  label: string;
  text: string;
  photo: Photo;
};

export const TECHNIQUES: { main: Technique[]; extra: string[] } = {
  main: [
    {
      label: "Логотип",
      text: "Наносим логотип вашего бренда на изделие.",
      photo: {
        src: "/images/photos-brands/brand_28.jpg",
        alt: "Логотип 2EASY на груди футболки",
        focus: "center 55%",
      },
    },
    {
      label: "Вышивка",
      text: "Вышивка логотипа и надписей на ткани.",
      photo: {
        src: "/images/apparel/zhilety/variant-1/02.jpg",
        alt: "Нанесение логотипа на жилет",
        focus: "center 40%",
      },
    },
    {
      label: "Шевроны",
      text: "Шевроны и нашивки под бренд.",
      photo: {
        src: "/images/apparel/kurtki/variant-1/05.jpg",
        alt: "Шеврон на рукаве куртки",
        focus: "center 40%",
      },
    },
    {
      label: "Сублимация",
      text: "Сублимационная печать на тканях на своей линии.",
      photo: {
        src: "/images/photos-brands/brand_29.jpg",
        alt: "Принт на спине футболки, крупный план",
        focus: "center 45%",
      },
    },
  ],
  extra: ["Шелкография", "DTF-печать", "Жаккардовые бирки", "Брендированная упаковка"],
};

/* ---------- Clothing categories ---------- */

export type Category = {
  label: string;
  photo: Photo;
  /** Density, fabric, fit. */
  specs: string;
};

export const CATEGORIES: Category[] = [
  {
    label: "Футболки",
    photo: {
      src: "/images/photos-brands/brand_20.jpg",
      alt: "Серо-голубая оверсайз футболка 2EASY",
      focus: "center 30%",
    },
    specs: "Кулирка 180–240 г/м² · regular и oversize",
  },
  {
    label: "Худи и свитшоты",
    photo: {
      src: "/images/photos-brands/brand_16.jpg",
      alt: "Оверсайз силуэт с принтом на спине",
      focus: "center 30%",
    },
    specs: "Футер 280–380 г/м² · начёс · oversize",
  },
  {
    label: "Комплекты",
    photo: {
      src: "/images/photos-brands/brand_2.jpg",
      alt: "Лиловый комплект: футболка «02» и легинсы",
      focus: "center 34%",
    },
    specs: "Футболка + легинсы или джоггеры · в цвет",
  },
  {
    label: "Флис и софтшелл",
    photo: {
      src: "/images/apparel/zhilety/variant-1/01.jpg",
      alt: "Флисовая куртка цвета хаки с логотипом",
      focus: "center 30%",
    },
    specs: "Флис 280 г/м² · софтшелл · вышивка логотипа",
  },
  {
    label: "Утеплённые куртки",
    photo: {
      src: "/images/apparel/kurtki/variant-1/03.jpg",
      alt: "Утеплённая куртка со светоотражающими полосами",
      focus: "center 30%",
    },
    specs: "Мембрана и оксфорд · утеплитель Teksulate 100–300 г/м²",
  },
  {
    label: "Форма для команды",
    photo: {
      src: "/images/apparel/kurtki/variant-2/01.jpg",
      alt: "Рабочий костюм в фирменных цветах",
      focus: "center 30%",
    },
    specs: "Смесовые ткани · фирменные цвета · шевроны",
  },
];

/* ---------- Process ---------- */

export type ProcessStep = { title: string; text: string; duration: string };

export const PROCESS: ProcessStep[] = [
  { title: "Бриф", text: "Изделие, ткань, тираж, нанесение и сроки.", duration: "1 день" },
  { title: "Сэмпл", text: "Шьём образец по вашему ТЗ или референсу.", duration: "3–5 дней" },
  { title: "Утверждение", text: "Правим посадку и детали, фиксируем цену.", duration: "1–2 дня" },
  { title: "Раскрой", text: "Закупаем ткань и кроим весь тираж.", duration: "2 дня" },
  { title: "Пошив и нанесение", text: "Шьём, печатаем и вышиваем на своих линиях.", duration: "7–10 дней" },
  { title: "ОТК, упаковка, доставка", text: "Проверяем каждое изделие и отправляем по РК.", duration: "2–3 дня" },
];

/* ---------- Detail ↔ look ---------- */

export type ComparePair = {
  detail: Photo;
  look: Photo;
  label: string;
};

/** The same 2EASY garment as a close-up and in the lookbook. */
export const COMPARE_PAIRS: ComparePair[] = [
  {
    detail: {
      src: "/images/photos-brands/brand_29.jpg",
      alt: "Принт на спине серо-голубой футболки, крупный план",
      focus: "center 45%",
    },
    look: {
      src: "/images/photos-brands/brand_21.jpg",
      alt: "Серо-голубая футболка 2EASY со спины",
      focus: "center 35%",
    },
    label: "Принт на спине · серо-голубая капсула",
  },
  {
    detail: {
      src: "/images/photos-brands/brand_5.jpg",
      alt: "Крупный план принта «02» и легинсов",
      focus: "center 34%",
    },
    look: {
      src: "/images/photos-brands/brand_2.jpg",
      alt: "Лиловая футболка «02» на фоне фар",
      focus: "center 34%",
    },
    label: "Номер «02» · лиловая капсула",
  },
];

/* ---------- Proof ---------- */

export type Testimonial = { quote: string; author: string; brand: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Отшили первую партию худи за три недели. Сэмпл сделали быстро, по посадке поправили с первого раза.",
    author: "Алия К.",
    brand: "Nomad Club",
  },
  {
    quote:
      "Искали производство в Казахстане, чтобы не возить из Китая. Качество швов и печати — на уровне, берём повторно.",
    author: "Даниар С.",
    brand: "Steppe Wear",
  },
  {
    quote:
      "Помогли подобрать футер и плотность под оверсайз. Вышивка чистая, бирки и упаковка — как у больших брендов.",
    author: "Мадина Т.",
    brand: "Qala Studio",
  },
];

/* ---------- Brief ---------- */

export const BRIEF = {
  products: [...CATEGORIES.map((item) => item.label), "Другое"],
  techniques: [...TECHNIQUES.main.map((item) => item.label), "Пока не знаю"],
};

/* ---------- Footer ---------- */

export const COMPANY = {
  name: "Termmo Balance",
  address: "Шымкент, ул. Жибек-Жолы 66/3",
  mapsUrl:
    "https://2gis.kz/shymkent/search/" + encodeURIComponent("Жибек-Жолы 66/3"),
  phone: "+7 778 120 00 84",
  phoneHref: "tel:+77781200084",
  email: "trmblnc0005@gmail.com",
  whatsapp: WA,
  hours: "Пн–Сб 9:00–18:00",
};
