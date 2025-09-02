
export function getNormalizedName(name: string) {
    return name.split(" ").map(str => str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()).join(" ");
}