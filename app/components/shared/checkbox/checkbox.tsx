import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { CheckedState } from '@radix-ui/react-checkbox'
interface Props{
    id:string,
    label:string,
    checked:boolean,
    valueChange:(checked:CheckedState)=>void
}
const CustomCheckbox = ({id,label,checked,valueChange}:Props) => {
  return (
    <div className="flex items-center space-x-2  cursor-pointer" onClick={()=> document.getElementById(id)?.click()}>
      <Checkbox inert id={id} checked={checked} onCheckedChange={(state)=>valueChange(state)}   className="bg-transparent data-[state=checked]:bg-white data-[state=checked]:text-black"
      />
      <label
        htmlFor={id} inert
        className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       {label}
      </label>
    </div>
  )
}

export default CustomCheckbox
