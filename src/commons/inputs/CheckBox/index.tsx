import { useEffect, useState } from "react";

interface CheckBoxProps{
    defaultChecked:boolean;
    label:string,
    onChange:(key:string, value:boolean)=>void;
}

function CheckBox({label, onChange, defaultChecked}:CheckBoxProps){
    const [checked, setChecked] = useState<boolean>();
    
    useEffect(()=>{
        setChecked(defaultChecked);
    },[defaultChecked]);
    
    const check = (key:string, value:boolean)=>{
        setChecked(value);
        onChange(key, value);
    }
    return(
        <label className="flex items-center space-x-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => check(label, e.target.checked)}
                    className="accent-orange-500 w-4 h-4 bg-white"
                />
            <span className="text-gray-700">{label}</span>
        </label>
    )
}       
export default CheckBox;