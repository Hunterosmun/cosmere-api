import React from 'react'
import { useQuery } from '@tanstack/react-query'

export function Explorer() {
  const [url, setUrl] = React.useState('api')
  const { data, isLoading, error } = useQuery({
    queryKey: ['explorer', url],
    queryFn: () => fetch(url).then((res) => res.json()),
  })

  return (
    <div>
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="bg-gray-100 mt-5 p-2 rounded-md">
        <PrintJSON value={data} onChange={setUrl} />
      </div>
      {error && <div>Error: {error.message}</div>}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}

function PrintJSON({
  value,
  onChange,
}: {
  value: any
  onChange: (url: string) => void
}) {
  if (Array.isArray(value)) {
    return (
      <>
        <span>[</span>
        {value.map((item, i) => (
          <div className="pl-5" key={i}>
            <PrintJSON value={item} onChange={onChange} />
            {i < value.length - 1 ? ',' : ''}
          </div>
        ))}
        <span>]</span>
      </>
    )
  }
  if (Object.prototype.toString.call(value) === '[object Object]') {
    const entries = Object.entries(value)
    return (
      <>
        <span>{'{'}</span>
        {entries.map(([key, value], i) => (
          <div key={key} className="pl-5">
            "{key}":
            <PrintJSON value={value} onChange={onChange} />
            {i < entries.length - 1 ? ',' : ''}
          </div>
        ))}
        <span>{'}'}</span>
      </>
    )
  }
  if (typeof value === 'string' && value.startsWith('http')) {
    const urlEnd = value.split('/').slice(3).join('/')
    return (
      <button
        className="text-blue-500 cursor-pointer"
        onClick={() => onChange(urlEnd)}
      >
        "{value}"
      </button>
    )
  }
  return JSON.stringify(value)
}
