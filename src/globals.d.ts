declare module "@emotion/styled" {
  import {CreateStyled} from "@emotion/styled";

  interface Theme {
    cubicEase: string;
    body: string;
    background: string;
    borderColor: string;
    boxShadow: string;
    thumbnailShadow: string;
    success: string;
    error: string;
    palette: any
  }

  export * from "@emotion/styled/types/index";
  const customStyled: CreateStyled<Theme>;
  export default customStyled;
}
