import { useAppSelector } from '@/hooks'
import React, { useEffect, useRef } from 'react'

type Props = {}

const Board = (props: Props) => {
  
    const canvasRef:any = useRef()
    const shouldDraw:any = useRef()

    const currentMenuItem = useAppSelector(state=>state.menu.activeMenuItem)
    const brushSize:number  =useAppSelector(state=>state.tool.size)
    const color:string = useAppSelector(state=>state.tool.color)

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