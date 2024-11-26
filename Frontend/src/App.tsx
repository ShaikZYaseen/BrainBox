import InstagramCard from "./components/cards/InstagramCard"
import InstagramReelCard from "./components/cards/InstagramReelCard"
import TwitterCard from "./components/cards/TwitterCard"
import TwitterVideoCard from "./components/cards/TwitterVideoCard"
import YoutubeCard from "./components/cards/YoutubeCard"

function App() {

  return (
    <>
<InstagramCard
  link="https://www.instagram.com/p/DC12SAMRGsZ/"
  title="About"
/>
<TwitterVideoCard title="about me" tweetUrl="https://twitter.com/abdul_tweets03/status/1861296636959563939?ref_src=twsrc%5Etfw"/>
<InstagramReelCard reelLink="https://www.instagram.com/reel/DCjn5rOiu30/?igsh=MWZobmJ5dXJyMTRwbQ==" title="Study"/>
    <TwitterCard text="Twitter post" tweetUrl="https://twitter.com/DearS_o_n/status/1861259174593651136?ref_src=twsrc%5Etfw"/>
    <YoutubeCard youtubeLink="https://www.youtube.com/embed/Oo3qsxihXqY" />
    </>
  )
}

export default App
