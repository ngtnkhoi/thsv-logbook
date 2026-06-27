import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bao-tang')({
  component: baoTang,
})

function baoTang() {
  return <div>Hello "/bao-tang"!</div>
}
