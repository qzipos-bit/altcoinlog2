/**
 * Единый источник реквизитов для всех юридических документов сайта.
 *
 * ДО ЗАПУСКА заполните пустые поля: 152-ФЗ (ст. 18.1) требует, чтобы политика
 * обработки ПД называла конкретного оператора, а согласие (ст. 9 ч. 4) — его
 * наименование и адрес. Пока поле пустое, на странице выводится заметная
 * пометка «[… — заполнить]», чтобы пропуск нельзя было не заметить.
 */
export const operator = {
  brand: "Altcoinlog",
  domain: "altcoinlog.com",
  siteUrl: "https://altcoinlog.com",
  foundedYear: 2017,

  /** Например: «Индивидуальный предприниматель Леусенко Александр Александрович» или «ООО „…“». */
  legalName: "",
  inn: "",
  ogrnOrOgrnip: "",
  /** Адрес для корреспонденции и запросов субъектов ПД. */
  address: "Россия, г. Москва, ул. Кожевническая, д. 14",
  /** Регистрационный номер в реестре операторов ПД Роскомнадзора (pd.rkn.gov.ru). */
  rknOperatorNumber: "",
  /** Свидетельство о регистрации СМИ (ЭЛ № ФС …), если сайт зарегистрирован как СМИ. Пусто — сайт не называет себя СМИ. */
  massMediaRegistration: "",
  editorInChief: "Дмитрий Клименко",

  emails: {
    support: "support@altcoinlog.com",
    sales: "sales@altcoinlog.com",
    press: "press@altcoinlog.com",
    job: "job@altcoinlog.com",
  },

  social: {
    telegram: "https://t.me/+OFpP4M0YYz01M2Ji",
    vk: "https://vk.com/altcoinlog",
    twitter: "https://twitter.com/AltCoinLog",
    youtube: "https://www.youtube.com/channel/UCwidv9P4smbtAP_otIFYmKg",
  },
  mediaKitUrl: "https://drive.google.com/file/d/1HOTS6xidPzZD5QU0so7ZQY5vcgw4IbPf/view?usp=sharing",
  englishSiteUrl: "https://en.altcoinlog.com/",
} as const;

export function filled(value: string, label: string): string {
  return value.trim() ? value : `[${label} — заполнить]`;
}

/** Строка «кто оператор» для текстов документов. */
export function operatorIdentity(): string {
  return [
    filled(operator.legalName, "наименование оператора"),
    `ИНН ${filled(operator.inn, "ИНН")}`,
    `ОГРН/ОГРНИП ${filled(operator.ogrnOrOgrnip, "ОГРН")}`,
    `адрес: ${operator.address}`,
  ].join(", ");
}

/** Как сайт называет себя: «СМИ» — только при наличии регистрации. */
export function mediaStatus(): string {
  return operator.massMediaRegistration
    ? `сетевое издание (свидетельство о регистрации СМИ ${operator.massMediaRegistration})`
    : "независимое информационное онлайн-издание";
}
