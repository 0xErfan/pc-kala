import React from 'react'

interface Props {
    rows: number
    cols: number
}

const Comment = ({ rows, cols }: Props) => {

    return (
        <>
            {
                Array(cols).fill(0).map((_, index) => (
                    <tr className='ch:p-2' key={index}>
                        {
                            Array(rows).fill(0).map((_, index) => (
                                <td key={index}>
                                    <div className='h-6 bg-gray-300 comment-skeleton rounded relative overflow-hidden'>
                                        <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-[loading_1.5s_infinite]'></div>
                                    </div>
                                </td>))
                        }
                    </tr>
                ))
            }

        </>
    )
}

export default Comment