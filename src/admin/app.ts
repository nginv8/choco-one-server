import { Strapi } from "@strapi/types";
import logo from "./extensions/logo.png";

export default {
  head: {
    title: "Choco ONE Dashboard",
  },
  config: {
    auth: {
      logo,
    },
    menu: {
      logo,
    },
    translations: {
      en: {
        "app.components.HomePage.community": "Choco ONE Admin",
        "app.components.LeftMenu.navbrand.title": "Choco ONE Dashboard",
        "app.components.LeftMenu.navbrand.workplace": "Workplace",
        "Auth.form.welcome.title": "Welcome to Choco ONE!",
        "Auth.form.welcome.subtitle": "Log in to your Choco ONE account",
      },
    },
  },
  bootstrap(app: Strapi) {
    document.title = "Choco ONE Dashboard";
  },
};
