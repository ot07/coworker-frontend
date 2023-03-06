import React from 'react'

interface ButtonProps {
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="bg-blue-500 rounded-lg p-2 px-4 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
