import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function CanvasReact({src}) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
if(src){

    const imgNode=new Image()
    imgNode.src=src
    imgNode.onload=()=>{
        const img=new fabric.Image(imgNode,{
            left:0,
            top:0,
            angle:30,
            opacity:1
        })
        canvas.add(img)
    }
    
}
    const canvas = new fabric.Canvas(canvasRef.current);
    const container = canvasRef.current.parentElement;

    // Establece el ancho y la altura del lienzo en relación al contenedor
    canvas.setWidth(container.clientWidth);
    canvas.setHeight(container.clientHeight);
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#f1f5f0',
      width: 60,
      height: 70
    });

    canvas.add(rect);
  }, []);

  return <canvas ref={canvasRef}  />;
}

export default CanvasReact;
