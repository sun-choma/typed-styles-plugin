export type Styles = {
  'variant--contained': string;
  'variant--outlined': string;
  'variant--texted': string;
  'variant--unstyled': string;
  'is-loading': string;
  'size--sm': string;
  icon: string;
  'size--md': string;
  'size--lg': string;
}
 
export type StyleProps = {
  /**
   * Used to change buttons appearance
   * * `contained`: Used for most important (primary) actions
   * * `outlined`: Used for secondary actions
   * * `texted`: Used for uncommon (tertiary) actions
   * * `unstyled`: Button without any visual styles. Used as a part of complex components
   */
  variant?: 'contained' | 'outlined' | 'texted' | 'unstyled';
  /**
   * State signalizing that button is being disabled due to some action is being processed
   */
  isLoading?: boolean;
  /**
   * Sizes of a button
   * * `sm`: Small button - somewhat difficult to notice
   * * `md`: Medium button - goto option in most scenarios
   * * `lg`: Large button - if additional pop is needed
   */
  size?: 'sm' | 'md' | 'lg';
}
 
declare const styles: Styles;
export default styles;