import React from 'react'

const SearchInput : React.FC<{placeholder: string}> = ({placeholder}) => {
  return (
    <div>
      <input placeholder={placeholder} />
    </div>
  )
};

export default SearchInput
