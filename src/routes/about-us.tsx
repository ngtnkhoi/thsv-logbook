import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: aboutUs,
})

function aboutUs() {
  return <div>Hello "/about-us"!</div>
}
