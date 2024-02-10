import { MENU_ITEMS } from '@/constant'
import { useAppSelector, useAppDispatch } from '@/hooks'
import React, { useEffect, useRef } from 'react'
import { actionItemClick } from '@/slice/menuSlice'

type Props = {}

const Board = (props: Props) => {
  
    const canvasRef:any = useRef()
    const shouldDraw:any = useRef()
    const dispatch = useAppDispatch()
    const drawHistory:any = useRef([])
    const historyPointer = useRef(0)

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

        const changeConfig = ()=>{
            context.strokeStyle = color
            context.lineWidth = brushSize
        }
    
        changeConfig()

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

        const handleMouseMove = (e:any)=>{
            if(!shouldDraw.current) return 
            context.lineTo(e.clientX, e.clientY)
            context.stroke()
        }

        const handleMouseDown = (e:any)=>{
            shouldDraw.current = true

            context.beginPath()
            context.moveTo(e.clientX, e.clientY)
        }


        canvas.addEventListener('mouseup', handleMouseUp)
        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)


        return ()=>{
            canvas.removeEventListener('mouseup', handleMouseUp)
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
        }
    },[])

  return (
    <canvas ref={canvasRef}/>
  )
}

export default Board