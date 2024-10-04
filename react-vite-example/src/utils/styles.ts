export function joinClassNames(...styles: unknown[]) {
  return styles.filter((style) => !!style).join(" ");
}
