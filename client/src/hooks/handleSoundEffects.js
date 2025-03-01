import brightnotification from "../data/sounds/bright-notifications-151766.mp3";
import clickButton from "../data/sounds/click-button-menu-147349.mp3";
import dynamo from "../data/sounds/dynamo-163602.mp3";
import errorcall from "../data/sounds/error-call-to-attention-129258.mp3";
import interface12 from "../data/sounds/interface-124464.mp3";
import levelpassed from "../data/sounds/level-passed-143039.mp3";
import notification2 from "../data/sounds/notification-2-125763.mp3";
import notification4 from "../data/sounds/notification-4-126507.mp3";
import wronganswer from "../data/sounds/wrong-answer-126515.mp3";
import diceroll from "../data/sounds/dice-roll.mp3";
import halloweenimpact from "../data/sounds/halloween-impact.mp3";
import spookywiththunder from "../data/sounds/spooky-with-thunder.mp3";
import success1 from "../data/sounds/success-1.mp3";
import success2 from "../data/sounds/success-2.mp3";

export function playSound(soundSrc) {
  const myAudio = new Audio(soundSrc);
  myAudio.play();
}

export function playsuccess2() {
  const myAudio = new Audio(success2);
  playMyAudio(myAudio);
}

export function playsuccess1() {
  const myAudio = new Audio(success1);
  playMyAudio(myAudio);
}

export function playspookywiththunder() {
  const myAudio = new Audio(spookywiththunder);
  playMyAudio(myAudio);
}

export function playhalloweenimpact() {
  const myAudio = new Audio(halloweenimpact);
  playMyAudio(myAudio);
}

export function playdiceroll() {
  const myAudio = new Audio(diceroll);
  playMyAudio(myAudio);
}

export function playbrightnotification() {
  const myAudio = new Audio(brightnotification);
  playMyAudio(myAudio);
}

export function playclickButton() {
  const myAudio = new Audio(clickButton);
  playMyAudio(myAudio);
}

export function playnotification2() {
  const myAudio = new Audio(notification2);
  playMyAudio(myAudio);
}

export function playdynamo() {
  const myAudio = new Audio(dynamo);
  playMyAudio(myAudio);
}

export function playinterface12() {
  const myAudio = new Audio(interface12);
  playMyAudio(myAudio);
}

export function playwronganswer() {
  const myAudio = new Audio(wronganswer);
  playMyAudio(myAudio);
}

export function playerrorcall() {
  const myAudio = new Audio(errorcall);
  playMyAudio(myAudio);
}

export function playlevelpassed() {
  const myAudio = new Audio(levelpassed);
  playMyAudio(myAudio);
}

export function playnotification4() {
  const myAudio = new Audio(notification4);
  playMyAudio(myAudio);
}

function playMyAudio(a) {
  a.volume = 0.1;
  a.play();
}
