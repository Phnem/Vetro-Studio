/* Vetro i18n — English is authored in the HTML; this file holds the Russian dictionary.
   data-i18n="key"          → textContent
   data-i18n-html="key"     → innerHTML (trusted, authored here)
   data-i18n-attr="a:key;b:key2" → attribute values */
(() => {
  'use strict';

  const RU = {
    'lang.label': 'Язык', 'nav.menu': 'Меню', 'nav.navigation': 'Навигация', 'nav.collection': 'Коллекция', 'nav.collection.up': 'КОЛЛЕКЦИЯ',
    'modal.close': 'Закрыть',
    'fmt.anime': 'Аниме', 'fmt.movies': 'Фильмы', 'fmt.series': 'Сериалы', 'fmt.manga': 'Манга', 'fmt.audio': 'Аудиокниги',
    'fmt.anime.up': 'АНИМЕ', 'fmt.movies.up': 'ФИЛЬМЫ', 'fmt.series.up': 'СЕРИАЛЫ', 'fmt.manga.up': 'МАНГА', 'fmt.audio.up': 'АУДИОКНИГИ',
    'footer.project': 'Проект', 'footer.legal': 'Правовое', 'footer.privacy': 'Политика конфиденциальности', 'footer.studio': 'Для тех, кто хочет хранить своё.',
    'footer.col': 'Собирайте, смотрите, читайте, слушайте и помните.', 'footer.look': 'Нативный просмотрщик изображений и фотобиблиотека для Windows.', 'footer.license': 'Лицензия GPL-3.0',

    /* studio */
    'index.title': 'Vetro Studio — инструменты, которые хранят важное рядом',
    'index.desc': 'Vetro делает local-first инструменты для того, что вы решили сохранить: медиаколлекции и фотобиблиотеки.',
    'index.nav.cta': 'Выбрать продукт', 'index.eyebrow': 'Local-first программы',
    'index.tagline': 'Держите свой <em>мир</em> рядом.',
    'index.lede': 'Vetro делает тихие, личные инструменты для коллекций и фотографий, которые и так принадлежат вам.',
    'index.cta': 'Познакомиться с продуктами', 'index.heroindex': 'СОБИРАЙ / СМОТРИ / ХРАНИ',
    'ticker.1': 'СОБИРАЙ', 'ticker.2': 'СМОТРИ', 'ticker.3': 'ХРАНИ', 'ticker.4': 'БЕЗ РЕКЛАМЫ', 'ticker.5': 'ОТКРЫТЫЙ КОД',
    'index.products.eyebrow': 'Два продукта — один принцип',
    'index.products.title': 'Ваши файлы, ваш вкус, <em>ваш темп.</em>',
    'index.col.platform': 'Android', 'index.col.text': 'Одна библиотека для аниме, фильмов, сериалов, манги и аудиокниг — работает офлайн.',
    'index.col.formats': 'Форматы', 'index.col.cta': 'Открыть Collection', 'index.col.alt': 'Экраны приложения Vetro Collection',
    'index.look.alt': 'Просмотрщик изображений VetroLook в Windows', 'index.look.platform': 'Windows 10 и 11',
    'index.look.text': 'Быстрый нативный просмотрщик изображений и фотобиблиотека, которая работает прямо с вашими папками.',
    'index.look.chips': 'Особенности', 'index.look.chip.native': 'Нативный C++', 'index.look.chip.nocloud': 'Без облака', 'index.look.cta': 'Узнать о VetroLook',
    'index.principle.eyebrow': 'Как мы делаем',
    'index.principle.title': 'Приватность по умолчанию. <em>Польза по замыслу.</em>',
    'index.principle.lede': 'Никакой экономики внимания, принудительного облака и выдуманных категорий. Продукты Vetro начинаются с того, что уже есть на вашем устройстве.',
    'index.p1.t': 'Local-first', 'index.p1.d': 'Ваша библиотека живёт на вашем устройстве. Облачная синхронизация — выбор, а не требование.',
    'index.p2.t': 'Без шума', 'index.p2.d': 'Без рекламы, профиля слежки и обязательных аккаунтов. Только то, ради чего вы пришли.',
    'index.p3.t': 'Открытый код', 'index.p3.d': 'Мы работаем открыто. Читайте код, делитесь идеями или сообщайте о проблемах.',
    'index.source': 'Смотреть исходный код', 'index.chat': 'В чат Telegram',

    /* collection */
    'col.title': 'Vetro Collection — ваша медиабиблиотека для Android',
    'col.desc': 'Vetro собирает аниме, фильмы, сериалы, мангу и аудиокниги в одной личной библиотеке для Android. Работает офлайн.',
    'col.nav.features': 'Возможности', 'col.nav.sync': 'Синхронизация', 'col.nav.download': 'Скачать', 'col.nav.get': 'Скачать приложение',
    'col.eyebrow': 'Личная медиабиблиотека · Android',
    'col.h1': 'всё,<br>что вы <em>любите,</em><br>в одном месте.',
    'col.lede': 'Аниме, фильмы, сериалы, манга и аудиокниги — одна библиотека, которая работает офлайн. Смотрите, читайте, слушайте и отмечайте прогресс по своим правилам.',
    'col.cta.download': 'Скачать Vetro', 'col.cta.trailer': 'Смотреть трейлер',
    'col.facts': 'Коротко', 'col.fact1': 'форматов, одна библиотека', 'col.fact2': 'рекламы и трекеров', 'col.fact3': 'интерфейс',
    'col.stage.alt': 'Экраны приложения Vetro Collection', 'col.chip.offline': 'Офлайн ✓', 'col.tour': 'Обзор приложения',
    'col.s1.t': 'Всё<br>в одном.', 'col.s1.d': 'Аниме, фильмы, сериалы, манга и аудиокниги — одна библиотека, которая работает офлайн.',
    'col.s2.t': 'Не пропускайте<br>ни одной серии.', 'col.s2.d': 'Прогресс по сезонам — S2 E7, а не серия 47. Обратный отсчёт до следующей, трейлеры и оценки.',
    'col.s2.c1': 'Прогресс по сезонам', 'col.s2.c2': 'Отсчёт до новой серии', 'col.s2.c3': 'Трейлеры',
    'col.s3.t': 'Смотрите.<br>Читайте.<br>Слушайте.', 'col.s3.d': 'Плеер с пропуском заставок и «Воспроизвести на…», читалка для страниц и вебтунов и плеер аудиокниг.',
    'col.s3.c1': 'Пропуск заставок', 'col.s3.c2': 'Режим вебтуна', 'col.s3.c3': 'Таймер сна',
    'col.s4.t': 'Каждая история<br>на своей полке.', 'col.s4.d': 'Аудиокниги из открытых источников и ваших папок. Продолжайте с того места, где остановились.',
    'col.s4.c1': 'Свои папки', 'col.s4.c2': 'Продолжить слушать', 'col.s4.c3': 'Android Auto',
    'col.s5.t': 'Поставьте<br>оценку.', 'col.s5.d': 'Шкала от 0,0 до 10,0 с лицом, которое реагирует. Темы, источники и синхронизация — в простых настройках.',
    'col.s5.c1': 'Темы', 'col.s5.c2': 'Источники видео', 'col.s5.c3': 'Синхронизация',
    'col.trailer.eyebrow': '15 секунд', 'col.trailer.title': 'Vetro<br>в <em>движении.</em>',
    'col.trailer.lede': 'Библиотека, уведомления о сериях, плеер, читалка манги, аудиокниги и лицо-оценка — в одном коротком трейлере.',
    'col.trailer.soundon': 'Включить звук', 'col.trailer.soundoff': 'Выключить звук', 'col.trailer.replay': 'Ещё раз', 'col.trailer.aria': 'Трейлер Vetro',
    'col.f.eyebrow': 'Мелочи, которые важны', 'col.f.title': 'Сделано так,<br>как вы <em>на самом деле</em> смотрите.',
    'col.f1.t': 'Смотрите и читайте офлайн', 'col.f1.d': 'Скачивайте отдельные серии и целые сезоны и открывайте главы без сети — в поезде, в самолёте или где угодно.',
    'col.f2.t': 'Прогресс по сезонам', 'col.f2.d': 'На карточках S3 E12, а не общий счётчик по франшизе. Выходящие тайтлы остаются сверху.',
    'col.f3.t': 'Плеер с жестами', 'col.f3.d': 'Картинка в картинке, автопереход, пропуск заставок, двойной тап для перемотки и «Воспроизвести на…» для телевизора.',
    'col.f4.t': 'Вебтун или постранично', 'col.f4.d': 'Раскладка и направление запоминаются для каждого тайтла, а прогресс чтения виден на каждой карточке.',
    'col.f5.t': 'Аудиокниги как надо', 'col.f5.d': 'Таймер сна, скорость, умная перемотка назад, закладки и Android Auto.',
    'col.f6.t': 'Ваши источники, ваши правила', 'col.f6.d': 'Подключайте прямые ссылки, WebDAV или свой медиасервер. Vetro не хранит медиа — приложение работает с каталогами и источниками, которые выбираете вы.',
    'col.sync.eyebrow': 'Local-first. Ваши данные.', 'col.sync.title': 'Ваша коллекция<br>принадлежит <em>вам.</em>',
    'col.sync.lede': 'Vetro хранит библиотеку на устройстве, работает без сети и синхронизирует устройства только когда вы захотите. Аккаунт и облачная копия — по желанию.',
    'col.sync.n1': 'ТЕЛЕФОН', 'col.sync.n2': 'ПЛАНШЕТ', 'col.sync.n3': 'ВАШИ ДАННЫЕ', 'col.sync.synced': 'СИНХРОНИЗИРОВАНО', 'col.sync.private': 'ПРИВАТНО',
    'col.oss.eyebrow': 'Делаем открыто', 'col.oss.title': 'Независимый проект для <em>независимых</em> коллекций.',
    'col.oss.lede': 'Смотрите исходный код, делитесь идеями, заходите в обсуждения или просто пишите в чат сообщества.',
    'col.oss.disc': 'Обсуждения', 'col.oss.coffee': 'Угостить кофе',
    'col.dl.eyebrow': 'Android · последний релиз', 'col.dl.title': 'начните<br>собирать <em>свою.</em>',
    'col.dl.lede': 'Vetro Collection доступен для Android через несколько каналов. Нужен Android 8.0 или новее.',
    'col.dl.apk.small': 'Прямой APK · последний релиз', 'col.dl.apk.t': 'Скачать APK', 'col.dl.fd.small': 'Магазин свободного ПО', 'col.dl.gs.small': 'Веб-установщик',
    'col.dl.apk.version': 'Прямой APK · {tag}', 'col.dl.eyebrow.v': 'Android · версия {v}', 'col.dl.apk.mb': 'Скачать APK ({mb} МБ)', 'col.dl.fetching': 'Получаем APK…',
    'col.disclaimer': 'Vetro не хранит медиа. Приложение подключается к каталогам и источникам, которые выбираете вы, включая ваши собственные серверы.',
    'col.priv.title': 'Политика конфиденциальности', 'col.priv.updated': 'Обновлено: июнь 2026', 'col.priv.h1': 'Обзор',
    'col.priv.p1': 'Vetro уважает вашу приватность. Приложение построено по принципу local-first: коллекция хранится на устройстве. Аккаунт Vetro включает синхронизацию и резервное копирование. Сетевые запросы выполняются, когда вы пользуетесь онлайн-поиском, источниками медиа, синхронизацией или резервным копированием, обновлениями либо необязательным ИИ-провайдером.',
    'col.priv.h2': 'Локальные данные', 'col.priv.p2': 'Большинство данных приложения хранится локально на вашем устройстве и остаётся под вашим контролем.', 'col.priv.h3': 'Контакты',

    /* look */
    'look.title': 'VetroLook — ваши фото, мгновенно',
    'look.desc': 'VetroLook — быстрый нативный просмотрщик изображений и фотобиблиотека для Windows. Ваши папки остаются на вашем ПК, облако не требуется.',
    'look.nav.bench': 'Тесты скорости', 'look.nav.privacy': 'Приватность', 'look.nav.download': 'Скачать',
    'look.eyebrow': 'Нативный просмотрщик фото для Windows', 'look.h1': 'ваши фото.<br><em>мгновенно.</em>',
    'look.lede': 'Быстрый просмотр, спокойная фотобиблиотека и ваши настоящие папки. Без импорта. Без облака.',
    'look.cta': 'Скачать VetroLook', 'look.cta.src': 'Исходный код', 'look.hero.alt': 'VetroLook показывает фотографию с плавающими элементами управления', 'look.tick.native': 'НАТИВНЫЙ C++',
    'look.prev.eyebrow': 'Превью', 'look.prev.title': 'VetroLook<br>в <em>движении.</em>', 'look.prev.lede': 'Короткий взгляд на просмотр и перелистывание изображений без выхода из потока.',
    'look.st.eyebrow': 'Построен вокруг изображения', 'look.st.title': 'Открыл, посмотрел,<br>иди <em>дальше.</em>',
    'look.st.lede': 'VetroLook использует нативную графику Windows и библиотеки изображений, поэтому интерфейс не мешает картинке.',
    'look.q.eyebrow': 'Quick Look для Проводника', 'look.q.title': 'Выберите файл.<br>Нажмите <em>Пробел.</em>',
    'look.q.lede': 'Смотрите изображение прямо там, где вы находитесь, а при открытии сохраняйте контекст папки.',
    'look.q.flow': 'Выберите файл, нажмите Пробел, откройте VetroLook', 'look.q.n1': 'Выбрать файл',
    'look.fm.eyebrow': 'Поддерживаемые форматы', 'look.fm.title': 'Ваши файлы —<br><em>без исключений.</em>', 'look.fm.common': 'Основные', 'look.fm.pro': 'Профессиональные',
    'look.fm.prod': 'OpenEXR для HDR-работы с тон-маппингом для экрана.',
    'look.nat.eyebrow': 'Нативная производительность', 'look.nat.title': 'Создан для<br><em>первого кадра.</em>',
    'look.nat.lede': 'VetroLook держится близко к Windows, поэтому для открытия, навигации и изучения изображений не нужна браузерная среда выполнения.',
    'look.nat.noelectron': 'Без Electron', 'look.nat.index': 'Локальное индексирование', 'look.nat.cache': 'Кэш для экрана / превью RAW',
    'look.nat.measured': 'Измерено в реальности', 'look.nat.measuredd': 'Запуски и смены изображений фиксируются по кадру рабочего стола, а не оцениваются внутренним таймером.', 'look.nat.see': 'Смотреть цифры',
    'look.bm.eyebrow': 'Сравнительный тест', 'look.bm.title': 'Скорость, которую<br>можно <em>почувствовать.</em>',
    'look.bm.lede': 'Замеры от настоящего холодного запуска и с момента нажатия клавиши «следующее фото». В каждом графике — медиана: честная картина типичного опыта, а не удачного запуска.',
    'look.bm.others': 'Другие приложения', 'look.bm.less': '↓ чем меньше, тем лучше', 'look.bm.how': 'Как мы измеряем',
    'look.bm.aria': 'Медианные значения: ', 'look.bm.lessb': 'Чем меньше, тем лучше.',
    'look.bm.foot': '<b>О результатах.</b> Windows Photos и ImageGlass включены в сравнение холодного старта, но исключены из рейтингов навигации: их автоматическую навигацию не удалось надёжно воспроизвести. Результаты получены на VetroLook 1.1.0, Windows 11, Ryzen 5 5600 и RTX 3060 Ti.',
    'unit.ms': 'мс',
    'bm1.k': 'Холодный старт', 'bm1.t': 'Время до появления первого фото', 'bm1.s': 'до <b>5,2×</b> быстрее', 'bm1.d': 'Свежий запуск с уже выбранным JPEG. 20 запусков на приложение.', 'bm1.f': 'VetroLook выводит фото на экран <b>в 2,1× быстрее ImageGlass.</b>',
    'bm2.k': 'Камерный RAW', 'bm2.t': 'Открытие файла NEF', 'bm2.d': 'Время до первого видимого фото при свежем запуске. 20 запусков на приложение.', 'bm2.f': 'RAW-файлы — тоже фотографии, их первый кадр не должен быть особенным.',
    'bm3.k': 'Повседневный просмотр', 'bm3.t': 'Следующее обычное фото', 'bm3.s': 'до <b>4,9×</b> быстрее', 'bm3.d': '500 последовательных переходов между JPEG. Медианное время от нажатия клавиши до смены фото.', 'bm3.f': 'Здесь сравниваются только приложения с воспроизводимой автоматической навигацией.',
    'bm4.k': 'Прыжки по папке', 'bm4.t': 'Случайные обычные фото', 'bm4.s': 'до <b>3,3×</b> быстрее', 'bm4.d': '500 случайных переходов между JPEG в пределах папки. Те же файлы, менее предсказуемый порядок.', 'bm4.f': 'Быстро, даже когда порядок файлов не помогает кэшу.',
    'bm5.k': 'Просмотр RAW', 'bm5.t': 'Следующий камерный RAW', 'bm5.s': 'до <b>4,0×</b> быстрее', 'bm5.d': '500 последовательных переходов между NEF и DNG. Медианное время от нажатия клавиши до смены фото.', 'bm5.f': 'Для файлов, которые фотографы снимают на самом деле, а не только лёгкий демо-JPEG.',
    'bm6.k': 'Прыжки по RAW', 'bm6.t': 'Случайный камерный RAW', 'bm6.s': 'до <b>4,2×</b> быстрее', 'bm6.d': '500 случайных переходов по тому же набору NEF и DNG.', 'bm6.f': 'Результат остаётся низким, когда RAW-файлы открываются в непредсказуемом порядке.',
    'bm7.k': 'Реальная смешанная папка', 'bm7.t': 'Переключение между форматами', 'bm7.s': 'до <b>4,7×</b> быстрее', 'bm7.d': '80 переходов между JPEG, PNG, WebP, NEF и DNG — намеренно разнородная папка.', 'bm7.f': 'VetroLook выполнил все 80 из 80 переходов в этой нагрузке.',
    'look.pr.eyebrow': 'Приватность · local-first по замыслу', 'look.pr.title': 'Ваша библиотека<br>остаётся на вашем <em>ПК.</em>',
    'look.pr.lede': 'Без аккаунта. Без загрузки. Без аналитики. Файлы остаются в тех папках, которыми вы уже пользуетесь.', 'look.pr.read': 'Читать политику конфиденциальности',
    'look.f.label': 'Возможности',
    'look.f1.t': 'Просмотр без ожидания', 'look.f1.d': 'Быстро открывайте изображения, плавно масштабируйте и двигайте, а затем листайте папку, не теряя контекста.',
    'look.f2.t': 'Ваши папки остаются вашими', 'look.f2.d': 'Стройте библиотеку с поиском прямо из файлов на вашем компьютере. Ничего не нужно импортировать или загружать.',
    'look.f3.t': 'Больше, чем просмотр', 'look.f3.d': 'Листайте стопки фото, изучайте EXIF и гистограммы, работайте с RAW и современными форматами и перетаскивайте настоящие файлы.',
    'look.dl.eyebrow': 'Windows 10 и 11', 'look.dl.title': 'Готов,<br>когда <em>готовы вы.</em>', 'look.dl.lede': 'Windows 10 1809+ или Windows 11. Архитектура x64.',
    'look.dl.soon': 'MSI скоро', 'look.dl.checking': 'Проверяем последний релиз', 'look.dl.looking': 'Ищем последний MSI', 'look.dl.other': 'Другие форматы: EXE · MSIX · Portable',
    'look.dl.latest': 'Последний: {tag}', 'look.dl.get': 'Скачать MSI', 'look.dl.msi.prep': 'MSI-релиз готовится', 'look.dl.latestgh': 'Последний релиз на GitHub',
    'look.dl.auto': 'MSI начнёт скачиваться автоматически, когда появится', 'look.dl.msi': 'MSI · {size}',
    'look.m.eyebrow': 'Методика замеров', 'look.m.title': 'Измерено на <em>экране.</em>', 'look.m.lede': 'Вопрос простой: когда человек за клавиатурой реально видит новое фото?',
    'look.m1.t': 'Реальные пиксели, а не внутренние таймеры', 'look.m1.d': 'DXGI Desktop Duplication наблюдает за отрисованным рабочим столом. Фото засчитывается, только когда меняется значимая часть области изображения, поэтому индикатор загрузки или панель инструментов не могут выиграть тест.',
    'look.m2.t': 'Чистый запуск, повторённый', 'look.m2.d': 'Время холодного открытия отсчитывается до запуска приложения и заканчивается на первом видимом фото. Каждый результат холодного старта и открытия RAW — медиана из 20 запусков.',
    'look.m3.t': 'Сравнение «в равных условиях»', 'look.m3.d': 'Навигация стартует с нажатия клавиши и использует то же правило изменения пикселей. Последовательности файлов безопасны на границах, детерминированы там, где нужно, и все сравниваемые приложения используют одни и те же файлы.',
    'look.m.caption': 'Тестовая система: Windows 11 Pro · Ryzen 5 5600 · RTX 3060 Ti · 32 ГБ ОЗУ · 2560×1440 / 180 Гц. Приложения запускались явно, как при выборе через «Открыть с помощью».',
    'look.pd.eyebrow': 'Политика конфиденциальности VetroLook', 'look.pd.title': 'Ваши фото<br>остаются <em>вашими.</em>',
    'look.pd.lede': 'VetroLook создан для работы с папками, которые уже есть на вашем ПК, — без аккаунта, облачной библиотеки и рекламного профиля.',
    'look.pd1.t': 'Файлы остаются на вашем ПК', 'look.pd1.d': 'VetroLook открывает и индексирует выбранные вами папки. Ваши изображения, папки и метаданные не загружаются на сервер VetroLook.',
    'look.pd2.t': 'Без аккаунта и аналитики', 'look.pd2.d': 'Приложению не нужен аккаунт, и оно не использует сторонние аналитические или рекламные трекеры для профилирования вашей фотобиблиотеки.',
    'look.pd3.t': 'Подключения сайта', 'look.pd3.d': 'Этот сайт может запрашивать у GitHub последний релиз VetroLook. Ссылки на GitHub, Telegram и Ko-fi ведут на сервисы со своими политиками конфиденциальности.',
    'look.pd4.t': 'Вопросы', 'look.pd4.d': 'По вопросам и запросам о приватности пишите через GitHub Issues или в чат Vetro в Telegram.', 'look.pd.updated': 'Обновлено: сентябрь 2026.',

    /* app mock screens */
    'app.edit': 'Изменить', 'app.progress': 'Прогресс', 'app.series': 'Сериал', 'app.movie': 'Фильм', 'app.manga': 'Манга', 'app.anime': 'Аниме', 'app.audio': 'Аудиокнига',
    'app.g.mystery': 'Мистика', 'app.g.thriller': 'Триллер', 'app.g.scifi': 'Фантастика', 'app.g.adventure': 'Приключения', 'app.g.action': 'Экшен', 'app.g.historical': 'Историческое', 'app.g.fantasy': 'Фэнтези', 'app.g.drama': 'Драма',
    'app.ep': 'эп.', 'app.eps': 'эп.', 'app.ch': 'гл.',
    'app.watch': 'Смотреть', 'app.download': 'Скачать', 'app.trailer': 'Трейлер', 'app.nextin': 'Следующая серия через:', 'app.seasons': 'Сезоны', 'app.info': 'Информация',
    'app.rating': 'Рейтинг', 'app.status': 'Статус', 'app.airing': 'Выходит', 'app.episodes': 'Эпизоды', 'app.format': 'Формат', 'app.tv': 'ТВ',
    'app.speed': 'Скорость', 'app.of': '3 из 24', 'app.narration': 'Озвучка', 'app.chapter42': 'Paper Ronin · Глава 42', 'app.prev': 'Назад', 'app.next': 'Далее',
    'app.books': 'Книги', 'app.continue': 'Продолжить', 'app.chapter3': 'Глава 3', 'app.updated': 'Обновлено сегодня', 'app.n24': '24 книги', 'app.n18': '18 книг',
    'app.recommended': 'Рекомендуем', 'app.picked': 'Подобрано для вас', 'app.top': 'Лучшее на полке',
    'app.r.normal': 'Нормально', 'app.r.master': 'Шедевр', 'app.r.awful': 'УЖАС', 'app.r.bad': 'ПЛОХО', 'app.r.meh': 'ТАК СЕБЕ', 'app.r.normal2': 'НОРМАЛЬНО', 'app.r.good': 'ХОРОШО', 'app.r.great': 'ОТЛИЧНО', 'app.r.master2': 'ШЕДЕВР',
    'app.settings': 'Настройки', 'app.s.video': 'Источники видео', 'app.s.videod': 'WebDAV, Jellyfin и Emby', 'app.s.lang': 'Язык', 'app.s.langv': 'Русский', 'app.s.themes': 'Темы', 'app.s.themesv': 'Тёмная',
    'app.s.account': 'Настройки аккаунта', 'app.s.accountd': 'Синхронизация, вход и пароль', 'app.s.sync': 'Синхронизация', 'app.s.syncd': 'Аккаунты, списки и проверка серий',
    'app.s.enrich': 'Обогащение коллекции', 'app.s.enrichd': 'Подгрузка недостающих данных и названий', 'app.s.ai': 'AI Connect', 'app.s.aid': 'Свой ключ ИИ (BYOK)',
    'app.s.skip': 'Автопропуск', 'app.s.skipd': 'Тихо пропускать опенинги, эндинги и рекапы', 'app.s.autonext': 'Автопереход', 'app.s.autonextd': 'Запускать следующую серию, когда закончится текущая',
    'app.u.d': 'д', 'app.u.h': 'ч', 'app.u.m': 'мин', 'app.u.s': 'сек'
  };

  const EN = {};            // captured from the DOM the first time an element is seen
  const KEY = 'vetro-lang';
  let lang = 'en';

  const t = (key, fallback) => {
    if (lang === 'ru' && RU[key] != null) return RU[key];
    return EN[key] != null ? EN[key] : (fallback != null ? fallback : key);
  };

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(el => {
      const isHtml = el.hasAttribute('data-i18n-html');
      const key = el.getAttribute(isHtml ? 'data-i18n-html' : 'data-i18n');
      if (el._en === undefined) { el._en = isHtml ? el.innerHTML : el.textContent; if (EN[key] == null) EN[key] = el._en; }
      const val = lang === 'ru' && RU[key] != null ? RU[key] : el._en;
      if (isHtml) { if (el.innerHTML !== val) el.innerHTML = val; } else if (el.textContent !== val) el.textContent = val;
    });
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el._enAttr = el._enAttr || {};
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const i = pair.indexOf(':');
        if (i < 0) return;
        const attr = pair.slice(0, i).trim(), key = pair.slice(i + 1).trim();
        if (el._enAttr[attr] === undefined) { el._enAttr[attr] = el.getAttribute(attr) || ''; if (EN[key] == null) EN[key] = el._enAttr[attr]; }
        el.setAttribute(attr, lang === 'ru' && RU[key] != null ? RU[key] : el._enAttr[attr]);
      });
    });
  }

  function setLang(next, persist) {
    lang = next === 'ru' ? 'ru' : 'en';
    document.documentElement.lang = lang;
    if (persist !== false) { try { localStorage.setItem(KEY, lang); } catch (e) { /* storage unavailable */ } }
    apply(document);
    document.querySelectorAll('[data-lang]').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ru' || q === 'en') return q;
    try { const s = localStorage.getItem(KEY); if (s === 'ru' || s === 'en') return s; } catch (e) { /* ignore */ }
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
    return /^ru\b/i.test(langs[0] || '') ? 'ru' : 'en';
  }

  function boot() {
    document.querySelectorAll('.bars small').forEach(s => s.setAttribute('data-i18n', 'unit.ms'));
    apply(document);                                   // capture English from the markup
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
    setLang(detect(), false);
  }

  window.VetroI18n = { t, apply, setLang, get lang() { return lang; }, RU };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
