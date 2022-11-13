import { AppRegistry, Platform } from "react-native";
import App from "./App";
import { app as appName } from "./app.json";

AppRegistry.registerComponent("main", () => App);

if (Platform.OS === "android") {
  const rootTag =
    document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("main", { rootTag });
}
// AppRegistry.registerComponent("main", () => App);

// if (Platform.OS === "web") {
// const rootTag =
//   document.getElementById("root") || document.getElementById("main");
// AppRegistry.runApplication("main", { rootTag });
// }
