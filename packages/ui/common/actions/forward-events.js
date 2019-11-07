import { bubble, listen } from 'svelte';

/**
 * Element Event Handler Action
 * @param {*} component 
 * @param {*} additionalEvents 
 */
export function forwardEventBuilder(component, additionalEvents = []) {

  // the node has been mounted in the DOM

  const events = [
    // Focus Events
    'focus', 'blur',
    // View Screen Events
    'fullscreenchange', 'fullscreenerror', 'scroll',
    // Operation Events
    'cut', 'copy', 'paste',
    // Key Events
    'keydown', 'keypress', 'keyup',
    // Mouse Events
    'auxclick', 'click', 'contextmenu', 'dbclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
    // Drag and Drop Events
    'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
    // Touch Events
    'touchcancel', 'touchend', 'touchmove', 'touchstart',
    // Pointer Events
    'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture',
    ...additionalEvents
  ];

  function forward(e) {
    bubble(component, e);
  }
  
  return node => {
    const destructors = [];

    for (let i = 0; i < events.length; i++) {
      destructors.push(listen(node, events[i], forward));
    }

    return {
      destroy: () => {
        // the node has been removed from the DOM
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
      }
    }
  }
}

