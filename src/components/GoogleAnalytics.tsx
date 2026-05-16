import Script from 'next/script'

const PLACEHOLDER = 'G-XXXXXXXXXX'

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID

  if (!id || id === PLACEHOLDER) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  )
}
