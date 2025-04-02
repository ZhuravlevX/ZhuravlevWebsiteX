
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        about: "About Me",
        projects: "Projects",
        art: "Gallery",
        social: "Contacts",
      },
      about: {
        title: "About Me",
        description: "Programmer & Indie Developer",
        bio: "My nickname - ZhuravlevX, I am a representative of the subculture of furry. As a representative of the subculture I have a furson whose name is Danny Lisitsky.\n\nI live in Russia in the city of Moscow. Among hobbies there is programming and photographing something. Programming languages that I know and study at the moment are C# and Python. In the future I want to learn to play a musical instrument, such as guitar, as well as to buy a camera for beautiful photos. In general I am not against socializing and new acquaintances.",
        fursonaRef: "My fursona reference",
        birthday: {
          today: "It's already a birthday today! Yay!",
          daysLeft: "Days until birthday: {{days}}",
          day: "day",
          days: "days"
        }
      },
      projects: {
        title: "My Projects",
        githubProfile: "GitHub Profile",
        commits: "Commits",
        link: "Link",
        commitsModalTitle: "Recent Commits - {{repo}}",
        comingSoon: "Coming soon...",
        noContentYet: "No content here yet... ;P",
        githubRepos: "GitHub Repositories",
        games: "Games",
        loadingError: "Oops, something went wrong, but I'm fixing it..."
      },
      art: {
        title: "Gallery",
        categories: {
          artwork: "Arts",
          photos: "Photos"
        },
        warning: {
          title: "Traffic warning",
          message: "The following tab downloads images in high quality. This may result in high consumption of Internet traffic. It is recommended to enable the browser cache in the settings, for fast loading of images.",
          loadButton: "Confirm"
        },
        newBadge: {
          label: "New"
        }
      },
      social: {
        title: "Contacts",
        telegram: "Telegram",
        discord: "Discord",
        steam: "Steam",
        vk: "VK",
      },
      notFound: {
        message: "Page not found",
        returnHome: "Return to home page"
      },
      footer: {
        text: "This site is made with the help of AI together with ZhuravlevX. All questions can personally ask me. Everything on this site, including the domain is the property of ZhuravlevX."
      }
    },
  },
  ru: {
    translation: {
      nav: {
        about: "Обо мне",
        projects: "Проекты",
        art: "Галерея",
        social: "Контакты",
      },
      about: {
        title: "Обо мне",
        description: "Программист & Инди-Разработчик",
        bio: "Мой псевдоним − ZhuravlevX, являюсь представителем субкультуры фурри. Как представитель субкультуры у меня имеется фурсона которого звать Дэнни Лисицкий.\n\nПроживаю в России в городе Москва. Среди хобби имеется программирование и фотографирование чего-либо. Языки программирования которые я знаю и изучаю на текущий момент, это C# и Python. В будущем хочу научиться играть на музыкальном инструменте, например гитара, а также приобрести фотоаппарат для красивых фотографий. В целом я не против общения и новых знакомств.",
        fursonaRef: "Референс моей фурсоны",
        birthday: {
          today: "Уже сегодня день рождение! Ура!",
          daysLeft: "До дня рождения осталось: {{days}}",
          day: "день",
          days: "дней"
        }
      },
      projects: {
        title: "Мои проекты",
        githubProfile: "Профиль GitHub",
        commits: "Коммиты",
        link: "Ссылка",
        commitsModalTitle: "Последние коммиты - {{repo}}",
        comingSoon: "Совсем скоро...",
        noContentYet: "Пока тута ничего нет... ;P",
        githubRepos: "GitHub репозитории",
        games: "Игры",
        loadingError: "Йо-ой, походу всё сломалось, но я уже чиню..."
      },
      art: {
        title: "Галерея",
        categories: {
          artwork: "Арты",
          photos: "Фотографии"
        },
        warning: {
          title: "Предупреждение о расходе трафика",
          message: "Следующая вкладка загружает изображения в высоком качестве. Это может привести к большому расходу интернет-трафика. Рекомендуется включить в настройках кэш-браузера, для быстрой загрузки изображений.",
          loadButton: "Подтвердить"
        },
        newBadge: {
          label: "Новое"
        }
      },
      social: {
        title: "Контакты",
        telegram: "Telegram",
        discord: "Discord",
        steam: "Steam",
        vk: "ВКонтакте",
      },
      notFound: {
        message: "Страница не найдена",
        returnHome: "Вернуться на главную"
      },
      footer: {
        text: "Данный сайт сделан при помощи ИИ совместно с ZhuravlevX. Все вопросы можете лично задать мне. Все что находится на данном сайте, в том числе и домен – собственность ZhuravlevX."
      }
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
