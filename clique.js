class App {
  constructor(name, imageUrl, containerHeight, htmlContent) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.containerHeight = containerHeight;
    this.htmlContent = htmlContent;
  }
}

class AppManager {
  constructor() {
    this.apps = [];
    this.expanded = false;
  }

  addApp(app, container) {
    createApp(
      app.imageUrl,
      () => {
        if (!this.expanded) {
          document.getElementById("maincontainer").style.height =
            app.containerHeight + "px";
          if (document.getElementById("contentContainer")) {
            document.getElementById("contentContainer").remove();
          }
          createAndAppend(
            "div",
            null,
            document.getElementById("maincontainer"),
            "contentContainer"
          );
          document.getElementById("contentContainer").style.width = "500px";
          document.getElementById("contentContainer").style.height =
            app.containerHeight - 60 + "px";
          document.getElementById("contentContainer").style.position =
            "absolute";
          document.getElementById("contentContainer").style.bottom = "0";
          console.log(app.htmlContent);

          var htmlString = app.htmlContent;
          var htmlDom = new DOMParser().parseFromString(htmlString, "text/html")
            .firstChild.children[1].firstChild;
          console.log(htmlDom);

          document.getElementById("contentContainer").appendChild(htmlDom);

          this.expanded = true;
        } else {
          document.getElementById("maincontainer").style.height = "60px";
          document.getElementById("contentContainer").remove();
          this.expanded = false;
        }
      },
      container
    );
  }
}

class CliqurParser {
  constructor(container) {
    this.appManager = new AppManager();
    this.container = container;
  }

  parse(code) {
    const lines = code.split("\n");
    lines.forEach((line) => this.parseLine(line.trim()));
  }

  parseLine(line) {
    const createAppRegex =
      /^CREATE NEW APP ([A-Za-z0-9]+) IMAGE '(.+)' HEIGHT OF CONTAINER '(.+)' HTML INSIDE IS '(.+)'$/;
    const match = line.match(createAppRegex);
    console.log(match);

    if (match) {
      const [, name, imageUrl, containerHeight, htmlContent] = match;
      const app = new App(name, imageUrl, containerHeight, htmlContent);
      this.appManager.addApp(app, this.container);
    }
  }
}

const select = (selector) => document.querySelector(selector);
const createAndAppend = (tagName, classes, parent, id, placeholder) => {
  const element = document.createElement(tagName);
  if (classes) {
    classes = classes.split(" ");
    classes.forEach((className) => element.classList.add(className));
  }
  if (id) element.id = id;
  if (placeholder) element.placeholder = placeholder;
  if (parent) parent.appendChild(element);
  return element;
};

const addImage = (url, className, parent) => {
  const img = createAndAppend("img", className, parent);
  img.src = url;
  img.style.background = "none";
  return img;
};

function createApp(imageUrl, onClick, append) {
  const appButton = createAndAppend("button", null, append);
  appButton.style.width = "38px";
  appButton.style.height = "22px";
  appButton.style.padding = "0";
  appButton.style.border = "none";
  appButton.addEventListener("click", onClick);
  const appImage = createAndAppend("img", null, appButton);
  appImage.src = imageUrl;
  appImage.style.height = "22px";
  return appButton;
}

function appStoreInstall(name, img) {
  const cliqur = new CliqurParser(
    document.getElementById("installedappcontainer")
  );
  console.log(name);

  let appinstall = `CREATE NEW APP ${name} IMAGE '${img}' HEIGHT OF CONTAINER '100' HTML INSIDE IS '<div>Test</div>'`;
  cliqur.parse(appinstall);
}

function createLogin() {
  const styles = createAndAppend("style");
  styles.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
  
  
    .cliquecontainer {
        width: 317px;
        height: 537px;
        flex-shrink: 0;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.75);
        background: #f0f0f0;
        position: fixed;
        z-index: 1000;
        top: 50%;
        left: 50%;
        transition: 1s ease;
        overflow: hidden;
    }

    .cliquecontainer.tt5050 {
        transform: translate(-50%, -50%);
    }

    .cliquecontainer.tt50 {
        transform: translate(-50%);
    }
    
    .cliquecontainer.expand {
        height: 100vh;
    }
    
    .top-img {
        width: 317px;
        height: 273px;
        flex-shrink: 0;
        border-radius: 14px 14px 0px 0px;
        filter: drop-shadow(0px 4px 78px rgba(0, 0, 0, 0.4));
        display: block;
        position: absolute;
        transition: 1s ease;
    }
    
    .top-img.expand {
        
        height: 710px;
    }
    
    .top-img.delete {
        
        height: 0px;
    }
    
    
    .cliquecontainer.expand .top-img {
        height: 100%;
    }
    
    .cliquecontainer.resize {
        width: 500px;
        height: 60px;
        top: 42.5px;
    }
    
    .logo {
        width: 106px;
        height: 106px;
        flex-shrink: 0;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translate(-50%);
    }
    
    .move {
        transition: 1s ease;
        height: 30px;
        position: absolute;
        top: 15px;
        left: 15px;
        z-index: 2;
    }
    
    .login {
        width: 100%;
        height: 264px;
        margin-top: 273px;
    }
    
    .loginf {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }
    
    .input {
        font-family: 'Inter', sans-serif;
        letter-spacing: -0.6px;
        width: 217px;
        height: 30px;
        margin: 0;
        padding: 0;
        outline: 0;
        border-width: 0 0 2px;
        border-color: #BDBDBD;
        color: rgba(0, 0, 0, 0.50);
        background: none;
        transition: 0.2s ease;
    }
    
    ::placeholder {
        font-family: 'Inter', sans-serif;
        color: #BDBDBD;
        font-size: 12px;
    }
    
    .input:focus {
        border-color: #428bdf;
    }
    
    .sn {
        width: 217px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    
    .sn p {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 20px;
    }
    
    .sn button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background-color: #6A8BB2;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .sn button img {
        transition: .1s ease-in-out;
    }
    
    .sn button:hover img {
        margin-left: 7px;
        cursor: pointer;
    }
    
    .status {
        opacity: 0;
        transition: 1s ease;
    }
    
    .status img {
        position: absolute;
        z-index: 1;
        width: 50px;
        margin: 0;
        padding: 0;
        left: 50%;
        transform: translate(-50%);
        top: 160px;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
      
    /* Track */
    ::-webkit-scrollbar-track {
        opacity: 1;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        transition: 0.5s ease;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    .appstoreelements {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    .appCard {
        margin: 10px;
        width: 200px;
        height: 125px;
        background-color: #000;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    .gamesBG {
        width: 100%;
        height: 100%;
    }

    .gradient {
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }

    .gameTXT {
        position: absolute;
        bottom: 0;
        color: white;
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0;

    }

    .gameTXT p, button {
        margin: 10px;
    }

    .gameTXT button {
        font-weight: 300;
        color: white;
        text-decoration: none;
        background-color: transparent;
        border: none;
    }
    `;

  document.body.appendChild(styles);

  const cliquecontainer = createAndAppend(
    "div",
    "cliquecontainer tt5050",
    document.body,
    "maincontainer"
  );
  const status = createAndAppend("div", "status", cliquecontainer);
  const loading = addImage(
    "https://raw.githubusercontent.com/BSOD232/clique/main/loading.svg",
    null,
    status
  );
  const top = addImage(
    "https://github.com/BSOD232/clique/blob/main/top.png?raw=true",
    "top-img",
    cliquecontainer
  );
  const logo = addImage(
    "https://raw.githubusercontent.com/BSOD232/clique/main/clique.png",
    "logo",
    cliquecontainer
  );
  const login = createAndAppend("div", "login", cliquecontainer);
  const loginf = createAndAppend("form", "loginf", login);
  const username = createAndAppend(
    "input",
    "input",
    loginf,
    "username",
    "Username"
  );
  const password = createAndAppend(
    "input",
    "input",
    loginf,
    "password",
    "Password"
  );
  const sn = createAndAppend("div", "sn", loginf);
  const stext = createAndAppend("p", null, sn);
  stext.innerText = "Sign In";
  const submitB = createAndAppend("button", null, sn);
  const submitBI = addImage(
    "https://raw.githubusercontent.com/BSOD232/clique/2d7136fed5f53d1d12e5e737e53ebdeff07bbf66/arrow.svg",
    null,
    submitB
  );

  loginf.addEventListener("submit", function (event) {
    event.preventDefault();
    loadGUI();
  });
}

createLogin();

function loadGUI() {
  var login = select(".login");
  var status = select(".status");
  var topImg = select(".top-img");
  var username = select("#username");
  var password = select("#password");
  var sn = document.querySelector(".sn");
  var cliquecontainer = document.querySelector(".cliquecontainer");
  var logo = document.querySelector(".logo");
  var lBG = document.createElement("img");
  var appcontainer = document.createElement("div");
  var installedappcontainer = document.createElement("div");

  if (username.value && password.value) {
    topImg.classList.toggle("expand");
    setTimeout(function () {
      username.remove();
      password.remove();
      sn.remove();
      login.remove();
    }, 1000);

    status.style.opacity = "1";
    setTimeout(function () {
      topImg.classList.toggle("expand");
      topImg.classList.toggle("delete");
      status.remove();
    }, 5000);
    setTimeout(function () {
      cliquecontainer.classList.toggle("resize");
      logo.classList.toggle("move");
      logo.classList.toggle("logo");

      cliquecontainer.classList.remove("tt5050");
      cliquecontainer.classList.add("tt50");
      lBG.src = "https://github.com/BSOD232/clique/blob/main/side.png?raw=true";
      lBG.style.height = "60px";
      lBG.style.width = "74px";
      lBG.style.position = "absolute";
      lBG.style.top = "0";
      lBG.style.left = "-70px";
      lBG.style.transition = "1s ease";
      cliquecontainer.appendChild(lBG);

      appcontainer.style.width = "140px";
      appcontainer.style.height = "60px";
      appcontainer.style.display = "flex";
      appcontainer.style.position = "absolute";
      appcontainer.style.top = "0";
      appcontainer.style.right = "-220px";
      appcontainer.style.marginTop = "0";
      appcontainer.style.justifyContent = "space-evenly";
      appcontainer.style.alignItems = "center";
      appcontainer.style.transition = "1s ease";
      appcontainer.id = "appcontainer";

      installedappcontainer.style.width = "auto";
      installedappcontainer.style.height = "60px";
      installedappcontainer.style.display = "flex";
      installedappcontainer.style.position = "absolute";
      installedappcontainer.style.top = "-60";
      installedappcontainer.style.left = "50%";
      installedappcontainer.style.transform = "translate(-50%)";
      installedappcontainer.style.marginTop = "0";
      installedappcontainer.style.justifyContent = "space-evenly";
      installedappcontainer.style.alignItems = "center";
      installedappcontainer.style.transition = "1s ease";
      installedappcontainer.id = "installedappcontainer";

      cliquecontainer.appendChild(appcontainer);
      cliquecontainer.appendChild(installedappcontainer);
      const cliqur = new CliqurParser(appcontainer);

      let code1 = `CREATE NEW APP AppStore IMAGE 'https://raw.githubusercontent.com/BSOD232/clique/4af9f0b01ba6414fccc89356dab1872e07bdb420/appstore.svg' HEIGHT OF CONTAINER '537' HTML INSIDE IS '<div class="appstoreelements"><div class="appCard"><img src="https://raw.githubusercontent.com/BSOD232/clique/main/gamelist.png" class="gamesBG"></img><div class="gradient"></div><div class="gameTXT"><p>Games</p><button onclick="appStoreInstall('Games', 'https://raw.githubusercontent.com/BSOD232/clique/2d7136fed5f53d1d12e5e737e53ebdeff07bbf66/game.svg');">Install</button></div></div></div>'`;
      cliqur.parse(code1);

      createAndAppend("img", null, appcontainer).src =
        "https://raw.githubusercontent.com/BSOD232/clique/2d7136fed5f53d1d12e5e737e53ebdeff07bbf66/breakline.svg";

      let code2 = `CREATE NEW APP Settings IMAGE 'https://raw.githubusercontent.com/BSOD232/clique/4af9f0b01ba6414fccc89356dab1872e07bdb420/settings.svg' HEIGHT OF CONTAINER '100' HTML INSIDE IS '<div>Test</div>'`;
      cliqur.parse(code2);
    }, 6200);
    setTimeout(function () {
      lBG.style.left = "0px";
      appcontainer.style.right = "0px";
      installedappcontainer.style.top = "0";
    }, 6700);
  }
}

// Get form values
// var username = document.querySelector('#username').value;
// var password = document.querySel-ctor('#password').value;

// // Create JSON object
// var data = {
//   "username": username,
//   "password": password
// };

// // Send POST request to the backend
// fetch("https://clique-backend.t3manager.repl.co/login", {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
//   .then(function(response) {
//     if (response.ok) {
//       alert("Successful login");
//     } else {
//       alert("Incorrect username or password.");
//     }
//   })
//   .catch(function(error) {
//     console.error("Error:", error);
//   });
