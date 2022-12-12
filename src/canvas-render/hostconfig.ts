import { TYPES } from './components/index';
import CircularInstance, { updateCircular } from './components/Circular/circular';
import TextInstance, { updateText } from './components/Text/text';
import { fabric } from  'fabric';

export type Container = fabric.Canvas;

type Circle = fabric.Circle & { _todoInsertChildText?: fabric.Text }

type Instance = Circle

let currentContainer: Container;

const hostConfig =  {
  supportsMutation: true,
  /** 
   * @param rootContainer  createContainer 的时候传入的第一个参数
   * @returns 
   */
  getRootHostContext(rootContainer: Container) {
    // 使用一个变量保存一下 container，会用到
    currentContainer = rootContainer;
    return null;
  },

  /**
   * @param containerInfo createContainer 的时候传入的第一个参数
   */
  prepareForCommit(containerInfo: Container) {
    return null;
  },

  /**
   * 
   * @param containerInfo createContainer 的时候传入的第一个参数
   */
  resetAfterCommit(containerInfo: Container) {
    // 在 commit 阶段后执行一次 renderAll 更新 canvas
    containerInfo.renderAll();
  },

  /**
   * 
   * @param type 组件
   * @param newProps props
   * @param containerInfo 容器 createContainer 的时候传入的第一个参数
   */
  createInstance(type: string, newProps: Record<string, any>, containerInfo: Container) {
    let instance;
    switch(type) {
      case TYPES.Circular:
        instance = CircularInstance(newProps as any, containerInfo);
        break;
      default:
        instance = null;  
    }
    return instance
  },


  getChildHostContext(parentHostContext: any) {
    return parentHostContext;
  },

  shouldSetTextContent() {
    // 这里代表需要甚至文本节点，返回 true，如果还记得上文介绍，这里代表了针对 string 类型
    // 不会生成 Fiber 节点
    return true;
  },

  clearContainer() {

  },

  finalizeInitialChildren(instance: Instance, type: string, props: any, rootContainer: Container, hostContext: any) {
    // 在这里设置文本
    if (props.children && typeof  props.children === 'string') {
      instance._todoInsertChildText = TextInstance(props.children, {
        parentLeft: props.x,
        parentTop: props.y,
        fontSize: props.textSize || 12,
        textColor: props.textColor
      });
    }
    return false
  },

  /**
   * 从 Container 中删除一个节点 该方法执行在 commit 阶段
   * 当组件被卸载的时候 需要调用此方法删除 container 中的对应 fabric 实例
   */
  removeChildFromContainer(container: Container, child: Instance) {
    removeAllChildText(container, child)
    container.remove(child)
  },

  /**
   * 添加一个节点到 Container 中，该方法执行在 commit 阶段
   * 组件初次渲染的时候，需要调用此方法将 fabric 实例添加到 container 中
   */
  appendChildToContainer(container: Container, child: any) {
    container.add(child);
    appendAllChildText(container, child);
  },

  appendInitialChild(parentInstance: any, child: any) {
    // 这里暂时用不上，因为目前我们所有节点的父节点都是 Container
    // 所以目前只用实现 appendChildToContainer 就可以了
  },

  prepareUpdate(instance: any, type: any, oldProps: any, newProps: any) {
    return newProps
  },

  /**
   * 更新节点时需要用到 在 commit 阶段执行
   * 当前组件需要更新的时候，需要调用此方法更新 container 中的 fabric 实例
   */
  commitUpdate(instance: any, updatePayload: any, type: any, prevProps: any, nextProps: any, internalHandle: any) {
    // 更新节点
    updateCircular(instance, nextProps)
    // 更新文本节点
    updateAllChildText(instance, nextProps);
  },

  createTextInstance(text: any, rootContainer: Container, hostContext: any, internalHandle: any) { 
    // 因为 shouldSetTextContent 返回 true React 不会生成 HostText 类型的 Fiber
    // 所以这里用不上 不用实现
  },

  detachDeletedInstance() {

  }
}

function appendAllChildText(container: Container, instance: any) {
  if (instance._todoInsertChildText) {
    container.add(instance._todoInsertChildText)
  }
}

function updateAllChildText(instance: any, nextProps: any) {
  if (instance._todoInsertChildText) {
    updateText(instance._todoInsertChildText, {
      parentLeft: nextProps.x,
      parentTop: nextProps.y,
      fontSize: nextProps.textSize || 12,
      textColor: nextProps.textColor || "#000",
    }, nextProps.children)
  }
}

function removeAllChildText(container: Container, instance: Instance) {
  if (instance._todoInsertChildText) {
    container.remove(instance._todoInsertChildText)
  }
}

export default hostConfig;