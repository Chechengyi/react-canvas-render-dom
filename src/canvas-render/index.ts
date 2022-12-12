import React, { ReactElement } from "react";
import ReactReconciler from "react-reconciler";
import hostConfig from "./hostconfig";
import { fabric } from  'fabric';

const ReactReconcilerInstance = ReactReconciler(hostConfig as any);

const canvasRender = {
  render(reactElement: any, canvasElement: HTMLCanvasElement) {
    const ctx: fabric.Canvas = new fabric.Canvas(canvasElement, { 
      backgroundColor: 'gray',
      centeredRotation: true,
      centeredScaling: true,
    })
    // @ts-ignore
    ctx._dom = canvasElement;
    let root;
    // @ts-ignore
    if (!ctx._rootContainer) {
      root = ReactReconcilerInstance.createContainer(
        ctx,
        0,
        null,
        false,
        false,
        '',
        () => {},
        null,
      );
      // @ts-ignore
      ctx._rootContainer = root;
    }
    return ReactReconcilerInstance.updateContainer(reactElement, root);
  },
}

export default canvasRender;
