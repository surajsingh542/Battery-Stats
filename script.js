const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);
const batteryStatus = document.querySelector(".batteryStatus");

// Battery API

const battery = () => {
  // console.log("Battery");
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      // console.log(battery);
      function updateAllBatteryDetails() {
        updateChargingInfo();
        updateLevelChange();
        updateDischargingTimeInfo();
        updateChargingTimeChangeInfo();
        updateBatteryStatus();
      }
      updateAllBatteryDetails();

      // Battery Charging change
      battery.addEventListener("chargingchange", () => {
        updateChargingInfo();
      });
      function updateChargingInfo() {
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }

      // Battery Charging Time
      battery.addEventListener("chargingtimechange", () => {
        updateChargingTimeChangeInfo();
      });
      function updateChargingTimeChangeInfo() {
        // if (battery.charging) {
        //   console.log(battery.chargingTime);
        // } else {
        //   console.log("Not Charging");
        // }
        // console.log(battery.chargingTime);
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }

      // Battery Discharging Time
      battery.addEventListener("dischargingtimechange", () => {
        updateDischargingTimeInfo();
      });
      function updateDischargingTimeInfo() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }

      // Battery Level Change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });
      function updateLevelChange() {
        const level = battery.level * 100;
        const perLevel = Math.round(level) + "%";
        batteryLevel.innerHTML = perLevel;
      }
      // Battery Status
      battery.addEventListener("levelchange", () => {
        updateBatteryStatus();
      });
      function updateBatteryStatus() {
        if (battery.level < 0.3) {
          batteryStatus.innerHTML = "Low Charge";
        } else if (battery.level > 0.3 && battery.level < 0.8) {
          batteryStatus.innerHTML = "Average Charge";
        } else {
          batteryStatus.innerHTML = "High Charge";
        }
      }
    });
  }
};

battery();
