import React, { useState } from 'react'
import Modal from './ui/Modal'
import Input from './ui/Input'
import Select from './ui/Select'

interface contentProps{
  isModalOpen:boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function Content(props: contentProps) {

  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [selectedType,setSelectedType] = useState("")

  const type: { value: string; label: string }[] = [
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Youtube', label: 'YouTube' },
    { value: 'Instagram', label: 'Instagram' },
  ];

  return (
    <Modal onClose={()=>props.setIsModalOpen(false)} isOpen={props.isModalOpen}>
      <div className=''>
      <p>Title:</p>
      <Input size='sm' type='text'></Input>
      </div>
      <div className='mt-2'>
      <p>Enter your link:</p>
      <Input size='sm' type='text'></Input>
      </div>
      <div className='mt-2'>
      <p>Enter type of link:</p>
      <Select
            options={type}
            value={selectedType}
            onChange={(value:string) => setSelectedType(value)}
            placeholder="Select a type"
          />
      </div>
     
    </Modal>
  )
}

export default Content