import UI from "../config/ui.config";

class Tabs {
  constructor(loginContent, signUpContent, loginTab, signUpTab) {
    this.loginContent = loginContent;
    this.signUpContent = signUpContent;
    this.loginTab = loginTab;
    this.signUpTab = signUpTab;
  }

  onLoginTabHandler() {
    this.signUpTab.classList.remove("active");
    this.signUpContent.classList.remove("show", "active");
    this.loginTab.classList.add("active");
    this.loginContent.classList.add("show", "active");
  }

  onSignUpHandler() {
    this.loginTab.classList.remove("active");
    this.loginContent.classList.remove("show", "active");
    this.signUpTab.classList.add("active");
    this.signUpContent.classList.add("show", "active");
  }
}

const tabs = new Tabs(UI.loginContent, UI.signUpContent, UI.loginTab, UI.signUpTab);
export default tabs;
