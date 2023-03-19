import { formatDistance, subDays } from "date-fns";
import { initializeUI } from './app/UI'

import "./style.css";

export const listTask = () => {
  const tasksContainer = document.getElementById("todayTasksContainer");
};

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
    
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  initializeUI();
})