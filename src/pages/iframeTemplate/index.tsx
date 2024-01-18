export default function IframeTemplate({ url }: { url: string }) {
  return (
    <div style={{ height: '100%' }}>
      <iframe style={{ width: '100%', height: '100%', border: 0 }} src={url}></iframe>
    </div>
  )
}
