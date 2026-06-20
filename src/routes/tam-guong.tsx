import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tam-guong')({
  component: tamGuong,
})

function tamGuong() {
  return <div>Hello "/tam-guong"!</div>
}
