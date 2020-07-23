export function getChosenVersion(
  parentChosenVersion: string,
  childVersion: string,
  highestChildVersion: string
): string {
  return (
    parentChosenVersion ||
    childVersion ||
    highestChildVersion
  ).toString();
}
