import Feed from "@components/Feed"

export default function Home() {
  return (
    <section className="flex   head_text flex-col w-full items-center justify-between p-24">
<h1>Discover & share</h1>
<br className="max-md:hidden" />
<span className="orange_gradient text-center">
AI-Powered Prompts
</span>
<p className="desc text-center">Promptopia is an open-source AI prompting tool for mordern warld to discover, creante and share creative prompts</p>
<Feed/>
    </section>
  )
}
