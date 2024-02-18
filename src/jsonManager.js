export const jsonManager = async () => {
  return (await  (await fetch("./table-config.json")).json());
}