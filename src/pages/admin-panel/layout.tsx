import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
        <div>hi this is header</div>
        {children}
        <div>hi this is footer</div>
    </div>
  )
}

export default layout