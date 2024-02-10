import React from 'react'
import styles from './index.module.css'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { colorChange, changeBrushSize } from '@/slice/toolSlice'
import { MENU_ITEMS } from '@/constant'
type Props = {}

const Toolbox = (props: Props) => {
   const disaptch = useAppDispatch()
   const activeMenuItem = useAppSelector(state=>state.menu.activeMenuItem)
   const brushSize:number = useAppSelector(state=>state.tool.size)
   const showStrokeColor = activeMenuItem === MENU_ITEMS.PENCIL
   const showBrushSize = activeMenuItem === MENU_ITEMS.PENCIL || activeMenuItem === MENU_ITEMS.ERASER
``

    const ColorBox = ()=>{
        const colorList = ['black', 'red', 'green']
        const handleStrokeColorChange = (e:any)=>{
            disaptch(changeBrushSize(e.target.value))
        }
        return colorList.map((color)=>{
            return <div className={'h-10 w-10 border ' + `bg-${color}`} onClick={handleStrokeColorChange}></div>
        })
    }

    const handleBrushSizeChange = (e:any)=>{
        disaptch(colorChange(parseInt(e.target.value)))
    }

  return (
    <div className={styles.toolContainer}>
        <div className={styles.item}>
            <h4 className={styles.toolText}> Stroke Color </h4>
            <div className='flex gap-4'><ColorBox/></div>
        </div>
        <div>
            <h4 className={styles.toolText}> Brush Size </h4>
            <input type="range"  min='0' max='10' step="1" value={brushSize} onChange={handleBrushSizeChange}></input>
        </div>

    </div>
  )
}

export default Toolbox