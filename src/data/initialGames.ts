import { Product } from '../types';

export const initialGames: Product[] = [
  {
    id: 'game-wukong',
    type: 'offline_account',
    title: 'Black Myth: Wukong (Deluxe Edition)',
    slug: 'black-myth-wukong',
    price: 399,
    officialPrice: 5999,
    platform: 'Steam',
    genre: ['Экшен', 'RPG', 'Мифология', 'Соулслайк'],
    shortDescription: 'Главный хит года. Путешествуйте по Древнему Китаю в роли Избранного, сражаясь с мифическими демонами и боссами.',
    fullDescription: 'Black Myth: Wukong — динамичная ролевая игра по мотивам классического китайского романа «Путешествие на Запад». В роли Избранного вам предстоит раскрыть тайны великой легенды и сойтись в яростных битвах с сотнями колоритных чудовищ с уникальными стилями боя и магическими превращениями.',
    trailerYoutubeId: 'pnSsgkjTxbE',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Включает все бонусы Deluxe Edition и предзаказа',
      'Пожизненный доступ к сюжетной кампании',
      'Работает полностью в автономном режиме без интернета',
      'Сохранения и прогресс хранятся локально на вашем ПК',
      'Чистый Steam аккаунт без блокировок и очередей'
    ],
    systemRequirements: {
      os: 'Windows 10 / 11 (64-bit)',
      processor: 'Intel Core i5-8400 / AMD Ryzen 5 1600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB',
      storage: '130 GB SSD'
    },
    inStock: 14,
    accountsPool: [
      { id: 'acc-1', login: 'wukong_hero_play1', password: 'VaultPass2026!Wk', pinOrGuard: 'Steam Guard подтвержден', notes: 'Сервер авторизации готов' },
      { id: 'acc-2', login: 'wukong_hero_play2', password: 'DragonPass2026!Wk', pinOrGuard: 'Steam Guard подтвержден', notes: 'Запасной аккаунт' },
      { id: 'acc-3', login: 'wukong_hero_play3', password: 'LegendMyth99!Wk', pinOrGuard: 'Steam Guard подтвержден', notes: 'Чистый аккаунт' }
    ],
    badge: 'Хит продаж',
    rating: 4.96,
    reviewsCount: 384,
    releaseYear: 2024,
    developer: 'Game Science',
    publisher: 'Game Science',
    languages: 'Русский интерфейс и субтитры'
  },
  {
    id: 'game-cyberpunk',
    type: 'offline_account',
    title: 'Cyberpunk 2077 + Phantom Liberty (v2.1)',
    slug: 'cyberpunk-2077-phantom-liberty',
    price: 349,
    officialPrice: 4799,
    platform: 'Steam',
    genre: ['RPG', 'Открытый мир', 'Киберпанк', 'Шутер'],
    shortDescription: 'Полное издание культовой игры с масштабным шпионским дополнением «Призрачная свобода» с Идрисом Эльбой.',
    fullDescription: 'Cyberpunk 2077: Phantom Liberty — масштабное сюжетное дополнение в жанре шпионского триллера для Cyberpunk 2077. Исследуйте опасный закрытый район Догтаун, спасите президента НСША и откройте секреты правительственной контрразведки вместе с секретным агентом Соломоном Ридом.',
    trailerYoutubeId: 'gZk4b7uD6yE',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Полная игра + дополнение Phantom Liberty',
      'Все обновления и патчи включая 2.1 (метро, свидания, тюнинг)',
      'Полная русская озвучка базовой игры и субтитры DLC',
      'Неограниченное время прохождения'
    ],
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Core i7-6700 или Ryzen 5 1600',
      memory: '12 GB RAM',
      graphics: 'GeForce GTX 1060 6GB или Radeon RX 580 8GB',
      storage: '70 GB SSD'
    },
    inStock: 9,
    accountsPool: [
      { id: 'acc-cp1', login: 'nightcity_runner_01', password: 'CyberKey2077!Pl', pinOrGuard: 'Код не требуется', notes: 'Готов к входу' },
      { id: 'acc-cp2', login: 'nightcity_runner_02', password: 'PhantomLib99!Pl', pinOrGuard: 'Код не требуется', notes: 'Лицензия Steam' }
    ],
    badge: 'Полное издание',
    rating: 4.93,
    reviewsCount: 295,
    releaseYear: 2023,
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    languages: 'Полная русская озвучка и текст'
  },
  {
    id: 'game-eldenring',
    type: 'offline_account',
    title: 'Elden Ring + Shadow of the Erdtree',
    slug: 'elden-ring-shadow-of-erdtree',
    price: 379,
    officialPrice: 5499,
    platform: 'Steam',
    genre: ['Соулслайк', 'Темное фэнтези', 'RPG', 'Открытый мир'],
    shortDescription: 'Игра года и крупнейшее в истории дополнение Shadow of the Erdtree. Отправляйтесь в загадочные Земли Теней.',
    fullDescription: 'В землях теней погас свет Золотого Древа. Пройдите по следам Микеллы Неувядающего и бросьте вызов Мессмеру Колосажателю. Десятки новых видов оружия, заклинаний, боссов и бескрайние многоуровневые локации.',
    trailerYoutubeId: 'qLZenOn7WUo',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Оригинальная игра + гигантское DLC Shadow of the Erdtree',
      'Играйте без задержек и фризов в автономном режиме',
      'Ваши сохранения в безопасности, можно ставить моды (Seamless Co-op)',
      'Гарантия вечной работоспособности'
    ],
    systemRequirements: {
      os: 'Windows 10 / 11',
      processor: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
      memory: '12 GB RAM',
      graphics: 'NVIDIA GeForce GTX 1060 3 GB / AMD Radeon RX 580 4 GB',
      storage: '60 GB'
    },
    inStock: 12,
    accountsPool: [
      { id: 'acc-er1', login: 'tarnished_erdtree_01', password: 'RanniDarkMoon#26', pinOrGuard: 'Авторизован', notes: 'DLC включено' },
      { id: 'acc-er2', login: 'tarnished_erdtree_02', password: 'ErdtreeKing#26', pinOrGuard: 'Авторизован', notes: 'Steam Global' }
    ],
    badge: 'Игра года',
    rating: 4.98,
    reviewsCount: 512,
    releaseYear: 2024,
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    languages: 'Русские субтитры и интерфейс'
  },
  {
    id: 'game-silenthill2',
    type: 'offline_account',
    title: 'Silent Hill 2 Remake (Deluxe Edition)',
    slug: 'silent-hill-2-remake',
    price: 369,
    officialPrice: 6200,
    platform: 'Steam',
    genre: ['Хоррор', 'Выживание', 'Мистика', 'Психологический'],
    shortDescription: 'Легендарный ремейк культового психологического хоррора на движке Unreal Engine 5 с потрясающей графикой и атмосферой.',
    fullDescription: 'Получив письмо от своей умершей жены Мэри, Джеймс отправляется туда, где они провели много счастливых дней — в таинственный туманный город Сайлент Хилл. Вас ждет полное аудиовизуальное переосмысление шедевра.',
    trailerYoutubeId: 'pyC_qiW_4ZY',
    coverImage: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Unreal Engine 5 графика следующего поколения',
      'Deluxe маски и цифровой артбук в комплекте',
      'Атмосферный 3D звук и полная поддержка геймпадов DualSense',
      'Бессрочный доступ'
    ],
    systemRequirements: {
      os: 'Windows 10 x64',
      processor: 'Intel Core i7-6700K | AMD Ryzen 5 3600',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce RTX 2060 или AMD Radeon RX 6600 XT',
      storage: '50 GB SSD'
    },
    inStock: 8,
    accountsPool: [
      { id: 'acc-sh1', login: 'foggy_silent_hill_01', password: 'PyramidHead2026!', pinOrGuard: 'Подтвержден', notes: 'Deluxe' }
    ],
    badge: 'Новинка',
    rating: 4.91,
    reviewsCount: 167,
    releaseYear: 2024,
    developer: 'Bloober Team SA',
    publisher: 'KONAMI',
    languages: 'Русские субтитры'
  },
  {
    id: 'game-hogwarts',
    type: 'offline_account',
    title: 'Hogwarts Legacy: Digital Deluxe',
    slug: 'hogwarts-legacy',
    price: 299,
    officialPrice: 4999,
    platform: 'Steam',
    genre: ['RPG', 'Открытый мир', 'Фэнтези', 'Магия'],
    shortDescription: 'Станьте студентом Хогвартса 1800-х годов. Варите зелья, летайте на метле и спасите волшебный мир от восстания гоблинов.',
    fullDescription: 'Хогвартс. Наследие — это захватывающая ролевая игра с открытым миром по вселенной Гарри Поттера. Исследуйте знакомые коридоры замка, Хогсмид, Запретный лес и раскрывайте древнюю тайну, угрожающую колдовскому сообществу.',
    trailerYoutubeId: '1O6QstnCasM',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Набор Темных искусств Deluxe: Фестрал, арена и мантия',
      'Эксклюзивные квесты с привидением в Хогсмиде',
      'Качественная русская фанатская озвучка (GamesVoice) ставится в 1 клик',
      'Автономный режим навсегда'
    ],
    systemRequirements: {
      os: '64-bit Windows 10',
      processor: 'Intel Core i5-6600 (3.3Ghz) or AMD Ryzen 5 1400',
      memory: '16 GB RAM',
      graphics: 'NVIDIA GeForce GTX 960 4GB or AMD Radeon RX 470 4GB',
      storage: '85 GB'
    },
    inStock: 11,
    accountsPool: [
      { id: 'acc-hl1', login: 'hogwarts_magic_01', password: 'AlohomoraSpell!99', pinOrGuard: 'Готов', notes: 'Deluxe Pack' }
    ],
    badge: 'Выбор игроков',
    rating: 4.95,
    reviewsCount: 420,
    releaseYear: 2023,
    developer: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    languages: 'Русский интерфейс и субтитры'
  },
  {
    id: 'game-re4',
    type: 'offline_account',
    title: 'Resident Evil 4 Remake + Separate Ways',
    slug: 'resident-evil-4-remake',
    price: 329,
    officialPrice: 4200,
    platform: 'Steam',
    genre: ['Экшен', 'Хоррор', 'Выживание', 'Шутер'],
    shortDescription: 'Ремейк шедевра выживания с агентом Леоном Кеннеди в испанской глуши плюс кампания за Аду Вонг.',
    fullDescription: 'Прошло 6 лет после катастрофы в Раккун-Сити. Агент Леон С. Кеннеди отправлен спасти похищенную дочь президента США в таинственную европейскую деревушку. В комплекте сюжетное дополнение Separate Ways.',
    trailerYoutubeId: 'j5X1b1zD2gI',
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Базовая игра + DLC Separate Ways за Аду Вонг',
      'Наемники (Mercenaries) режим разблокирован',
      'Полная русская озвучка от Capcom',
      'Мгновенная выдача данных'
    ],
    systemRequirements: {
      os: 'Windows 10 (64 bit)',
      processor: 'AMD Ryzen 3 1200 / Intel Core i5-7500',
      memory: '8 GB RAM',
      graphics: 'AMD Radeon RX 560 4GB / NVIDIA GeForce GTX 1050 Ti 4GB',
      storage: '60 GB'
    },
    inStock: 15,
    accountsPool: [
      { id: 'acc-re1', login: 'leon_kennedy_re4', password: 'LasPlagasBiohazard#4', pinOrGuard: 'Без ограничений', notes: 'All DLC' }
    ],
    badge: 'Хит',
    rating: 4.97,
    reviewsCount: 310,
    releaseYear: 2023,
    developer: 'CAPCOM Co., Ltd.',
    publisher: 'CAPCOM Co., Ltd.',
    languages: 'Полный русский дубляж'
  },
  {
    id: 'game-rdr2',
    type: 'offline_account',
    title: 'Red Dead Redemption 2 (Ultimate Edition)',
    slug: 'red-dead-redemption-2',
    price: 339,
    officialPrice: 4999,
    platform: 'Steam',
    genre: ['Открытый мир', 'Вестерн', 'Экшен', 'Сюжетная'],
    shortDescription: 'Грандиозная история Артура Моргана и банды Ван дер Линде на закате эпохи Дикого Запада.',
    fullDescription: 'Америка, 1899 год. Артур Морган и другие подручные Датча ван дер Линде вынуждены пуститься в бега. Их банде предстоит участвовать в кражах, грабежах и перестрелках в самом сердце дикой Америки.',
    trailerYoutubeId: 'eaW0tYpxyp0',
    coverImage: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Ultimate Edition: эксклюзивное оружие, костюмы и бонусы лагеря',
      'Живой мир с невероятной детализацией',
      'Более 100 часов сюжетного геймплея',
      'Пожизненная гарантия'
    ],
    systemRequirements: {
      os: 'Windows 10 - April 2018 Update',
      processor: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
      memory: '12 GB RAM',
      graphics: 'Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB',
      storage: '150 GB'
    },
    inStock: 19,
    accountsPool: [
      { id: 'acc-rdr1', login: 'arthur_morgan_outlaw', password: 'DutchPlanTahiti!2026', pinOrGuard: 'Вход без проблем', notes: 'Ultimate' }
    ],
    badge: 'Шедевр',
    rating: 4.99,
    reviewsCount: 689,
    releaseYear: 2019,
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    languages: 'Русские субтитры и интерфейс'
  },
  {
    id: 'game-bg3',
    type: 'offline_account',
    title: 'Baldur\'s Gate 3 (Digital Deluxe Edition)',
    slug: 'baldurs-gate-3',
    price: 389,
    officialPrice: 4999,
    platform: 'Steam',
    genre: ['RPG', 'Пошаговая тактика', 'Фэнтези', 'D&D'],
    shortDescription: 'Абсолютная ролевая игра года. Полная свобода выбора, глубокие персонажи и тактические сражения.',
    fullDescription: 'Соберите отряд и вернитесь в Забытые Королевства. Вас ждет история о дружбе и предательстве, выживании и самопожертвовании, а также о соблазне абсолютной власти. Таинственные способности пробуждаются внутри вас благодаря личинке иллитида.',
    trailerYoutubeId: '1T22wN1Mo48',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Digital Deluxe: набор бардовских песен, артефакты Divinity, артбук',
      'Поддержка модов в официальном менеджере модов',
      'Неограниченное число прохождений и концовок',
      'Автономный запуск через лаунчер или exe напрямую'
    ],
    systemRequirements: {
      os: 'Windows 10 64-bit',
      processor: 'Intel i7 8700K / AMD r5 3600',
      memory: '16 GB RAM',
      graphics: 'Nvidia 2060 Super / RX 5700 XT (8GB+ VRAM)',
      storage: '150 GB SSD'
    },
    inStock: 10,
    accountsPool: [
      { id: 'acc-bg1', login: 'mindflayer_tav_01', password: 'AstarionBite!2026', pinOrGuard: 'Одобрен', notes: 'Deluxe' }
    ],
    badge: 'GOTY',
    rating: 4.98,
    reviewsCount: 440,
    releaseYear: 2023,
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    languages: 'Русский интерфейс и текст'
  }
];
