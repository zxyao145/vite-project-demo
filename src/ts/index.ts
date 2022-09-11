import "../scss/index.scss";
import "../image/typescript.svg";
import { setupCounter } from "./component";
import $ from "jquery";
import { testOutput } from "./common-test";

testOutput("index.ts");

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);


$("#counter").on("click", function () {
  console.log("Hello World");
});
