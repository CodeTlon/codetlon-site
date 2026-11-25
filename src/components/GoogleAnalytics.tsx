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
          // Consent Mode v2: denegado por defecto hasta el opt-in del banner.
          // Respeta una elección previa guardada en localStorage.
          var consent = (function(){ try { return localStorage.getItem('ct_cookie_consent'); } catch (e) { return null; } })();
          var granted = consent === 'granted' ? 'granted' : 'denied';
          gtag('consent', 'default', {
            analytics_storage: granted,
            ad_storage: granted,
            ad_user_data: granted,
            ad_personalization: granted,
          });
          gtag('config', '${id}');
        `}
      </Script>
    </>
  )
}
