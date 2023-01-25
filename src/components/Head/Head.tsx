import Head from "next/head"

export default function HeadInfo() {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://www.doughnut-quiz.com/" />
        <meta name="twitter:site" content="@Osushioshushi" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Doughnut" />
        <meta name="twitter:description" content="Daily English word quiz" />
        <meta name="twitter:image" content="https://www.doughnut-quiz.com/icon.png" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Doughnut" /> 
        <meta property="og:description" content="Daily English word quiz" />
        <meta property="og:site_name" content="Doughnut" />
        <meta property="og:image" content="https://www.doughnut-quiz.com/icon.png" />
      </Head>
    </>
  )
}

