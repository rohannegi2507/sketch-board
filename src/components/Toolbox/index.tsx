import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { changeColor, changeBrushSize } from '@/slice/toolSlice'
import { MENU_ITEMS } from '@/constant'
import { HexColorPicker } from "react-colorful";
import {socket} from './../../../socket'

type Props = {}

const Toolbox = (props: Props) => {
   const disaptch = useAppDispatch()
   const activeMenuItem = useAppSelector(state=>state.menu.activeMenuItem)
   const brushSize:number | undefined = useAppSelector(state=>state.tool[activeMenuItem].size)
   const showStrokeColor = activeMenuItem === MENU_ITEMS.PENCIL
   const showBrushSize = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER
   const color:string | undefined = useAppSelector(state=>state.tool[activeMenuItem].color)

   const handleStrokeColorChange = (color:string)=>{
    disaptch(changeColor({item:activeMenuItem , color:color}))
    socket.emit('changeConfig',{color:color,brushSize})
   }


   const handleBrushSizeChange = (e:any)=>{
      disaptch(changeBrushSize({item:activeMenuItem , size:parseInt(e.target.value)}))
      socket.emit('changeConfig',{color,brushSize:e.target.value})
    }

  return (
    <div className={styles.toolContainer}>

        {showStrokeColor && <div>
            <h4 className={styles.toolText}> Color Picker </h4>
            <HexColorPicker color={color} onChange={handleStrokeColorChange} />
        </div>}
        {showBrushSize && <div>
            <h4 className={styles.toolText}> Brush Size </h4>
            <input type="range"  min='0' max='10' step="1" value={brushSize} onChange={handleBrushSizeChange}></input>
        </div>
        }

    </div>
  )
}

export default Toolbox