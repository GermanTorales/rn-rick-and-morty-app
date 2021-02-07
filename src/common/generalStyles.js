const getProperty = {
  get: (target, prop, arr) => {
    if (typeof prop === "string") {
      let element = target.find((t) => t?.toLowerCase() === prop.toLowerCase());

      if (element) {
        switch (element) {
          case "alive":
            element = "#22B22F";
            break;

          case "dead":
            element = "#CD2121";
            break;

          case "unknown":
            element = "#CDCA21";
        }
      }

      return element || target[prop];
    }

    return Reflect.get(target, prop, arr);
  },
};

export const LinearColors = ["#22A5B2", "#3b5998", "#192f6a"];

export const StatusColors = new Proxy(["alive", "dead", "unknown"], getProperty);
