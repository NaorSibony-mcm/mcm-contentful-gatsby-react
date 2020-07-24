export function getChosenVersion(
  parentForcedVersion: string,
  highestImplementedVersion: number,
  componentName: string
): number {
  let chosenVersion: number = highestImplementedVersion;
  if (parentForcedVersion) {
    if (parseInt(parentForcedVersion) > highestImplementedVersion) {
      console.warn(
        `In ${componentName}, parent tried to force a version(${parentForcedVersion}) higher than the highest implemented (${highestImplementedVersion}). Using version ${highestImplementedVersion}`
      );
    } else {
      chosenVersion = parseInt(parentForcedVersion);
    }
  }
  return chosenVersion;
}
