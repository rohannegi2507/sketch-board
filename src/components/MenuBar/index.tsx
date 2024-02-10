import * as React from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown} from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { MENU_ACTIVE_TYPE, MENU_ACTION_TYPE } from '@/constant';
import {menuItemClick, actionItemClick } from '../../slice/menuSlice'
import { useAppDispatch } from '@/hooks';

export interface IMenuBar {
}

export default function MenuBar (props: IMenuBar) {
    const disaptch = useAppDispatch()

    const handleActiveIconClick = (actionType: MENU_ACTIVE_TYPE)=>{
        disaptch(menuItemClick(actionType))
    }

    const handleActionIconClick = (actionType: MENU_ACTION_TYPE)=>{
        disaptch(actionItemClick(actionType))
    }
  return (

        <div className={styles.menuContainer} >

            <div className={styles.iconWrapper} onClick={()=>{handleActiveIconClick('pencil')}}><FontAwesomeIcon  icon={faPencil} className='styles.icon' /></div>
            <div className={styles.iconWrapper} onClick={()=>{handleActiveIconClick('eraser')}}>  <FontAwesomeIcon  icon={faEraser} className='styles.icon' /></div>
            <div className={styles.iconWrapper} onClick={()=>{handleActionIconClick('undo')}}> <FontAwesomeIcon  icon={faRotateLeft} className='styles.icon'  /></div>
            <div className={styles.iconWrapper} onClick={()=>{handleActionIconClick('redo')}}> <FontAwesomeIcon  icon={faRotateRight} className='styles.icon'  /></div>
            <div className={styles.iconWrapper} onClick={()=>{handleActionIconClick('download')}} > <FontAwesomeIcon  icon={faFileArrowDown} className='styles.icon' /></div>
        </div>
  );
}
