import { ReactNode } from "react";

interface ToastProps{
    message:ReactNode;
    type:'info' | 'success' | 'warning' | 'error';
}

function Toast({message, type}:ToastProps){
    const typeStyles = {
      info: 'bg-blue-100 text-blue-800 border-blue-300',
      success: 'bg-green-1 text-font-color border-green-2',
      warning: 'bg-third text-main border-second',
      error: 'bg-red-100 text-red-800 border-red-300',
    };
    return (
        <div className={`px-8 py-3 border rounded-full text-center font-semibold text-md min-w-[300px] ${typeStyles[type]}`}>
          {message}
        </div>
    );
}
export default Toast;