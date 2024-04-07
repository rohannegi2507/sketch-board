import { MENU_ITEMS } from '@/constant'
import { useAppSelector, useAppDispatch } from '@/hooks'
import React, { useEffect, useRef } from 'react'
import { actionItemClick } from '@/slice/menuSlice'
import { socket } from "../../../socket";
import { changeBrushSize, changeColor } from '@/slice/toolSlice';

type Props = {}

const Board = (props: Props) => {
  
    const canvasRef:any = useRef()
    const shouldDraw:any = useRef()
    const dispatch = useAppDispatch()
    const drawHistory:any = useRef([])
    const historyPointer = useRef(0)
    const disaptch = useAppDispatch()

    const activeMenuItem = useAppSelector(state=>state.menu.activeMenuItem)
    const actionMenuItem = useAppSelector(state=>state.menu.actionMenuItem)
    const brushSize:number| undefined  =useAppSelector(state=>state.tool[activeMenuItem].size)
    const color:string | undefined = useAppSelector(state=>state.tool[activeMenuItem].color)

    
    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click()
        } else  if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
            if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0)
        }
        dispatch(actionItemClick(null))
    }, [actionMenuItem, dispatch])


    useEffect(()=>{
        if(!canvasRef.current)  return

        const canvas:any = canvasRef.current
        const context = canvas.getContext('2d')

        const changeConfig = (color, brushSize)=>{
          context.strokeStyle = color
          context.lineWidth = brushSize
        }
    
        changeConfig(color, brushSize)

        const handleConfigChange = (config) => {
            changeConfig(config.color, config.brushSize)
            if(config.color !== color)
            {
                disaptch(changeColor({item:MENU_ITEMS.PENCIL , color:config.color}))
            }
            if(config.brushSize !== brushSize)
            {
              disaptch(changeBrushSize({item:MENU_ITEMS.PENCIL , size:parseInt(config.brushSize)}))
            }
        }

        socket.on('changeConfig',handleConfigChange)

    },[color,brushSize])

    useEffect(()=>{
        if(!canvasRef.current)  return

        const canvas:any = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth

        const handleMouseUp = ()=>{
           shouldDraw.current = false
           const imageData:any = context.getImageData(0, 0, canvas.width, canvas.height)
          if(imageData)
          {
             drawHistory.current.push(imageData)
             historyPointer.current = drawHistory.current.length - 1
          }
        }
        
        const beginPath = (x,y)=>{
            context.beginPath()
            context.moveTo(x, y)
        }
        
        const drawline = (x,y)=>{
            context.lineTo(x, y)
            context.stroke()
        }

        const handleMouseMove = (e:any)=>{
            if(!shouldDraw.current) return 
            drawline(e.clientX, e.clientY)
            socket.emit('drawLine', {x: e.clientX, y:e.clientY})
        }

        const handleMouseDown = (e:any)=>{
            shouldDraw.current = true
            beginPath(e.clientX, e.clientY)
            socket.emit('beginPath', {x: e.clientX, y:e.clientY})
        }
        
        const handleBeginPath = (path)=>{
            beginPath(path.x, path.y)
        }

        const handleDrawLine = (path)=>{
            drawline(path.x, path.y)
        }

        canvas.addEventListener('mouseup', handleMouseUp)
        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)

        socket.on('beginPath', handleBeginPath)
        socket.on('drawLine', handleDrawLine)
        socket.on('connect',()=>{
            console.log("Connect with the server")
        })

        return ()=>{
            canvas.removeEventListener('mouseup', handleMouseUp)
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            
            socket.off('beginPath', handleBeginPath)
            socket.off('drawlineLine', handleDrawLine)
            socket.off('connect',()=>{
                console.log("Connect with the server")
            })
        }
    },[])

  return (
    <canvas ref={canvasRef}/>
  )
}

export default Board