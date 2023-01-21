
    // Based off of https://github.com/pwa-builder/PWABuilder/blob/main/docs/sw.js
    /*
      Welcome to our basic Service Worker! This Service Worker offers a basic offline experience
      while also being easily customizeable. You can add in your own code to implement the capabilities
      listed below, or change anything else you would like.


      Need an introduction to Service Workers? Check our docs here: https://docs.pwabuilder.com/#/home/sw-intro
      Want to learn more about how our Service Worker generation works? Check our docs here: https://docs.pwabuilder.com/#/studio/existing-app?id=add-a-service-worker

      Did you know that Service Workers offer many more capabilities than just offline? 
        - Background Sync: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/06
        - Periodic Background Sync: https://web.dev/periodic-background-sync/
        - Push Notifications: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=push-notifications-on-the-web
        - Badges: https://microsoft.github.io/win-student-devs/#/30DaysOfPWA/advanced-capabilities/07?id=application-badges
    */

    const HOSTNAME_WHITELIST = [
        self.location.hostname,
        'fonts.gstatic.com',
        'fonts.googleapis.com',
        'cdn.jsdelivr.net'
    ]

    // The Util Function to hack URLs of intercepted requests
    const getFixedUrl = (req) => {
        var now = Date.now()
        var url = new URL(req.url)

        // 1. fixed http URL
        // Just keep syncing with location.protocol
        // fetch(httpURL) belongs to active mixed content.
        // And fetch(httpRequest) is not supported yet.
        url.protocol = self.location.protocol

        // 2. add query for caching-busting.
        // Github Pages served with Cache-Control: max-age=600
        // max-age on mutable content is error-prone, with SW life of bugs can even extend.
        // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
        // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
        if (url.hostname === self.location.hostname) {
            url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
        }
        return url.href
    }

    /**
     *  @Lifecycle Activate
     *  New one activated when old isnt being used.
     *
     *  waitUntil(): activating ====> activated
     */
    self.addEventListener('activate', event => {
    })

    /**
     *  @Functional Fetch
     *  All network requests are being intercepted here.
     *
     *  void respondWith(Promise<Response> r)
     */
    self.addEventListener('fetch', event => {

    })
