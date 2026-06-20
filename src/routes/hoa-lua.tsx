import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hoa-lua')({
  component: hoaLua,
})

function hoaLua() {
  return <div>Hello "/hoa-lua"!</div>
}
