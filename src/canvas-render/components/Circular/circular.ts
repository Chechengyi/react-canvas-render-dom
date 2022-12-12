import type { Container } from '../../hostconfig';
import { fabric } from 'fabric';

export interface CircularProps {
  x: number;
  y: number;
  r?: number; // 半径
  fillColor?: string;
  children?: string;
  textColor?: string;
  textSize?: number;
}

const defaultValue = {
  x: 0,
  y: 0,
  r: 10,
  fillColor: '#000000',
}

export default function Circular(props: CircularProps, container: Container) {
  const {
    x = defaultValue.x,
    y = defaultValue.y,
    r = defaultValue.r,
    fillColor = defaultValue.fillColor,
  } = props;
  const instance = new fabric.Circle({
    radius: r,
    fill: fillColor,
    left: x,
    top: y,
    originX: 'center',
    originY: 'center',
    selectable: false,
  })
  return instance;
}

export function updateCircular(instance: fabric.Circle, props: CircularProps) {
  const {
    x = defaultValue.x,
    y = defaultValue.y,
    r = defaultValue.r,
    fillColor = defaultValue.fillColor,
  } = props;
  instance.set({
    radius: r,
    fill: fillColor,
    left: x,
    top: y,
    selectable: false,
  })
}