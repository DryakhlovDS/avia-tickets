export function indexElement(elem){
  let num = 0;

    while (!!elem.previousSibling) {
      num++;
      elem = elem.previousSibling;
    }

    return num;
}