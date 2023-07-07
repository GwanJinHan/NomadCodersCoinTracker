import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    id: string;
    textColor: string;
    bgColor: string;
    accentColor: string;
    plainColor: string;
    setTheme?: () => void;
  }
}
