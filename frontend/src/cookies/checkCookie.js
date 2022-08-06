import { getCookie } from "./getCookie";
import { setCookie } from "./setCookie";

function checkCookie(cname) {
    let user = getCookie(cname);
    if (user != "") {
      console.log("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
  export {checkCookie}