import React from 'react'
import Input from 'components/Input'
import Button from 'components/Button'

import './episode-create-form.css'

function EpisodeCreateForm({ onSubmit, handleToggleForm }) {
  const [value, setValue] = React.useState('')

  const handleUpdateValue = event => {
    const { value } = event.target
    setValue(value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({
      title: value
    })
  }
  return (
    <form onSubmit={handleSubmit} className="episode-create-form">
      <Input
        value={value}
        onChange={handleUpdateValue}
        name="title"
        placeholder="Yarisma icin baslik giriniz"
      />
      <Button type="submit">Onayla</Button>
      <Button type="button" onClick={handleToggleForm}>
        Vazgeç
      </Button>
    </form>
  )
}

export default EpisodeCreateForm
