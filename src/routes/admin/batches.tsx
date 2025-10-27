import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/batches')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/batches"!</div>
}
