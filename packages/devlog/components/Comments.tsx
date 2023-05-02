'use client';

import React from 'react';

export default function Comments() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.setAttribute('repo', 'HoJin9622/devlog');
        scriptElem.setAttribute('issue-term', 'title');
        scriptElem.setAttribute('theme', 'github-light');
        scriptElem.crossOrigin = 'anonymous';
        elem.appendChild(scriptElem);
      }}
    />
  );
}
