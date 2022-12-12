import { fabric } from 'fabric'

type textProps = {
  parentTop: number;
  parentLeft: number;
  fontSize: number;
  textColor?: string
}

export default function TextInstance(text: string, props: textProps) {
  const { parentTop, parentLeft, fontSize = 12, textColor } = props;
  const instance = new fabric.Text(text, {
    top: parentTop,
    left: parentLeft,
    fontSize,
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    fill: textColor || '#000',
    selectable: false,
  });
  return instance;
}

export function updateText(instance: fabric.Text, props: textProps, text: string) {
  const { parentTop, parentLeft, fontSize = 12, textColor } = props;
  instance.text = text;
  instance.set({
    top: parentTop,
    left: parentLeft,
    fontSize,
    fill: textColor,
    selectable: false,
  })
}