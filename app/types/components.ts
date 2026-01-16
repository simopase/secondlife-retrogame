
export type SwiperProps = {
  slides: Slide[];
}


export type Slide = {
  title: {
    text: string;
    primaryWord?: string;
    secondaryWord?: string;
  };
  image: string;
  btnText: string;
  order: number
}