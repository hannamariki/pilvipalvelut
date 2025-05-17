import React, { useEffect } from "react";

function MatomoApi() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pilvipalvelut-matomo.2.rahtiapp.fi/js/container_5NaZwoOJ.js";
    document.body.appendChild(script);

    window._mtm = window._mtm || [];
    window._mtm.push({'mtm.startTime': (new Date().getTime()), event: 'mtm.Start'});

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // ei renderöi mitään näkyvää
}

export default MatomoApi;