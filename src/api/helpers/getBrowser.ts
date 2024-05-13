import { launch } from "puppeteer";
const getBrowser = () => {
    console.log("Opening the browser......");
    return launch();
}

export default getBrowser;
