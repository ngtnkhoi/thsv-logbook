import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lang-nghe')({
  component: langNghe,
})

function langNghe() {
  return <div>Hello "/lang-nghe"!</div>
}
