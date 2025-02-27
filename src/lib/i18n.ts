
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
        bio: "My nickname is ZhuravlevX, and I'm a member of the furry fandom. As a member of the fandom, I have a fursona named Danny Lisitsky.\n\nI live in Russia, in the capital city of Moscow. I'm building and planning my future career, which I will be gradually ascending to over the years. I'm studying programming, including Python, C#, and other programming languages... I have many favorite games, which you can find in my Steam profile. My birthday is April 13th. I'm open to meeting new people and communication.",
        minecraftSkin: "Current Minecraft Skin",
        fursonaRef: "My fursona reference",
        birthday: {
          today: "Happy birthday! 🎉",
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
          artwork: "Artwork",
          photos: "Photos"
        }
      },
      social: {
        title: "Contacts",
        telegram: "Telegram",
        discord: "Discord",
        steam: "Steam",
        vk: "VK",
      },
      footer: {
        text: "This site was created with AI in collaboration with ZhuravlevX. You can ask me any questions personally. Everything on this site, including the domain, is the property of ZhuravlevX."
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
        bio: "Мой псевдоним − ZhuravlevX, являюсь представителем субкультуры фурри. Как представитель субкультуры у меня имеется фурсона которого звать Дэнни Лисицкий.\n\nПроживаю в России в столице Москва. Строю и планирую свою будущую карьеру к которой я буду подниматься постепенно спустя долгие годы. Изучаю программирование, среди них языки Python, CSharp и другие языки программирования... Много любимых игр, которые можно узнать у меня в профиле Steam. День рождение у меня 13 апреля. Не против новых знакомств и общений.",
        minecraftSkin: "Текущий скин в Minecraft",
        fursonaRef: "Референс моей фурсоны",
        birthday: {
          today: "С днём рождения! 🎉",
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
        }
      },
      social: {
        title: "Контакты",
        telegram: "Telegram",
        discord: "Discord",
        steam: "Steam",
        vk: "ВКонтакте",
      },
      footer: {
        text: "Данный сайт сделан при помощи ИИ совместно с ZhuravlevX. Все вопросы можете лично задать мне. Все что находиться на данном сайте, в том числе и домен – собственность ZhuravlevX."
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
