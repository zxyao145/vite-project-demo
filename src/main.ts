import "./style.scss";
import "/images/typescript.svg";
import { setupCounter } from "./c";

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
