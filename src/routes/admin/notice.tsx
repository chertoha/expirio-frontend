import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/notice')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notice"!</div>
}
