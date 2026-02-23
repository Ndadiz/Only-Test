// model/EventsData.ts
export interface TimelineDataItem {
  title: string;
  period: {
    start: number;
    end: number;
  };
  events: Array<{
    year: number;
    description: string;
  }>;
}

export const timelineData: TimelineDataItem[] = [
  {
    title: "Технологии",
    period: { start: 2015, end: 2016 },
    events: [
      { year: 2015, description: "Запуск React 1.0" },
      { year: 2016, description: "Появление TypeScript 2.0" },
    ],
  },
  {
    title: "Кино",
    period: { start: 2016, end: 2017 },
    events: [
      { year: 2016, description: "Премьера «Прибытия» Дени Вильнёва" },
      { year: 2017, description: "«Бегущий по лезвию 2049» в прокате" },
    ],
  },
  {
    title: "Литература",
    period: { start: 2017, end: 2018 },
    events: [
      { year: 2017, description: "Роман «Щегол» получает Пулитцера" },
      { year: 2018, description: "Выход «Нормальных людей» Салли Руни" },
    ],
  },
  {
    title: "Искусство",
    period: { start: 2018, end: 2019 },
    events: [
      { year: 2018, description: "Выставка NFT-арта в MoMA" },
      { year: 2019, description: "Биеннале цифрового искусства в Венеции" },
    ],
  },
  {
    title: "Музыка",
    period: { start: 1945, end: 1999 },
    events: [
      { year: 2019, description: "Релиз альбома «When We All Fall Asleep»" },
      { year: 2020, description: "Виртуальные концерты в Fortnite" },
    ],
  },
  {
    title: "Наука",
    period: { start: 2020, end: 2022 },
    events: [
      { year: 2020, description: "Создание мРНК-вакцин от COVID-19" },
      { year: 2021, description: "Запуск телескопа Джеймса Уэбба" },
      { year: 2022, description: "Прорыв в термоядерном синтезе (NIF)" },
    ],
  },
];