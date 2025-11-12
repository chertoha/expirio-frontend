export function MainTitle({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h1 className="text-2xl lg:text-5xl font-extrabold align-middle mb-3">
        {title}
      </h1>
      <p className="text-[#64748B] text-sm lg:text-xl">{text}</p>
    </div>
  )
}
